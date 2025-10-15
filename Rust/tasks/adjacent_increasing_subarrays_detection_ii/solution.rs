use std::cmp;

impl Solution {
    pub fn max_increasing_subarrays(nums: Vec<i32>) -> i32 {
        let n = nums.len();

        if n <= 1 { return n as i32; }

        let mut prev_run = 0usize;
        let mut run = 1usize;
        let mut max_run = 1usize;

        let mut max_size = 0usize;

        for i in 1..n {
            if nums[i] > nums[i - 1] {
                run += 1;
            } else {
                let size = cmp::min(prev_run, run);
                if max_size < size {
                    max_size = size;
                }
                if max_run < run {
                    max_run = run;
                }
                prev_run = run;
                run = 1;
            }
        }

        let size = cmp::min(prev_run, run);
        if max_size < size {
            max_size = size;
        }

        max_run = cmp::max(max_run, run);
        let half = max_run / 2;
        if half > max_size {
            return half as i32;
        }

        return max_size as i32;
    }
}
