impl Solution {
    pub fn number_of_beams(bank: Vec<String>) -> i32 {
        // count '1's per row, keep non-zero rows only
        let counts: Vec<i32> = bank
            .iter()
            .map(|row| row.bytes().filter(|&b| b == b'1').count() as i32)
            .filter(|&c| c > 0)
            .collect();

        // sum products of consecutive non-zero rows
        counts.windows(2).map(|w| w[0] * w[1]).sum()
    }
}
