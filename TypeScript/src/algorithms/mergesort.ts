import { _compare } from "../logger";

function merge(
  arr: number[],
  leftIndex: number,
  medianIndex: number,
  rightIndex: number
) {
  const n1 = medianIndex - leftIndex + 1;
  const n2 = rightIndex - medianIndex;

  // Create temp arrays
  const L = new Array(n1);
  const R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++) L[i] = arr[leftIndex + i];
  for (let j = 0; j < n2; j++) R[j] = arr[medianIndex + 1 + j];

  // Merge the temp arrays back into arr[leftIndex..rightIndex]

  // Initial index of first subarray
  let i = 0;

  // Initial index of second subarray
  let j = 0;

  // Initial index of merged subarray
  let k = leftIndex;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}

function mergeSort(arr: number[], startIndex: number, endIndex: number) {
  if (startIndex >= endIndex) {
    return;
  }
  const m = startIndex + Math.floor((endIndex - startIndex) / 2);
  mergeSort(arr, startIndex, m);
  mergeSort(arr, m + 1, endIndex);
  merge(arr, startIndex, m, endIndex);
}

function sort(arr: number[]): number[] {
  const array = Array.from(arr);
  mergeSort(array, 0, array.length - 1);
  return array;
}

_compare([1, 5, 7, 8, 9, 10], sort([10, 7, 8, 9, 1, 5]));
