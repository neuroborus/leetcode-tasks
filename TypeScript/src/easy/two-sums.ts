import { _log } from "../logger";

function twoSum(nums: number[], target: number): number[] {
  const i = 0;
  const j = 0;
  for (let i = 0; i < nums.length; ++i) {
    for (let j = 0; j < nums.length; ++j) {
      if (j === i) continue;

      const a = nums[i];
      const b = nums[j];
      if (a + b === target) return [i, j];
    }
  }
  return [];
}

_log(twoSum([2, 7, 11, 15], 9));
_log(twoSum([3, 2, 4], 6));
_log(twoSum([3, 3], 6));
