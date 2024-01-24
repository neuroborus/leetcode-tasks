export function _log(message: unknown) {
    console.log('\x1b[36m%s\x1b[0m', message);  //cyan
}

export function _debug(message: unknown) {
    console.debug('\x1b[33m%s\x1b[0m', message);  //yellow
}

export function _error(message: unknown) {
    console.error('\x1b[31m%s\x1b[0m', message);  //red
}

export function _compare(first: string | object, second: string | object) {
    const str1 = first.toString();
    const str2 = second.toString();

    let frm1 = [];
    let frm2 = [];

    let i = 0;
    const isInRange = (str: string) => str.length > i;
    for (; i < Math.max(str1.length, str2.length) - 1; ++i) {
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

    let borderArr = [];
    const borderLength = Math.max(frm1.length, frm2.length);
    for (let i = 0; i < borderLength; ++i) {
        borderArr.push('*');
    }

    const bottomBorder = borderArr.join('');

    borderArr[borderLength / 2 - 5] = 'C';
    borderArr[borderLength / 2 - 4] = 'O';
    borderArr[borderLength / 2 - 3] = 'M';
    borderArr[borderLength / 2 - 2] = 'P';
    borderArr[borderLength / 2 - 1] = 'A';
        borderArr[borderLength / 2] = 'R';
    borderArr[borderLength / 2 + 1] = 'E';

    console.log(
        `\n\x1b[34m${borderArr.join('')}\x1b\n\n`,
        frm1.join(''),
        '\n',
        frm2.join(''),
        `\n\n\x1b[34m${bottomBorder}\x1b\n`
    );
}