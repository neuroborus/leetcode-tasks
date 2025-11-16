impl Solution {
    pub fn num_sub(s: String) -> i32 {
        let mut sum = 0i32;
        for chunk in s.split('0') {
            let len = chunk.len() as i32;
            if len > 0 {
                // Number of substrings in a run of length L is L * (L + 1) / 2
                sum = (sum + len * (len + 1) / 2);
            }
        }
        sum
    }
}
