import { _debug, _log } from "../../../logger";

function index(s: string): number {
  let wordLastIndex = -1;
  for (let i = 1; i <= s.length; ++i) {
    const symbol = s[s.length - i];

    if (wordLastIndex === -1 && symbol !== " ") wordLastIndex = s.length - i;
    if (symbol === " " && wordLastIndex !== -1)
      return wordLastIndex - (s.length - i);
  }
  if (wordLastIndex !== -1) return wordLastIndex + 1;
  return s.length;
}

_log(index("Hello World"));
_log(index("   fly me   to   the moon  "));
_log(index("luffy is still joyboy"));

_debug(index("a"));
_debug(index(" a"));
_debug(index("a "));
