import {_compare} from "@/logger";

/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let ind1 = 0;
    let ind2 = 0;

    let result: number[] = [];
    while (ind1 + ind2 < m + n) {
        if (ind1 < m && (!n || nums1[ind1] <= nums2[ind2] || ind2 >= n)) {
            result.push(nums1[ind1]);
            ++ind1;
        } else  {
            result.push(nums2[ind2]);
            ++ind2;
        }
    }

    for (let i = 0; i < m + n; i++) {
        nums1[i] = result[i];
    }
}


const act1 = [1,2,3,0,0,0];
merge(act1, 3, [2,5,6], 3);
_compare([1,2,2,3,5,6], act1);

const act2 = [1];
merge(act2, 1, [], 0);
_compare([1], act2);

const act3 = [0];
merge(act3, 0, [1], 1);
_compare([1], act3);

const act4 = [2,0];
merge(act4, 1, [1], 1);
_compare([1,2], act4);

const act5 = [-1,0,0,3,3,3,0,0,0];
merge(act5, 6, [1,2,2], 3);
_compare([-1,0,0,1,2,2,3,3,3], act5);

const act6 = [-1,-1,0,0,0,0];
merge(act6, 4, [-1,0], 2);
_compare([-1,-1,-1,0,0,0], act6);
