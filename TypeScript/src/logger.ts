export function _log(message: unknown) {
  console.log("\x1b[33m%s\x1b[0m", message); //yellow
}

export function _debug(message: unknown) {
  console.debug("\x1b[36m%s\x1b[0m", message); //cyan
}

export function _error(message: unknown) {
  console.error("\x1b[31m%s\x1b[0m", message); //red
}

export function _compare(
  first: string | number | object,
  second: string | number | object
) {
  const str1 = first.toString();
  const str2 = second.toString();

  const frm1 = [];
  const frm2 = [];

  let i = 0;
  const isInRange = (str: string) => str.length > i;
  for (; i < Math.max(str1.length, str2.length); ++i) {
    if (str1.charAt(i) === str2.charAt(i)) {
      if (isInRange(str1)) {
        frm1.push(`\x1b[33m${str1.charAt(i)}\x1b[0m`);
      }
      if (isInRange(str2)) {
        frm2.push(`\x1b[33m${str2.charAt(i)}\x1b[0m`);
      }
    } else {
      if (isInRange(str1)) {
        frm1.push(`\x1b[36m${str1.charAt(i)}\x1b[0m`);
      }
      if (isInRange(str2)) {
        frm2.push(`\x1b[31m${str2.charAt(i)}\x1b[0m`);
      }
    }
  }

  const borderArr: string[] = [];
  const borderLength = Math.max(frm1.length, frm2.length) + 4;
  for (let i = 0; i < borderLength; ++i) {
    borderArr.push("*");
  }

  const bottomBorder = borderArr.join("");

  if (borderLength > 9) {
    borderArr[Math.floor(borderLength / 2 - 4)] = "C";
    borderArr[Math.floor(borderLength / 2 - 3)] = "O";
    borderArr[Math.floor(borderLength / 2 - 2)] = "M";
    borderArr[Math.floor(borderLength / 2 - 1)] = "P";
        borderArr[Math.floor(borderLength / 2)] = "A";
    borderArr[Math.floor(borderLength / 2 + 1)] = "R";
    borderArr[Math.floor(borderLength / 2 + 2)] = "E";
  }

  console.log(
    `\n\x1b[34m${borderArr.join("")}\x1b[0m\n\n`,
    frm1.join(""),
    "\n",
    frm2.join(""),
    `\n\n\x1b[34m${bottomBorder}\x1b[0m\n`
  );
}
