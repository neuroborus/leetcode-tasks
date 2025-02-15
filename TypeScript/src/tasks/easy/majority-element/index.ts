import { _compare } from '@/logger';

function majorityElement(nums: number[]): number {
  const n = nums.length;
  let candidate = -1;
  let candidateHealth = 0;

  // Find a candidate
  for (const num of nums) {
    if (candidateHealth === 0) {
      candidate = num;
      candidateHealth = 1;
    } else if (num === candidate) {
      candidateHealth++;
    } else {
      candidateHealth--;
    }
  }
  // Validate the candidate
  candidateHealth = 0;
  for (const num of nums) {
    if (num === candidate) {
      candidateHealth++;
    }
  }
  // If candidateHealth is greater than n / 2, return the candidate; otherwise, return -1
  if (candidateHealth > n / 2) {
    return candidate;
  } else {
    return -1;
  }
}

const act1 = majorityElement([3, 2, 3]);
_compare(3, act1);

const act2 = majorityElement([2, 2, 1, 1, 1, 2, 2]);
_compare(2, act2);
