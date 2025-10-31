use std::collections::HashSet;

impl Solution {
    pub fn get_sneaky_numbers(nums: Vec<i32>) -> Vec<i32> {
        let mut collection: HashSet<i32>  = HashSet::new();
        let mut dups: HashSet<i32> = HashSet::new();

        for n in nums {
            if collection.contains(&n) {
                dups.insert(n);
            }
            collection.insert(n);
        }

        dups.into_iter().collect()
    }
}
