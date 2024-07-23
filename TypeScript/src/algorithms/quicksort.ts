import { _compare } from "../logger";

// Function to partition the array and return the partition index
function partition(arr: number[], startInd: number, endInd: number) {
  // Choosing the pivot
  const pivot = arr[endInd];

  let i = startInd - 1;

  for (let j = startInd; j <= endInd - 1; ++j) {
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      // Increment index of smaller element
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
  }

  [arr[i + 1], arr[endInd]] = [arr[endInd], arr[i + 1]]; // Swap pivot to its correct position
  return i + 1; // Return the partition index
}

// The main function that implements QuickSort
function quickSort(arr: number[], startInd: number, endInd: number) {
  if (startInd < endInd) {
    // pi is the partitioning index, arr[pi] is now at the right place
    const pi = partition(arr, startInd, endInd);

    // Separately sort elements before partition and after partition
    quickSort(arr, startInd, pi - 1);
    quickSort(arr, pi + 1, endInd);
  }
}

function sort(array: number[]) {
  const arr = Array.from(array);
  quickSort(arr, 0, arr.length - 1);
  return arr;
}

_compare([1, 5, 7, 8, 9, 10], sort([10, 7, 8, 9, 1, 5]));
