import { _compare } from "../logger";

function backtrack(
  candidates: number[],
  target: number,
  temp: number[],
  result: number[][],
  startIndex = 0
) {
  if (target < 0) return;
  if (target === 0) {
    result.push(temp);
    return;
  }
  for (let i = startIndex; i < candidates.length; ++i) {
    temp.push(candidates[i]);
    backtrack(candidates, target - candidates[i], Array.from(temp), result, i); // clone temp
    temp.pop();
  }
}

function combinationSum(candidates: number[], target: number): number[][] {
  // candidates are already sorted ascending
  // candidates are already distinct

  const result: number[][] = [];
  backtrack(candidates, target, [], result);

  return result;
}

_compare([[2, 2, 3], [7]], combinationSum([2, 3, 6, 7], 7));
_compare(
  [
    [2, 2, 2, 2],
    [2, 3, 3],
    [3, 5],
  ],
  combinationSum([2, 3, 5], 8)
);
_compare([], combinationSum([2], 1));
