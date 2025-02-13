import { _compare } from '@/logger';

/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
  const save = Array.from(nums);
  const ind = (index: number): number => {
    if (index < nums.length && index >= 0) return index;
    if (index > nums.length - 1) return ind(index - nums.length);
    return ind(nums.length + index);
  };

  for (let i = 0; i < nums.length; ++i) {
    const index = ind(i - k);
    nums[i] = save[index];
  }
}

// todo: O(1) memory

const nums1 = [1,2,3,4,5,6,7];
rotate(nums1, 3);
_compare([5,6,7,1,2,3,4], nums1);

const nums2 = [-1,-100,3,99];
rotate(nums2, 2);
_compare([3,99,-1,-100], nums2);
