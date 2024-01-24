// Definition for singly-linked list.
import { _debug, _log } from "../logger";

class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function toList(arr: number[]): ListNode | null {
  const reverse: number[] = arr.reverse();
  let lastNode: ListNode | null = null;
  reverse.forEach((el) => {
    lastNode = new ListNode(el, lastNode);
  });
  return lastNode;
}

function toArray(firstEl: ListNode | null): number[] {
  const buffer: number[] = [];
  let current: ListNode | null = firstEl;
  while (current) {
    buffer.push(current.val);
    current = current.next;
  }
  return buffer;
}

// Sorted: enc
function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  let result: number[] = [];

  const arr1: number[] = toArray(list1);
  const arr2: number[] = toArray(list2);

  while (arr1.length && arr2.length) {
    let shifted;
    if (arr1[0] < arr2[0]) {
      shifted = arr1.shift();
    } else {
      shifted = arr2.shift();
    }

    if (shifted !== undefined) result.push(shifted);
  }

  if (arr1.length) result = result.concat(arr1);
  if (arr2.length) result = result.concat(arr2);

  return toList(result);
}

_log(toArray(mergeTwoLists(toList([1, 2, 4]), toList([1, 3, 4]))));

_log(toArray(mergeTwoLists(toList([]), toList([]))));

_log(toArray(mergeTwoLists(toList([]), toList([0]))));

_debug(
  toArray(
    mergeTwoLists(
      toList([-10, -9, -6, -4, 1, 9, 9]),
      toList([-5, -3, 0, 7, 8, 8])
    )
  )
);
