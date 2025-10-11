use std::collections::HashMap;

impl Solution {
    pub fn maximum_total_damage(power: Vec<i32>) -> i64 {
        if power.is_empty() {
            return 0;
        }

        // Combine duplicates: weight[v] = v * count(v)
        let mut weight: HashMap<i32, i64> = HashMap::new();
        for p in power {
            *weight.entry(p).or_insert(0) += p as i64;
        }

        // Sorted unique values
        let mut keys: Vec<i32> = weight.keys().copied().collect();
        keys.sort_unstable();

        let n = keys.len();
        let mut sums: Vec<i64> = Vec::with_capacity(n);
        for &k in &keys {
            sums.push(*weight.get(&k).unwrap());
        }

        // dp[i] = best using keys[0..=i]
        let mut dp: Vec<i64> = vec![0; n];
        dp[0] = sums[0];

        for i in 1..n {
            // find last j with keys[j] <= keys[i] - 3
            let target = keys[i] - 3;
            let j = match keys.binary_search_by(|x| x.cmp(&target)) {
                Ok(idx) => Some(idx),
                Err(ins) => if ins == 0 { None } else { Some(ins - 1) },
            };

            let take = sums[i] + j.map(|idx| dp[idx]).unwrap_or(0);
            let skip = dp[i - 1];
            dp[i] = skip.max(take);
        }

        dp[n - 1]
    }
}
