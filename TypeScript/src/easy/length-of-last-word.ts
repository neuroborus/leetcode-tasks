import {_debug, _log} from "../logger";

function lengthOfLastWord(s: string): number {
    let wordLastIndex = -1;
    for (let i = 1; i <= s.length; ++i) {
        const symbol = s[s.length-i];

        if (wordLastIndex === -1 && symbol !== ' ' ) wordLastIndex = s.length - i;
        if (symbol === ' ' && wordLastIndex !== -1) return wordLastIndex - (s.length - i);
    }
    if (wordLastIndex !== -1) return wordLastIndex + 1;
    return s.length;
}

_log(lengthOfLastWord("Hello World"));
_log(lengthOfLastWord("   fly me   to   the moon  "));
_log(lengthOfLastWord("luffy is still joyboy"));

_debug(lengthOfLastWord("a"));
_debug(lengthOfLastWord(" a"));
_debug(lengthOfLastWord("a "));