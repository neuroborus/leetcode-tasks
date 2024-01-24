import {_compare, _debug, _error, _log} from "../logger";

/*function addBinary(a: string, b: string): string {
    const a10: number = parseInt(a, 2);
    const b10: number = parseInt(b, 2);

    return (a10 + b10).toString(2);
}*/ //

function addBinary(a: string, b: string): string {
    let arrA: string[] = Array.from(a);
    let arrB: string[] = Array.from(b);

    if (arrA.length < arrB.length) {
        const tmp = arrA;
        arrA = arrB;
        arrB = tmp;
    }

    let result: string[] = arrA;

    const minLength = arrB.length;

    let deep = 0;
    while (minLength - deep > 0) {
        const aInd = arrA.length - 1 - deep;
        const bInd = arrB.length - 1 - deep;

        let c = 0;
        do {
            if (aInd - c < 0) {
                result.unshift('1');
                c = 0;
                break;
            }
            const sideStep = c ? 1 : 0;

            let smallInd = (+arrB[bInd] - c);
            smallInd = smallInd < 0 ? 0 : smallInd;

            switch((+arrA[aInd - c]) + smallInd + sideStep) {
                case 0:
                    c = 0;
                    break;
                case 1:
                    result[aInd - c] = '1';
                    c = 0;
                    break;
                case 2:
                    result[aInd - c] = '0';
                    ++c;
                    break;
                case 3:
                    result[aInd - c] = '1';
                    ++c;
                    break;
                default:
                    _error(`Unexpected behavior:
                     sw=${(+arrA[aInd - c]) + smallInd + sideStep},
                     c=${c},
                     deep=${deep}`);
                    return '';
            }
        } while (c);
        ++deep;
    }
    return result.join('');
}

_log(addBinary('11', '1'));
_log(addBinary('1010', '1011'));


const complex = addBinary(
    "10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101",
    "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011");
const answer = "110111101100010011000101110110100000011101000101011001000011011000001100011110011010010011000000000";
_debug(complex === answer);
_compare(answer, complex);
