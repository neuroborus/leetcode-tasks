import {_debug, _log} from "../logger";

function plusOne(digits: number[]): number[] {
    const result = digits;

    if (result[result.length - 1] !== 9) {
        ++result[result.length - 1];
        return result;
    }

    let c = 0;
    while (digits.length - 1 - c >= 0) {
        if (result[digits.length - 1 - c] === 9) {
            if (digits.length - 1 - c === 0) {
                result[0] = 1
                result.push(0);
                ++c;
            } else {
                result[digits.length - 1 - c] = 0;
            }
        } else {
            ++result[digits.length - 1 - c];
            break;
        }
        ++c;
    }
    return result;
}

_log(plusOne([1, 2, 3]));
_log(plusOne([4, 3, 2, 1]));
_log(plusOne([9]));

_debug(plusOne([9, 9]));
_debug(plusOne([8, 9, 9, 9]));
_debug(plusOne([9, 8, 9]));

