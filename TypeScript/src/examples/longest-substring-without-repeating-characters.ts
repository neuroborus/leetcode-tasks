import { _compare } from "../logger";

function lengthOfLongestSubstring(s: string): number {
  if (s.length === 0) return 0;
  if (s.length === 1) return 1;

  const visited: Set<string> = new Set();

  let indexA = 0;
  let indexB = 0;
  let maxLength = 0;
  for (let i = 0; i < s.length; i++) {
    while (visited.has(s[indexB])) {
      visited.delete(s[indexA]);
      ++indexA;
    }

    visited.add(s[i]);
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
