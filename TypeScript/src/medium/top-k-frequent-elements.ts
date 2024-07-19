import { _compare } from "../logger";

function topKFrequent(nums: number[], k: number): number[] {
  const frequents = new Map<number, number>();

  for (const num of nums) {
    const val = frequents.get(num);
    if (val) {
      frequents.set(num, val + 1);
    } else {
      frequents.set(num, 1);
    }
  }

  const sorted: [number, number][] = Array.from(frequents.entries()).sort(
    ([key1, val1], [key2, val2]) => val2 - val1
  );

  return sorted.slice(0, k).map(([k, v]) => k);
}

_compare("[1,2]", `[${topKFrequent([1, 1, 1, 2, 2, 3], 2)}]`);
_compare("[1]", `[${topKFrequent([1], 1)}]`);
