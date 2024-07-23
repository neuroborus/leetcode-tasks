import { _compare } from "../logger";

function myLengthOfLongestSubstring(s: string): number {
  let alreadyBeen: Map<string, number> = new Map(); // element - index

  let longest: string[] = [];
  let current: string[] = [];
  for (let i = 0; i < s.length; i++) {
    const index = alreadyBeen.get(s[i]);
    if (index !== undefined) {
      alreadyBeen = new Map();
      longest = current.length > longest.length ? current : longest;
      if (index < current.length) {
        current = current.slice(index + 1);
        for (let j = 0; j < current.length; j++) {
          alreadyBeen.set(current[j], j);
        }
      } else {
        current = [];
      }
    }
    const l = current.push(s[i]);
    alreadyBeen.set(s[i], l - 1);
  }
  return Math.max(longest.length, current.length);
}

function lengthOfLongestSubstring(s: string): number {
  if (s.length === 0) return 0;
  if (s.length === 1) return 1;

  const alreadyBeen: Set<string> = new Set();

  let indexA = 0;
  let indexB = 0;
  let maxLength = 0;
  for (let i = 0; i < s.length; i++) {
    while (alreadyBeen.has(s[indexB])) {
      alreadyBeen.delete(s[indexA]);
      ++indexA;
    }

    alreadyBeen.add(s[i]);
    maxLength = Math.max(maxLength, indexB - indexA + 1);
    ++indexB;
  }
  return maxLength;
}

_compare(3, lengthOfLongestSubstring("abcabcbb"));
_compare(1, lengthOfLongestSubstring("bbbbb"));
_compare(3, lengthOfLongestSubstring("pwwkew"));

_compare(1, lengthOfLongestSubstring(" "));
_compare(3, lengthOfLongestSubstring("dvdf"));
