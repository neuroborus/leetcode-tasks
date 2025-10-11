impl Solution {
    pub fn maximum_total_damage(power: Vec<i32>) -> i64 {
        let mut paths: Vec<i32> = Vec::with_capacity(power.len());
        let mut paths_values: std::collections::HashMap<i32, i64> = std::collections::HashMap::new();

        let is_allowed = |a: i32, b: i32| {
            let d = a.abs_diff(b);
            d == 0 || d > 2
        };

        let mut best_path = i64::MIN;

        for pw in power {
            if !paths_values.contains_key(&pw) {
                paths.push(pw);
            }

            for &pth in &paths {
                if is_allowed(pw, pth) {
                    let value = match paths_values.get(&pth) {
                        Some(&v) => &v + pw as i64,
                        None => pw as i64,
                    };

                    paths_values.insert(pth, value);
                    if best_path < value {
                        best_path = value;
                    }
                }
            }
        }
        best_path
    }
}
