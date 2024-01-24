import { _log } from "../logger";

function isPalindrome(x: number): boolean {
  const str = x.toString();
  const length = str.length;
  for (let i = 0; i < length / 2; ++i) {
    if (str[i] !== str[length - 1 - i]) return false;
  }
  return true;
}

_log(isPalindrome(121));
_log(isPalindrome(-121));
_log(isPalindrome(10));
