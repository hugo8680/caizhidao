#!/usr/bin/env python3
"""Build a privacy-conscious aggregate report from the site's Nginx log."""

from __future__ import annotations

import argparse
import gzip
import hashlib
import hmac
import html
import json
import os
import re
import secrets
import tempfile
from collections import Counter, defaultdict
from datetime import date, datetime, timedelta, timezone as datetime_timezone
from pathlib import Path
from urllib.parse import unquote, urlsplit
from zoneinfo import ZoneInfo


LOG_PATTERN = re.compile(
    r'^(?P<address>\S+) \S+ \S+ \[(?P<time>[^\]]+)\] '
    r'"(?P<request>[^"]*)" (?P<status>\d{3}) \S+ '
    r'"(?P<referrer>[^"]*)" "(?P<agent>[^"]*)"'
)
TITLE_PATTERN = re.compile(r'<title[^>]*>(.*?)</title>', re.IGNORECASE | re.DOTALL)
TAG_PATTERN = re.compile(r'<[^>]+>')
STATIC_SUFFIXES = {
    '.css', '.js', '.map', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico',
    '.svg', '.woff', '.woff2', '.json', '.txt', '.xml', '.pdf', '.zip',
}
IGNORED_PREFIXES = ('/_next/', '/.well-known/')
IGNORED_PATHS = {
    '/404.html', '/caizhidao-mark.svg', '/favicon.ico', '/favicon.svg',
    '/og.png', '/robots.txt', '/search-index.json', '/sitemap.xml',
    '/site-statistics/summary.json',
}
BOT_MARKERS = (
    'bot', 'crawler', 'spider', 'slurp', 'bingpreview', 'headless', 'phantomjs',
    'monitor', 'uptime', 'healthcheck', 'curl/', 'wget/', 'python-requests',
    'go-http-client', 'facebookexternalhit', 'whatsapp', 'telegrambot',
    'linkedinbot', 'preview',
)
TOP_LEVEL_TITLES = {
    '/': '财知道首页',
    '/atlas/': '财经知识地图',
    '/books/': '财经图书',
    '/courses/': '系统课程',
    '/courses/start/': '新手入门',
    '/editorial-policy/': '内容标准',
    '/knowledge/': '财经知识库',
    '/search/': '全站检索',
    '/site-statistics/': '访问统计',
    '/timeline/': '财经发展简史',
    '/tools/': '金融小工具',
    '/topics/': '专题文章',
    '/videos/': '视频课程',
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument('--log-dir', type=Path, required=True)
    parser.add_argument('--log-name', default='access.log')
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--salt-file', type=Path, required=True)
    parser.add_argument('--site-root', type=Path, required=True)
    parser.add_argument('--site-host', action='append', default=[])
    parser.add_argument('--tracking-since', type=date.fromisoformat, required=True)
    parser.add_argument('--timezone', default='Asia/Shanghai')
    return parser.parse_args()


def load_or_create_salt(path: Path) -> bytes:
    path.parent.mkdir(parents=True, exist_ok=True)
    try:
        value = path.read_bytes()
    except FileNotFoundError:
        value = secrets.token_bytes(32)
        descriptor = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
        with os.fdopen(descriptor, 'wb') as handle:
            handle.write(value)
    if len(value) < 32:
        raise ValueError('analytics salt must contain at least 32 bytes')
    return value


def iter_log_lines(log_dir: Path, log_name: str):
    for path in sorted(log_dir.glob(f'{log_name}*'), key=lambda item: item.stat().st_mtime):
        if not path.is_file():
            continue
        opener = gzip.open if path.suffix == '.gz' else open
        try:
            with opener(path, 'rt', encoding='utf-8', errors='replace') as handle:
                yield from handle
        except (OSError, EOFError):
            continue


def normalize_page(target: str) -> str | None:
    try:
        parsed = urlsplit(target)
        path = unquote(parsed.path or '/')
    except ValueError:
        return None
    if '\x00' in path or any(part == '..' for part in path.split('/')):
        return None
    path = re.sub(r'/+', '/', path)
    if path.endswith('/index.html'):
        path = path[:-10] or '/'
    elif path.endswith('.html'):
        path = f'{path[:-5]}/'
    if path != '/' and not Path(path).suffix and not path.endswith('/'):
        path = f'{path}/'
    if path in IGNORED_PATHS or path.startswith(IGNORED_PREFIXES):
        return None
    if Path(path).suffix.lower() in STATIC_SUFFIXES:
        return None
    return path


def is_bot(agent: str) -> bool:
    lowered = agent.lower()
    return not lowered or any(marker in lowered for marker in BOT_MARKERS)


def device_name(agent: str) -> str:
    lowered = agent.lower()
    if any(marker in lowered for marker in ('ipad', 'tablet', 'kindle', 'silk/')):
        return '平板设备'
    if any(marker in lowered for marker in ('mobile', 'iphone', 'ipod', 'android')):
        return '移动设备'
    return '桌面设备'


def external_referrer(referrer: str, site_hosts: set[str]) -> str | None:
    if not referrer or referrer == '-':
        return None
    try:
        host = (urlsplit(referrer).hostname or '').lower().rstrip('.')
    except ValueError:
        return None
    if not host or host in site_hosts:
        return None
    return host[4:] if host.startswith('www.') else host


def visitor_id(salt: bytes, address: str, agent: str) -> str:
    value = f'{address}\0{agent}'.encode('utf-8', errors='replace')
    return hmac.new(salt, value, hashlib.sha256).hexdigest()


def page_title(site_root: Path, route: str) -> str:
    if route in TOP_LEVEL_TITLES:
        return TOP_LEVEL_TITLES[route]
    root = site_root.resolve()
    relative = route.strip('/')
    candidate = root / relative / 'index.html' if relative else root / 'index.html'
    try:
        resolved = candidate.resolve()
        if root not in resolved.parents or not resolved.is_file():
            return route
        contents = resolved.read_text(encoding='utf-8', errors='replace')
    except OSError:
        return route
    match = TITLE_PATTERN.search(contents)
    if not match:
        return route
    title = html.unescape(TAG_PATTERN.sub('', match.group(1))).strip()
    return title or route


def atomic_write(path: Path, payload: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(prefix='.summary-', suffix='.json', dir=path.parent)
    try:
        with os.fdopen(descriptor, 'w', encoding='utf-8') as handle:
            json.dump(payload, handle, ensure_ascii=False, indent=2)
            handle.write('\n')
        os.chmod(temporary_name, 0o644)
        os.replace(temporary_name, path)
    finally:
        try:
            os.unlink(temporary_name)
        except FileNotFoundError:
            pass


def main() -> None:
    args = parse_args()
    timezone = ZoneInfo(args.timezone)
    now = datetime.now(timezone)
    earliest_date = max(args.tracking_since, now.date() - timedelta(days=29))
    salt = load_or_create_salt(args.salt_file)
    site_hosts = {host.lower().rstrip('.') for host in args.site_host}
    events: list[dict] = []

    for line in iter_log_lines(args.log_dir, args.log_name):
        match = LOG_PATTERN.match(line)
        if not match:
            continue
        request_parts = match.group('request').split(' ', 2)
        if len(request_parts) < 2 or request_parts[0] != 'GET':
            continue
        status = int(match.group('status'))
        if not (200 <= status < 300 or status == 304):
            continue
        agent = match.group('agent')
        if is_bot(agent):
            continue
        route = normalize_page(request_parts[1])
        if not route:
            continue
        try:
            occurred_at = datetime.strptime(match.group('time'), '%d/%b/%Y:%H:%M:%S %z').astimezone(timezone)
        except ValueError:
            continue
        occurred_date = occurred_at.date()
        if occurred_date < earliest_date or occurred_at > now + timedelta(minutes=5):
            continue
        events.append({
            'date': occurred_date,
            'route': route,
            'visitor': visitor_id(salt, match.group('address'), agent),
            'referrer': external_referrer(match.group('referrer'), site_hosts),
            'device': device_name(agent),
        })

    def period(days: int) -> dict[str, int]:
        cutoff = max(args.tracking_since, now.date() - timedelta(days=days - 1))
        selected = [event for event in events if event['date'] >= cutoff]
        return {
            'pageViews': len(selected),
            'visitors': len({event['visitor'] for event in selected}),
        }

    daily_views: Counter[date] = Counter()
    daily_visitors: dict[date, set[str]] = defaultdict(set)
    for event in events:
        daily_views[event['date']] += 1
        daily_visitors[event['date']].add(event['visitor'])

    daily = []
    cursor = earliest_date
    while cursor <= now.date():
        daily.append({
            'date': cursor.isoformat(),
            'pageViews': daily_views[cursor],
            'visitors': len(daily_visitors[cursor]),
        })
        cursor += timedelta(days=1)

    page_counts = Counter(event['route'] for event in events)
    referrer_counts = Counter(event['referrer'] for event in events if event['referrer'])
    device_counts = Counter(event['device'] for event in events)

    payload = {
        'generatedAt': datetime.now(datetime_timezone.utc).replace(microsecond=0).isoformat().replace('+00:00', 'Z'),
        'trackingSince': args.tracking_since.isoformat(),
        'timezone': args.timezone,
        'periods': {
            'today': period(1),
            'days7': period(7),
            'days30': period(30),
        },
        'daily': daily,
        'topPages': [
            {'path': route, 'title': page_title(args.site_root, route), 'pageViews': count}
            for route, count in page_counts.most_common(12)
        ],
        'referrers': [
            {'domain': domain, 'pageViews': count}
            for domain, count in referrer_counts.most_common(10)
        ],
        'devices': [
            {'name': name, 'pageViews': count}
            for name, count in device_counts.most_common()
        ],
        'method': {
            'cookies': False,
            'botsExcluded': True,
            'visitorDefinition': '同一统计期内，相同网络地址与浏览器标识的匿名组合估算为一位访客。',
        },
    }
    atomic_write(args.output, payload)
    print(f"wrote {len(events)} page views to {args.output}")


if __name__ == '__main__':
    main()
