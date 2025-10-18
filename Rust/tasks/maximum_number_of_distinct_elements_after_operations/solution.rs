impl Solution {
    pub fn max_distinct_elements(nums: Vec<i32>, k: i32) -> i32 {
        let k = k as i64;
        let mut intervals: Vec<(i64,i64)> = nums.into_iter()
            .map(|x| x as i64)
            .map(|n| (n - k, n + k))
            .collect();

        intervals.sort_unstable_by_key(|&(_, r)| r);

        let mut cur: i64 = i64::MIN / 2;
        let mut ans = 0;

        for (l, r) in intervals {
            let t = l.max(cur);
            if t <= r {
                ans += 1;
                cur = t + 1;
            }
        }
        ans
    }
}
