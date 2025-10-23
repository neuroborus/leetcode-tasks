// TODO: research
impl Solution {
    pub fn max_frequency(nums: Vec<i32>, k: i32, num_operations: i32) -> i32 {
        use std::cmp::{max, min};

        let n = nums.len();
        if n == 0 { return 0; }

        let k = k as i64;
        let m = num_operations as i64;

        // work in i64 to avoid overflow
        let mut a: Vec<i64> = nums.iter().map(|&x| x as i64).collect();
        a.sort_unstable();

        // Two-pointer: maximum count in any interval of length 2k
        let mut best_window = 0_i64;
        let mut l = 0usize;
        for r in 0..n {
            while a[r] - a[l] > 2*k {
                l += 1;
            }
            best_window = best_window.max((r - l + 1) as i64);
        }
        // Best if we pick a target not equal to any existing value
        let mut answer = best_window.min(m);

        // Helpers: lower_bound / upper_bound
        fn lower_bound(arr: &[i64], x: i64) -> usize {
            let (mut l, mut r) = (0usize, arr.len());
            while l < r {
                let mid = (l + r) / 2;
                if arr[mid] < x { l = mid + 1; } else { r = mid; }
            }
            l
        }
        fn upper_bound(arr: &[i64], x: i64) -> usize {
            let (mut l, mut r) = (0usize, arr.len());
            while l < r {
                let mid = (l + r) / 2;
                if arr[mid] <= x { l = mid + 1; } else { r = mid; }
            }
            l
        }

        // Iterate over groups of equal values (unique targets present in the array)
        let mut i = 0usize;
        while i < n {
            let v = a[i];
            let mut j = i + 1;
            while j < n && a[j] == v { j += 1; }
            let freq_v = (j - i) as i64;

            // Count how many numbers fall into [v - k, v + k]
            let left  = lower_bound(&a, v - k);
            let right = upper_bound(&a, v + k);
            let cover = (right - left) as i64;

            // min(cover, freq(v) + m)
            let cand = cover.min(freq_v + m);
            answer = max(answer, cand);

            i = j;
        }

        // Cap by n just in case
        answer.min(n as i64) as i32
    }
}

