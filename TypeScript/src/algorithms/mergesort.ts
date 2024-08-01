import { _compare } from "../logger";

function merge(
  arr: number[],
  leftIndex: number,
  medianIndex: number,
  rightIndex: number
) {
  const lengthLeft = medianIndex - leftIndex + 1;
  const lengthRight = rightIndex - medianIndex;

  // Create temp arrays
  const leftArr = arr.slice(leftIndex, medianIndex + 1); // end - not included
  const rightArr = arr.slice(medianIndex + 1, rightIndex + 1); // end - not included

  // Merge the temp arrays back into arr[leftIndex..rightIndex]

  // Initial index of first subarray
  let leftInd = 0;
  // Initial index of second subarray
  let rightInd = 0;
  // Initial index of merged subarray
  let arrInd = leftIndex;

  while (leftInd < lengthLeft && rightInd < lengthRight) {
    if (leftArr[leftInd] <= rightArr[rightInd]) {
      arr[arrInd] = leftArr[leftInd];
      leftInd++;
    } else {
      arr[arrInd] = rightArr[rightInd];
      rightInd++;
    }
    arrInd++;
  }

  // Copy the remaining elements of
  // leftArr[], if there are any
  while (leftInd < lengthLeft) {
    arr[arrInd] = leftArr[leftInd];
    leftInd++;
    arrInd++;
  }

  // Copy the remaining elements of
  // rightArr[], if there are any
  while (rightInd < lengthRight) {
    arr[arrInd] = rightArr[rightInd];
    rightInd++;
    arrInd++;
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
_compare([1, 5, 9, 29, 41, 50, 80], sort([80, 29, 50, 41, 9, 1, 5]));
