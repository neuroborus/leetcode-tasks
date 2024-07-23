import { _compare } from "../logger";

function maximumSubarraySum(nums: number[], k: number): number {
  let currentSum = 0;
  for (let i = 0; i < k; i++) {
    currentSum += nums[i];
  }

  let maxSum = currentSum;
  for (let i = k; i < nums.length; i++) {
    currentSum += nums[i] - nums[i - k];
    if (currentSum > maxSum) maxSum = currentSum;
  }

  return maxSum;
}

_compare(27, maximumSubarraySum([1, 5, 4, 2, 9, 9, 9], 3));
_compare(12, maximumSubarraySum([4, 4, 4], 3));
