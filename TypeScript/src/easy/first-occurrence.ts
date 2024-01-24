import { _log } from "../logger";

function strStr(haystack: string, needle: string): number {
  const r = new RegExp(needle);
  const match = r.exec(haystack);
  if (match) return match.index;
  return -1;
}

_log(strStr("sadbutsad", "sad"));
_log(strStr("leetcode", "leeto"));
