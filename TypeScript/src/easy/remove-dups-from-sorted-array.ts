import {_log} from "../logger";

function removeDuplicates(nums: number[]): number {
    let dups = 0;
    const mentioned: Set<number> = new Set<number>();

    let border = nums.length;

    for (let i = 0; i < border; ++i) {
        if (mentioned.has(nums[i])) {
            ++dups;
            nums.splice(i, 1);
            --i; --border;
        } else {
            mentioned.add(nums[i])
        }
    }

    return dups;
}

const nums1 = [1,1,2];
_log(removeDuplicates(nums1) + '\t' + JSON.stringify(nums1));

const nums2 = [0,0,1,1,1,2,2,3,3,4];
_log(removeDuplicates(nums2) + '\t' + JSON.stringify(nums2));
