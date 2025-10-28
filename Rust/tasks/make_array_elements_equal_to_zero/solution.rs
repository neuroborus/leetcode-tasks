impl Solution {
    pub fn count_valid_selections(nums: Vec<i32>) -> i32 {
        let mut ans: i32 = 0;
        let mut prefix: i64 = 0;
        let mut suffix: i64 = nums.iter().map(|&x| x as i64).sum();

        for &x in &nums {
            suffix -= x as i64;
            prefix += x as i64;
            if x == 0 {
                let diff = prefix - suffix;
                if diff == 0 { ans += 2; }
                else if diff == 1 || diff == -1 { ans += 1; }
            }
        }
        ans
    }
}