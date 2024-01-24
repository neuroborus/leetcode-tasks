import { _log } from "../logger";

const mapping: Record<string, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

const mappingDuos: Record<string, number> = {
  IV: 4,
  IX: 9,
  XL: 40,
  XC: 90,
  CD: 400,
  CM: 900,
};

function broker(arr: string[]): number {
  let sum = 0;
  const duosEntries = Object.entries(mappingDuos);
  let prev = "";
  let prevVal = 0;
  for (let i = 0; i < arr.length; ++i) {
    if (prev && duosEntries.find((el) => el[0] === `${prev}${arr[i]}`)) {
      prevVal = mappingDuos[`${prev}${arr[i]}`];
    } else {
      sum += prevVal;
      prevVal = mapping[arr[i]];
    }

    prev = arr[i];
  }
  sum += prevVal || 0;
  return sum;
}

function romanToInt(s: string): number {
  return broker(Array.from(s));
}

_log(romanToInt("III"));
_log(romanToInt("LVIII"));
_log(romanToInt("MCMXCIV"));
