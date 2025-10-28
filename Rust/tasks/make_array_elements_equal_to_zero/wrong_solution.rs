// FIXME

impl Solution {
    pub fn count_valid_selections(nums: Vec<i32>) -> i32 {
        let mut border = nums.len() - 1;
        let mut potentially_valid = 0i32;

        let mut right_sum = 0;
        let mut left_sum = 0;

        let mut skip_left = 0usize;
        let mut skip_right = 0usize;

        let mut i = 0usize;
        let mut left_ind = 0usize;
        let mut right_ind = border;

        while left_ind < right_ind {
            left_ind = i - skip_left;
            right_ind = border - i + skip_right;

            let left_el = nums[left_ind];
            let right_el = nums[right_ind];

            if left_sum > right_sum {
                skip_left += 1;
                right_sum += right_el;
                potentially_valid = 0;
            } else if right_sum > left_sum {
                skip_right += 1;
                left_sum += left_el;
                potentially_valid = 0;
            } else {
                if left_el == 0 {
                    potentially_valid += 1;
                } else {
                    left_sum += left_el;
                }
                if right_el == 0 {
                    potentially_valid += 1;
                } else {
                    right_sum += right_el;
                }
            }

            i += 1;
        }
        potentially_valid
    }
}
