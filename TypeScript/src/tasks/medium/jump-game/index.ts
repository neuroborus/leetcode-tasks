import { _compare } from '@/logger';
import { bigArray } from './big-array';

function canJumpRecursive(nums: number[]): boolean {
  // Don't work with big arrays
  const findWay = (index = 0, jumpToIndex = 0): boolean => {
    const currentJumpLength = nums[index];
    if (currentJumpLength < jumpToIndex - index) {
      // _debug(`${index}-${jumpToIndex} - impossible`);
      return false;
    }
    if (jumpToIndex === nums.length - 1) {
      // _debug(`${index}-${jumpToIndex} - success`);
      return true;
    }
    let isFound = false;
    const futureJumpLength = nums[jumpToIndex];
    for (
      let j = 1;
      j <= Math.min(futureJumpLength, nums.length - index - 1);
      ++j
    ) {
      isFound = isFound || findWay(jumpToIndex, jumpToIndex + j);
    }
    // _debug(`${index}-${jumpToIndex} - isFound=${isFound}`);
    return isFound;
  };
  return findWay();
}

enum Jumpable {
  Yes = 1,
  No = 0,
  Unknown = -1,
}
function canJumpDP(nums: number[]): boolean {
  // O(n^2) - 2xDimensional memorization

  // dynamic programming. 0 - false, 1 - true, -1 - unknown;
  const dp: number[][] = Array(nums.length).fill(
    Array(nums.length).fill(Jumpable.Unknown)
  );
  const findWay = (index = 0, jumpToIndex = 0): boolean => {
    if (dp[index][jumpToIndex] !== Jumpable.Unknown)
      return dp[index][jumpToIndex] === Jumpable.Yes;

    const currentJumpLength = nums[index];
    if (currentJumpLength < jumpToIndex - index) {
      dp[index][jumpToIndex] = Jumpable.No;
      return false;
    }
    if (jumpToIndex === nums.length - 1) {
      dp[index][jumpToIndex] = Jumpable.Yes;
      return true;
    }
    let isFound = false;
    const futureJumpLength = nums[jumpToIndex];
    for (
      let j = Math.min(futureJumpLength, nums.length - index - 1);
      j > 0 ;
      --j
    ) {
      isFound = isFound || findWay(jumpToIndex, jumpToIndex + j);
      if (isFound) break;
    }
    dp[index][jumpToIndex] = isFound ? Jumpable.Yes : Jumpable.No;
    return isFound;
  };
  return findWay();
}

function canJump(nums: number[]): boolean {
    // Greedy Algorithm - optimal one
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false; // If we on the unreachable position
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= nums.length - 1) return true; // If we can jump to the end
    }
    return maxReach >= nums.length - 1;
}

_compare(true, canJump([2, 3, 1, 1, 4]));
_compare(false, canJump([3, 2, 1, 0, 4]));
_compare(true, canJump([1, 2, 0, 1]));
_compare(false, canJump(bigArray));
