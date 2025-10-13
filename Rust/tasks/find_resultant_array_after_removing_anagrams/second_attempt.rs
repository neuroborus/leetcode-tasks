// FIXME: don't use codes sum, could be collisions

use std::collections::HashSet;
use std::iter::FromIterator;

impl Solution {
    pub fn remove_anagrams(words: Vec<String>) -> Vec<String> {
        let mut prev: u32 = 0u32;

        words.into_iter()
            .filter(|w| {
                let sum = w.chars().fold(0u32, |acc, ch| acc + ch as u32);

                if prev == sum {
                    return false;
                }

                prev = sum;
                true
            }).collect()
    }
}
