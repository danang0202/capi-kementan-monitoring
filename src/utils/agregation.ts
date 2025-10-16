// --- Aggregation helpers ---

import { DataItem, RowItem } from '../types/Wilayah';

// group data by a key function and compute sum(value) and sum(max)
const aggregateBy = (items: DataItem[], keyFn: (d: DataItem) => string) => {
  const map = new Map<string, { totalValue: number; totalMax: number }>();
  for (const it of items) {
    const key = keyFn(it);
    const cur = map.get(key) ?? { totalValue: 0, totalMax: 0 };
    cur.totalValue += it.value;
    cur.totalMax += it.max;
    map.set(key, cur);
  }
  // produce RowItem array
  const rows: RowItem[] = [];
  let idCounter = 1;
  for (const [name, { totalValue, totalMax }] of map.entries()) {
    const progress = totalMax > 0 ? (totalValue / totalMax) * 100 : 0;
    rows.push({
      id: `${name}-${idCounter++}`,
      name,
      value: totalValue,
      max: totalMax,
      progress,
    });
  }
  // sort by name for stable display
  return rows.sort((a, b) => a.name.localeCompare(b.name));
};

export default aggregateBy;
