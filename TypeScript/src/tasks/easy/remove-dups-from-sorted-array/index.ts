import { _compare } from '@/logger';

function removeDuplicatesNaive(nums: number[]): number {
  const mentioned: Set<number> = new Set<number>();

  let border = nums.length;

  for (let i = 0; i < border; ++i) {
    if (mentioned.has(nums[i])) {
      nums.splice(i, 1);
      --i;
      --border;
    } else {
      mentioned.add(nums[i]);
    }
  }

  return mentioned.size;
}

function removeDuplicates(nums: number[]): number {
  const mentioned: Set<number> = new Set<number>(nums);

  let i = 0;
  for (const value of mentioned.values()) {
    if (i < nums.length - 1) {
      nums[i] = value;
    } else {
      nums.push(value);
    }
    ++i;
  }
  nums.splice(mentioned.size, nums.length - mentioned.size);
  return mentioned.size;
}


const nums1 = [1, 1, 2];
const got1 = removeDuplicates(nums1) + '\t' + JSON.stringify(nums1);
const expected1 = '2' + '\t' + JSON.stringify([1, 2]);
_compare(expected1, got1);

const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const got2 = removeDuplicates(nums2) + '\t' + JSON.stringify(nums2);
const expected2 = '5' + '\t' + JSON.stringify([0, 1, 2, 3, 4]);
_compare(expected2, got2);
