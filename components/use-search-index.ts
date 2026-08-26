'use client';

import { useEffect, useState } from 'react';
import type { SearchRecord } from '@/lib/search-types';

let cachedRecords: SearchRecord[] | undefined;
let pendingRequest: Promise<SearchRecord[]> | undefined;

function loadSearchRecords() {
  if (cachedRecords) return Promise.resolve(cachedRecords);
  if (!pendingRequest) {
    pendingRequest = fetch('/search-index.json')
      .then((response) => {
        if (!response.ok) throw new Error(`Search index request failed: ${response.status}`);
        return response.json() as Promise<SearchRecord[]>;
      })
      .then((records) => {
        cachedRecords = records;
        return records;
      })
      .finally(() => { pendingRequest = undefined; });
  }
  return pendingRequest;
}

export function useSearchIndex(enabled: boolean) {
  const [records, setRecords] = useState<SearchRecord[]>(() => cachedRecords ?? []);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    loadSearchRecords().then((items) => {
      if (active) {
        setRecords(items);
        setFailed(false);
      }
    }).catch(() => {
      if (active) setFailed(true);
    });
    return () => { active = false; };
  }, [enabled]);

  return { records, loading: enabled && records.length === 0 && !failed, failed };
}
