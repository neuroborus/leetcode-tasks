import { _compare } from '@/logger';

function removeDuplicatesUniversal(nums: number[]): number {
  // Accepts all inputs, not only sorted
  const mentioned: Set<number> = new Set<number>();
  const mentionedTwice: Set<number> = new Set<number>();

  const buffer: number[] = [];

  for (const el of nums) {
    if (mentioned.has(el)) {
      if (!mentionedTwice.has(el)) {
        mentionedTwice.add(el);
        buffer.push(el);
      }
    } else {
      mentioned.add(el);
      buffer.push(el);
    }
  }

  for (let i = 0; i < buffer.length; i++) {
    nums[i] = buffer[i];
  }
  nums.splice(buffer.length, nums.length - buffer.length);

  return buffer.length;
}

function removeDuplicatesNaive(nums: number[]): number {
  const buffer: number[] = [];

  let prev;
  let counter = 0;
  for (const el of nums) {
    if (prev === el) {
      if (counter === 2) continue;
      ++counter;
    } else {
      prev = el;
      counter = 1;
    }
    buffer.push(el);
  }

  for (let i = 0; i < buffer.length; i++) {
    nums[i] = buffer[i];
  }
  nums.splice(buffer.length, nums.length - buffer.length);

  return buffer.length;
}

function removeDuplicatesNaive2(nums: number[]): number {
  let writeIndex = 0;
  let counter = 0;
  let prev: number | undefined;

  for (const el of nums) {
    if (el === prev) {
      if (counter === 2) continue;
      counter++;
    } else {
      prev = el;
      counter = 1;
    }
    nums[writeIndex++] = el;
  }

  nums.splice(writeIndex);

  return writeIndex;
}

function removeDuplicates(nums: number[]): number {
  // !: Do not remove 'garbage' elements

  let count = 2;

  for (let i = 2; i < nums.length; i++) {
    const current = nums[i];
    if (current !== nums[count - 2]) {
      nums[count] = current;
      count++;
    }
  }
  return count;
}



const nums1 = [1,1,1,2,2,3];
const got1 = removeDuplicates(nums1) + '\t' + JSON.stringify(nums1);
const expected1 = '5' + '\t' + JSON.stringify([1,1,2,2,3]);
_compare(expected1, got1);

const nums2 = [0,0,1,1,1,1,2,3,3];
const got2 = removeDuplicates(nums2) + '\t' + JSON.stringify(nums2);
const expected2 = '7' + '\t' + JSON.stringify([0,0,1,1,2,3,3]);
_compare(expected2, got2);
