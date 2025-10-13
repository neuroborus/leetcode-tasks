// FIXME: should only be compared with the previous element

use std::collections::HashSet;
use std::iter::FromIterator;

impl Solution {
    pub fn remove_anagrams(words: Vec<String>) -> Vec<String> {
        let mut known: HashSet<u32> = HashSet::new();

        words.into_iter().filter(|w| {
            let sum = w.chars().fold(0u32, |acc, ch| acc + ch as u32);

            if known.contains(&sum) {
                return false;
            }
            known.insert(sum);
            true
        }).collect()
    }
}