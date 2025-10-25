impl Solution {
    pub fn total_money(n: i32) -> i32 {
        let rest = n % 7;
        let weeks = n / 7;

        let mut sum = 0i32;

        // half-opened
        for w in 1..(weeks + 1) {
            sum += (w + 3) * 7; // ((w + 6) + w) / 2 = w + 3
        }

        for r in 1..(rest + 1) {
            sum += r + weeks;
        }

        sum
    }
}
