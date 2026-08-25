'use client';

import { useMemo, useState } from 'react';

const rates = [4, 6, 8, 9, 12];
const matches = [
  { goal: '两个月后要交的房租', note: '期限很短，不能承受本金波动。', choices: ['高流动性现金工具', '单只成长股', '长期债券', '商品期货'], correct: 0 },
  { goal: '二十年后的退休资金', note: '期限长且可持续投入，可承担一定市场波动。', choices: ['全部活期现金', '全球分散的股债组合', '借款炒期权', '只买一家公司'], correct: 1 },
  { goal: '六个月生活费的应急金', note: '要随时可用，安全和流动性优先。', choices: ['封闭五年产品', '高流动性低波动工具', '小盘股票基金', '加密资产'], correct: 1 },
  { goal: '三年后确定支付的留学学费', note: '目标明确，且还可能存在外币支出。', choices: ['全仓高波动股票', '与期限及币种匹配的稳健资产', '无限期锁仓', '高杠杆外汇'], correct: 1 },
];
const detectiveCases = [
  { title: '“年化 18%，保本保息”', body: '销售称机会仅限今天，收款转入个人账户，无法提供托管与底层资产信息。', answer: '拒绝并查证主体', reason: '高收益保本承诺、制造紧迫感、个人收款与信息不透明同时出现，是严重红旗。' },
  { title: '低费率宽基指数基金', body: '官网可查招募说明书、托管人、跟踪指数、费用和风险等级，但市场价格会波动。', answer: '阅读资料并匹配目标', reason: '公开资料齐全不等于保证盈利；仍需考察底层资产、资金期限、价格波动与个人目标。' },
  { title: '熟人推荐“内部份额”', body: '没有正式合同，对方只展示收益截图，承诺拉新还能获得返佣。', answer: '拒绝并查证主体', reason: '没有合同、只展示收益和拉新返佣时，应停止转账，并通过监管机构或正式工商资料查询合同主体。' },
];

export function FinanceGames() {
  const [rateIndex, setRateIndex] = useState(1);
  const [years, setYears] = useState(12);
  const [speedResult, setSpeedResult] = useState('');
  const exactYears = useMemo(() => Math.log(2) / Math.log(1 + rates[rateIndex] / 100), [rateIndex]);
  const checkSpeed = () => setSpeedResult(Math.abs(years - exactYears) <= 1 ? `很准！精确约 ${exactYears.toFixed(1)} 年，72 法则估算为 ${(72 / rates[rateIndex]).toFixed(1)} 年。` : `再试一次。精确约 ${exactYears.toFixed(1)} 年；可以先用 72 ÷ ${rates[rateIndex]} 估算。`);

  const [matchIndex, setMatchIndex] = useState(0);
  const [matchScore, setMatchScore] = useState(0);
  const [matchAnswer, setMatchAnswer] = useState<number | null>(null);
  const chooseMatch = (choice: number) => {
    if (matchAnswer !== null) return;
    setMatchAnswer(choice);
    if (choice === matches[matchIndex].correct) setMatchScore((score) => score + 1);
  };
  const nextMatch = () => {
    setMatchAnswer(null);
    setMatchIndex((index) => (index + 1) % matches.length);
    if (matchIndex === matches.length - 1) setMatchScore(0);
  };

  const [caseIndex, setCaseIndex] = useState(0);
  const [caseChoice, setCaseChoice] = useState('');
  const currentCase = detectiveCases[caseIndex];

  return (
    <section className="game-grid">
      <article className="game-card game-speed">
        <header><span>游戏 1</span><b>复利冲刺</b><small>估算力</small></header>
        <h2>一笔钱按年化 {rates[rateIndex]}% 复利，多久大约翻倍？</h2>
        <div className="rate-picker">{rates.map((rate, index) => <button type="button" className={index === rateIndex ? 'active' : ''} onClick={() => { setRateIndex(index); setSpeedResult(''); }} key={rate}>{rate}%</button>)}</div>
        <label><span>你的答案</span><input type="range" min="5" max="25" value={years} onChange={(event) => { setYears(Number(event.target.value)); setSpeedResult(''); }} /><b>{years} 年</b></label>
        <button className="game-primary" type="button" onClick={checkSpeed}>提交估算</button>
        {speedResult && <p className="game-feedback">{speedResult}</p>}
      </article>

      <article className="game-card game-match">
        <header><span>游戏 2</span><b>目标配对</b><small>资产匹配</small></header>
        <div className="game-score"><span>第 {matchIndex + 1} / {matches.length} 题</span><b>{matchScore} 分</b></div>
        <h2>{matches[matchIndex].goal}</h2><p>{matches[matchIndex].note}</p>
        <div className="match-choices">{matches[matchIndex].choices.map((choice, index) => <button type="button" className={matchAnswer === null ? '' : index === matches[matchIndex].correct ? 'correct' : index === matchAnswer ? 'wrong' : ''} onClick={() => chooseMatch(index)} key={choice}>{choice}</button>)}</div>
        {matchAnswer !== null && <div className="game-feedback"><b>{matchAnswer === matches[matchIndex].correct ? '配对正确' : '再看一次期限和风险'}</b><span>{matches[matchIndex].note}</span><button type="button" onClick={nextMatch}>{matchIndex === matches.length - 1 ? '重新挑战' : '下一题'} →</button></div>}
      </article>

      <article className="game-card game-detective">
        <header><span>游戏 3</span><b>产品侦探</b><small>骗局识别</small></header>
        <div className="case-tabs">{detectiveCases.map((item, index) => <button type="button" className={index === caseIndex ? 'active' : ''} onClick={() => { setCaseIndex(index); setCaseChoice(''); }} key={item.title}>案件 {index + 1}</button>)}</div>
        <h2>{currentCase.title}</h2><p>{currentCase.body}</p>
        <div className="detective-choices">{['立即转账', '阅读资料并匹配目标', '拒绝并查证主体'].map((choice) => <button type="button" className={caseChoice ? (choice === currentCase.answer ? 'correct' : choice === caseChoice ? 'wrong' : '') : ''} onClick={() => setCaseChoice(choice)} key={choice}>{choice}</button>)}</div>
        {caseChoice && <p className="game-feedback"><b>{caseChoice === currentCase.answer ? '判断正确' : '这个选择遗漏了重要风险'}</b>{currentCase.reason}</p>}
      </article>
    </section>
  );
}
