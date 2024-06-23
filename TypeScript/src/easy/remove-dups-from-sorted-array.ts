import { _compare } from "../logger";

function removeDuplicates(nums: number[]): number {
  let dups = 0;
  const mentioned: Set<number> = new Set<number>();

  let border = nums.length;

  for (let i = 0; i < border; ++i) {
    if (mentioned.has(nums[i])) {
      ++dups;
      nums.splice(i, 1);
      --i;
      --border;
    } else {
      mentioned.add(nums[i]);
    }
  }

  return dups;
}

// todo

const nums1 = [1, 1, 2];
const got1 = removeDuplicates(nums1) + "\t" + JSON.stringify(nums1);
const expected1 = "2" + "\t" + JSON.stringify([1, 2]);
_compare(expected1, got1);

const nums2 = [0, 1, 2, 3, 4];
const got2 = removeDuplicates(nums2) + "\t" + JSON.stringify(nums2);
const expected2 = "5" + "\t" + JSON.stringify([1, 2]);
_compare(expected2, got2);
