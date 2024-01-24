import { _log } from "../logger";

const mappingOpenToClose: Record<string, string> = {
  "(": ")",
  "{": "}",
  "[": "]",
};

const mappingCloseToOpen: Record<string, string> = {
  ")": "(",
  "}": "{",
  "]": "[",
};

function isValid(s: string): boolean {
  const arr = Array.from(s);
  const waitingFor: string[] = [];
  for (const el of arr) {
    if (waitingFor[waitingFor.length - 1] === el) {
      waitingFor.pop();
    } else {
      if (mappingCloseToOpen[el]) return false;
      const wf = mappingOpenToClose[el];
      if (wf) waitingFor.push(wf);
    }
  }
  return !waitingFor.length;
}

_log(isValid("()"));
_log(isValid("()[]{}"));
_log(isValid("(]"));
