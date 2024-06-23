import { _compare } from "../logger";

function mySqrt(x: number): number {
  return Math.floor(sqrt(x));
}

function sqrt(x: number, epsilon = 1e-10): number {
  switch (true) {
    case x < 0:
      throw new Error("Negative numbers don't have real square roots");
    case x === 0:
      return 0;
    case x === 1:
      return 1;
    default:
      let y = x;
      let prev;
      let absEps = 0;

      do {
        prev = y;
        y = 0.5 * (y + x / y);

        const dif = y - prev;
        absEps = dif > 0 ? dif : dif * -1;
      } while (absEps > epsilon);

      return y;
  }
}

_compare(mySqrt(4), 2);
_compare(mySqrt(8), 2);
_compare(mySqrt(3), 1);
