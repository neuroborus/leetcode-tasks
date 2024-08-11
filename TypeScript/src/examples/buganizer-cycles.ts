/*
 * Imagine we are software development company, and we manage our dev process by using issue tracking tool.
 * Each issue has Id and Ids of issues which block it(Blockers).
 * As result we have 1 or multiple unidirectional graphs because there could have several root issues(Epics).
 * At some point in time someone adde issue as a Blocker which was already blocked
 *  by parents of current issue and this way created Circular Dependency graph.
 * After this our UI issue tracking tool(Taskflow) stopped showing issues correctly.
 * Our task to find out all circular dependency loops.
 * Input is 2D array of blockers assignments.
 * Raw number is issue id.
 * Column number is blocker issue id.
 */

import { _compare } from "../logger";
// I (BLOCKERS) -> J (BLOCKED)
const inputOne = [
  //(j0)1 (j1)2 (j2)3
  [false, false, true], // (i0)1
  [true, false, false], // (i1)2
  [false, true, false], // (i2)3
];
// I (BLOCKERS) -> J (BLOCKED)
const inputTwo = [
  //j0     j1    j2     j3     j4     j5     j6     j7     j8     j9
  [false, true, false, false, false, false, false, false, false, false], // i0
  [false, false, true, false, false, false, false, false, false, false], // i1
  [false, false, false, true, false, true, false, false, false, false], // i2
  [false, false, false, false, true, false, false, false, false, false], // i3
  [false, false, false, false, false, false, false, true, false, false], // i4
  [false, false, false, false, false, false, true, false, false, false], // i5
  [false, false, false, false, false, false, false, true, false, false], // i6
  [false, false, false, false, false, false, false, false, true, false], // i7
  [false, false, false, false, false, false, false, false, false, true], // i8
  [false, false, false, false, false, false, false, false, false, false], // i9
];
// I (BLOCKERS) -> J (BLOCKED)
const inputThree = [
  // j0    j1     j2     j3     j4     j5     j6     j7    j8     j9     j10
  [false, false, false, true, false, false, false, false, false, false, false], // i0
  [false, false, false, false, true, false, true, false, false, false, false], // i1
  [false, false, false, false, false, false, false, false, false, false, false], // i2
  [false, false, false, false, true, false, false, false, false, false, false], // i3
  [false, false, false, false, false, true, false, false, false, false, false], // i4
  [false, false, false, false, false, false, true, false, true, false, false], // i5
  [false, false, false, false, false, false, false, true, false, false, false], // i6
  [false, false, false, false, false, true, false, false, false, false, false], // i7
  [false, false, false, false, false, false, false, false, false, true, false], // i8
  [false, false, false, true, false, false, false, false, false, false, true], // i9
  [false, false, false, false, false, false, false, false, false, false, false], // i10
];

const outputOne = [0, 1, 2];
const outputTwo: number[] = [];
const outputThree = [3, 4, 5, 6, 7, 8, 9];

const advancedOutputThree = [
  [3, 4, 5, 8, 9],
  [5, 6, 7],
];

function detectBlockedBlockers(matrix: boolean[][]): number[] {
  const blockers = new Set<number>();
  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < matrix.length; ++j) {
      if (matrix[i][j]) blockers.add(i);
    }
  }
  // ! For representative - second loop
  for (let i = 0; i < matrix.length; ++i) {
    let flagHorizontal = false;
    let flagVertical = false;
    for (let j = 0; j < matrix.length; ++j) {
      if (matrix[i][j]) {
        flagHorizontal = true;
      }
      if (matrix[j][i]) {
        flagVertical = true;
      }
    }
    if (!flagHorizontal || !flagVertical) blockers.delete(i);
  }

  return Array.from<number>(blockers);
}

function detectCyclesPartial(matrix: boolean[][]) {
  const blockers: number[] = detectBlockedBlockers(matrix);
  const elBlockers: Map<number, number[]> = new Map();
  for (const j of blockers) {
    const tmp: number[] = [];
    for (const i of blockers) {
      if (matrix[j][i]) {
        tmp.push(i);
      }
    }
    if (tmp.length) elBlockers.set(j, tmp);
  }

  const search = (el: number, history: number[], loops: number[][]) => {
    const foundIndex = history.indexOf(el);
    if (foundIndex !== -1) {
      loops.push(history.slice(foundIndex, history.length));
      return;
    }
    const blockersOfEl = elBlockers.get(el) ?? [];
    for (const blocker of blockersOfEl) {
      search(blocker, [...history, el], loops);
    }
  };

  const results: number[][] = [];
  search(blockers[0], [], results);
  return results;
}

// OPTIMIZED SUMMARY
function detectCycles(matrix: boolean[][]) {
  const blockers: number[] = detectBlockedBlockers(matrix);
  const elBlockers: Map<number, number[]> = new Map();
  for (let i = 0; i < matrix.length; ++i) {
    let flagVertical = false;
    const tmp: number[] = [];
    for (let j = 0; j < matrix.length; ++j) {
      if (matrix[i][j]) {
        tmp.push(j);
      }
      if (matrix[j][i]) {
        flagVertical = true;
      }
    }
    if (tmp.length && flagVertical) elBlockers.set(i, tmp);
  }

  const search = (el: number, history: number[], loops: number[][]) => {
    const foundIndex = history.indexOf(el);
    if (foundIndex !== -1) {
      loops.push(history.slice(foundIndex, history.length));
      return;
    }
    const blockersOfEl = elBlockers.get(el) ?? [];
    for (const blocker of blockersOfEl) {
      search(blocker, [...history, el], loops);
    }
  };

  const results: number[][] = [];
  search(blockers[0], [], results);
  return results;
}

const sorter = (a: number, b: number) => a - b;
const sorterArr = (a: number[], b: number[]) => a.length - b.length;

_compare(
  outputOne.sort(sorter),
  Array.from(
    new Set(
      detectCycles(inputOne)
        .flatMap((el) => el)
        .sort(sorter)
    )
  )
);

const resultTwo = detectCycles(inputTwo);
_compare(
  outputTwo.length ? outputTwo : "empty",
  resultTwo.length
    ? Array.from(new Set(resultTwo.flatMap((el) => el).sort(sorter)))
    : "empty"
);

_compare(
  outputThree.sort(sorter),
  Array.from(
    new Set(
      detectCycles(inputThree)
        .flatMap((el) => el)
        .sort(sorter)
    )
  )
);

_compare(
  JSON.stringify(advancedOutputThree.sort(sorterArr)),
  JSON.stringify(detectCycles(inputThree).sort(sorterArr))
);
