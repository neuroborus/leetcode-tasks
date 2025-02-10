import { _log } from "../../../logger";

function index(strs: string[]): string {
  let result = "";
  const minLength = strs.reduce((memory: number, item: string) => {
    return item.length < memory ? item.length : memory;
  }, Number.MAX_SAFE_INTEGER);

  for (let i = 0; i < minLength; ++i) {
    let symbol = "";
    for (const str of strs) {
      if (!symbol) {
        symbol = str.charAt(i);
        continue;
      }
      if (symbol !== str.charAt(i)) return result;
    }
    result += symbol;
  }
  return result;
}

_log(index(["flower", "flow", "flight"]));
_log(index(["dog", "racecar", "car"]));
