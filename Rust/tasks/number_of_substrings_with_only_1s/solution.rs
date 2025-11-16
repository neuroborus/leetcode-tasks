impl Solution {
    pub fn num_sub(s: String) -> i32 {
        const MOD: i64 = 1_000_000_007;

        let mut sum = 0i64;
        for chunk in s.split('0') {
            let len = chunk.len() as i64;
            if len > 0 {
                // Number of substrings in a run of length L is L * (L + 1) / 2
                sum = (sum + len * (len + 1) / 2) % MOD;
            }
        }
        sum as i32
    }
}
