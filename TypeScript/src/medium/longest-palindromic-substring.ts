import { _compare } from "../logger";

function longestPalindrome(str: string): string {
  if (str.length < 2) return str;

  let maxLength = 1;
  let startInd = 0;
  let lowBorder, highBorder;
  for (let i = 0; i < str.length; i++) {
    lowBorder = i - 1;
    highBorder = i + 1;
    while (highBorder < str.length && str[highBorder] === str[i]) {
      highBorder++;
    }

    while (lowBorder >= 0 && str[lowBorder] === str[i]) {
      lowBorder--;
    }

    while (
      lowBorder >= 0 &&
      highBorder < str.length &&
      str[lowBorder] === str[highBorder]
    ) {
      lowBorder--;
      highBorder++;
    }

    const length = highBorder - lowBorder - 1;
    if (maxLength < length) {
      maxLength = length;
      startInd = lowBorder + 1;
    }
  }
  return str.slice(startInd, startInd + maxLength);
}

_compare("454", longestPalindrome("ab123454678ba"));

_compare("bab", longestPalindrome("babad"));
_compare("bb", longestPalindrome("cbbd"));
