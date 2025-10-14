use std::collections::VecDeque;

impl Solution {
    pub fn has_increasing_subarrays(nums: Vec<i32>, k: i32) -> bool {
        if k == 1 {
            return nums.len() >= 2;
        }

        let k_usize = k as usize;

        let mut prev: VecDeque<i32> = VecDeque::with_capacity(k_usize);

        let mut curr: VecDeque<i32> = VecDeque::with_capacity(k_usize);
        let mut curr_el = i32::MIN;

        let mut curr_path = 0usize;

        for i in 0..nums.len() {
            let el: i32 = nums[i];

            if curr_el < el {
                curr.push_back(el);
                curr_path += 1;
                if (curr.len() > k_usize) {
                    curr.pop_front();
                }
                if curr_path >= 2 * k_usize {
                    return true;
                }
            } else {
                prev = curr;
                curr = VecDeque::with_capacity(k as usize);
                curr.push_back(el);
                curr_path = 1;
            }

            if (prev.len() == k_usize) && (curr.len() == k_usize) {
                return true;
            }
            curr_el = el;
        }
        return false;
    }
}
