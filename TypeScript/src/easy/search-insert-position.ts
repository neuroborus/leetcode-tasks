import {_log} from "../logger";

function searchInsert(nums: number[], target: number): number {
    for (let i = 0; i < nums.length; ++i) {
        if (nums[i] >= target) return i;
    }
    return nums.length;
}

_log(searchInsert([1,3,5,6], 5));
_log(searchInsert([1,3,5,6], 2));
_log(searchInsert([1,3,5,6], 7));
