impl Solution {
    pub fn has_same_digits(s: String) -> bool {
        let mut vec: Vec<u8> = s.bytes().map(|b| b - b'0').collect::<Vec<_>>();

        loop {
            let mut new_vec = Vec::with_capacity((vec.len() + 1) / 2);
            for w in vec.windows(2) {
                new_vec.push((w[0] + w[1]) % 10);
            }

            vec = new_vec;
            if vec.len() == 2 {
                break;
            }
        }
        vec[0] == vec[1]
    }
}
