import { _compare } from "../logger";

function longestPalindrome(str: string): string {
  if (str.length < 2) return str;

  let maxLength = 1;
  let startInd = 0;
  for (let i = 0; i < str.length; i++) {
    let leftBorder = i - 1;
    let rightBorder = i + 1;

    while (rightBorder < str.length && str[rightBorder] === str[i]) {
      rightBorder++;
    }

    while (leftBorder >= 0 && str[leftBorder] === str[i]) {
      leftBorder--;
    }

    while (
      leftBorder >= 0 &&
      rightBorder < str.length &&
      str[leftBorder] === str[rightBorder]
    ) {
      leftBorder--;
      rightBorder++;
    }

    const length = rightBorder - leftBorder - 1;
    if (maxLength < length) {
      maxLength = length;
      startInd = leftBorder + 1;
    }
  }
  return str.slice(startInd, startInd + maxLength);
}

_compare("bab", longestPalindrome("babad"));
_compare("bb", longestPalindrome("cbbd"));
