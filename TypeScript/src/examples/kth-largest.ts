import { _compare } from "../logger";

function findKthLargest(nums: number[], k: number): number {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  for (const num of nums) {
    if (num > max) max = num;
    if (num < min) min = num;
  }

  while (min <= max) {
    const average = Math.floor((max + min) / 2);
    let greater = 0;
    let equal = 0;

    for (const num of nums) {
      if (num > average) greater++;
      else if (num === average) equal++;
    }

    if (greater < k && greater + equal >= k) {
      return average;
    } else if (greater >= k) {
      min = average + 1;
    } else {
      max = average - 1;
    }
  }

  return max;
}

_compare(5, findKthLargest([3, 2, 1, 5, 6, 4], 2));
_compare(4, findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));

_compare(-1, findKthLargest([-1, -1], 2));
_compare(0, findKthLargest([-1, 2, 0], 2));
