impl Solution {
    pub fn remove_anagrams(words: Vec<String>) -> Vec<String> {
        let mut prev: Vec<u8> = vec![];

        words.into_iter()
            .filter(|w| {
                let mut bytes = w.as_bytes().to_vec();
                bytes.sort_unstable(); // accepted, because we know input

                if prev == bytes {
                    return false;
                }

                prev = bytes;
                true
            }).collect()
    }
}
