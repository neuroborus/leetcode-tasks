impl Solution {
    pub fn has_increasing_subarrays(nums: Vec<i32>, k: i32) -> bool {
        // run-length

        let n = nums.len();
        let k = k as usize;

        // Edge cases
        if 2 * k > n { return false; }
        if k == 1 { return n >= 2; }

        // run = length of current strictly increasing run (ending at i)
        // prev_run = length of the run just before the last break
        let mut prev_run: usize = 0;
        let mut run: usize = 1;

        for i in 1..n {
            if nums[i] > nums[i - 1] {
                run += 1;

                // Two adjacent windows inside one long run
                if run >= 2 * k { return true; }

                // Two windows across the last break
                if run >= k && prev_run >= k { return true; }
            } else {
                // Break: shift current run to prev_run and reset
                prev_run = run;
                run = 1;
            }
        }

        false
    }
}
