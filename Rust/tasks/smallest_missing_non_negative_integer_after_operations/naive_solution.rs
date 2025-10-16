// TODO: provide faster solution. Now it is 8ms slower
use std::collections::HashMap;
use std::collections::hash_map::Entry;

impl Solution {
    pub fn find_smallest_integer(nums: Vec<i32>, value: i32) -> i32 {
        let mut mex = 0;

        let mut counters: HashMap<i32, i32> = HashMap::new();

        // Normalize n to its residue in [0, value-1]
        let normalize = |n: i32| ((n % value) + value) % value;

        for n in nums {
            let r = normalize(n);
            counters.entry(r).and_modify(|n| *n += 1).or_insert(1);
        }

        let mut process_counter = |n: i32, counters: &mut HashMap<i32, i32>, mex: &mut i32| -> bool {
            let r = normalize(n);
            match counters.entry(r) {
                Entry::Occupied(mut e) => {
                    let c = e.get_mut();
                    if *c == 1 {
                        // Last one: remove key to keep map clean
                        e.remove();
                    } else {
                        *c -= 1;
                    }
                    *mex += 1;
                    true
                }
                Entry::Vacant(_) => false,
            }
        };

        loop {
            // Prefer plus - we can spend it without regret
            let plus_target = mex - value;
            let is_plus_processed = process_counter(plus_target, &mut counters, &mut mex);
            if !is_plus_processed {
                let is_mex_processed = process_counter(mex, &mut counters, &mut mex);
                if !is_mex_processed {
                    let minus_target = mex + value;
                    let is_minus_processed = process_counter(minus_target, &mut counters, &mut mex);
                    if !is_minus_processed {
                        break;
                    }
                }

            }
        }

        mex
    }
}
