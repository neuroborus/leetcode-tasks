// FIXME: slower

impl Solution {
    pub fn has_increasing_subarrays(nums: Vec<i32>, k: i32) -> bool {
        // SLIDING WINDOW

        let n = nums.len();
        let k = k as usize;

        // Edge cases
        if 2 * k > n { return false; }
        if k == 1 { return n >= 2; }

        // cnt = number of true comparisons in the current (k-1)-sized window
        let mut cnt = 0usize;
        for j in 0..(k - 1) {
            if nums[j] < nums[j + 1] {
                cnt += 1;
            }
        }

        // ring[s % k] stores whether the subarray starting at index s is strictly increasing
        let mut ring = vec![false; k];
        ring[0] = (cnt == k - 1);

        // Iterate through all possible starting indices of subarrays
        for s in 1..=(n - k) {
            // Remove the comparison that falls out of the window
            if nums[s - 1] < nums[s] {
                cnt -= 1;
            }
            // Add the new comparison entering the window
            if nums[s + k - 2] < nums[s + k - 1] {
                cnt += 1;
            }

            // Current window is strictly increasing if all (k-1) comparisons are true
            let good_s = (cnt == k - 1);

            // Check for two adjacent increasing subarrays of length k
            if s >= k && good_s && ring[(s - k) % k] {
                return true;
            }

            // Update the ring buffer for the current start index
            ring[s % k] = good_s;
        }

        false
    }
}
