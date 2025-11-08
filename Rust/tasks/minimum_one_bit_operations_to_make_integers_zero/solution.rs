impl Solution {
    pub fn minimum_one_bit_operations(n: i32) -> i32 {
        // We use unsigned to avoid sign-propagating shifts.
        let mut x = n as u32;
        let mut ans: u32 = 0;
        while x != 0 {
            ans ^= x;   // prefix XOR accumulates inverse Gray
            x >>= 1;    // shift right
        }
        ans as i32
    }
}
