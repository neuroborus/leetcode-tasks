use std::collections::{HashMap, HashSet};

impl Solution {
    pub fn maximum_total_damage(power: Vec<i32>) -> i64 {
        let mut paths: Vec<i32> = Vec::with_capacity(power.len());
        let mut paths_values: HashMap<i32, i64> = HashMap::new();
        let mut paths_forbids: HashMap<i32, HashSet<i32>> = HashMap::new();

        // Values that cannot co-exist with p (duplicates are allowed)
        let forbids_of = |p: i32| [p - 2, p - 1, p + 1, p + 2];

        let mut best_path = 0i64;

        for pw in power {
            if !paths_values.contains_key(&pw) {
                paths.push(pw);
            }
            let forbids = forbids_of(pw);

            for &pth in &paths {
                // allowed if pw is NOT in the forbid set of this path
                let allowed = match paths_forbids.get(&pth) {
                    Some(set) => !set.contains(&pw),
                    None => true,
                };
                if !allowed {
                    continue;
                }

                // update forbid set for this path
                let set = paths_forbids.entry(pth).or_insert_with(HashSet::new);
                for f in forbids {
                    set.insert(f);
                }

                // extend path value
                let value = paths_values.get(&pth).copied().unwrap_or(0) + pw as i64;
                paths_values.insert(pth, value);

                if value > best_path {
                    best_path = value;
                }
            }
        }

        best_path
    }
}
