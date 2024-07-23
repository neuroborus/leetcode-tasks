import { _compare } from "../logger";

function firstMaximumSubarraySum(nums: number[], k: number): number {
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

function maximumSubarraySum(nums: number[], k: number): number {
  if (nums.length === 0 || k < 1) return 0;

  let indexA = 0;
  let indexB = 0;
  let currentSum = 0;
  let maxSum = 0;
  const visited: Set<number> = new Set();

  while (indexB < nums.length) {
    if (indexB - indexA < k) {
      if (visited.has(nums[indexB])) {
        // Clear till dup
        while (nums[indexA] !== nums[indexB]) {
          visited.delete(nums[indexA]);
          currentSum -= nums[indexA];
          indexA++;
        }
        // Rm dup
        visited.delete(nums[indexA]);
        currentSum -= nums[indexA];
        indexA++;
      }
      // Add new el
      visited.add(nums[indexB]);
      currentSum += nums[indexB];
      indexB++;

      // ОUpdate maxSum
      if (indexB - indexA === k) {
        maxSum = Math.max(maxSum, currentSum);
      }
    } else {
      // Remove out-of-window el
      visited.delete(nums[indexA]);
      currentSum -= nums[indexA];
      indexA++;
    }
  }

  return maxSum;
}

_compare(15, maximumSubarraySum([1, 5, 4, 2, 9, 9, 9], 3));
_compare(0, maximumSubarraySum([4, 4, 4], 3));

_compare(24, maximumSubarraySum([1, 1, 1, 7, 8, 9], 3));
