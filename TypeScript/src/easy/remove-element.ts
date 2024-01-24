import {_log} from "../logger";

function removeElement(nums: number[], val: number): number {
    let ind = -1;
    const fInd = () => {
        ind = nums.findIndex(el => el === val);
        return ind !== -1;

    };

    while (fInd()) {
        nums.splice(ind, 1);
    }

    return nums.length;
}

const nums1 = [3,2,2,3];
_log(removeElement(nums1, 3) + '\t' + JSON.stringify(nums1));

const nums2 = [0,1,2,2,3,0,4,2];
_log(removeElement(nums2, 2) + '\t' + JSON.stringify(nums2));