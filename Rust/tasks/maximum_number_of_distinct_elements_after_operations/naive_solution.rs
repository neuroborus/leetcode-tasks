// FIXME

use std::collections::HashSet;

impl Solution {
    pub fn max_distinct_elements(nums: Vec<i32>, k: i32) -> i32 {
        {
            let nums_len = nums.len() as i32;
            if k > nums_len {
                return nums_len
            }
        }

        let mut uniques: HashSet<i32> = HashSet::new();
        let adds: Vec<i32> = (-k..=k).collect();

        let mut sorted: Vec<i32> = nums.clone();
        sorted.sort();

        for n in sorted {
            if uniques.contains(&n) {
                for &a in &adds {
                    let sum = n + a;
                    if !uniques.contains(&sum) {
                        uniques.insert(sum);
                        break;
                    }
                }
            } else {
                uniques.insert(n);
            }
        }

        uniques.len() as i32
    }
}
