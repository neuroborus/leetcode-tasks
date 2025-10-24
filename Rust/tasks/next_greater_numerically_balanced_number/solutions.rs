// TODO: research
impl Solution {
    pub fn next_beautiful_number(n: i32) -> i32 {
        let len_n = Self::num_len(n as i64);

        // Try lengths from len(n) up to 10 (i32 has at most 10 digits)
        for l in len_n..=10 {
            let mut best: i64 = i64::MAX;

            // Enumerate all digit subsets over {1..9}
            for mask in 1usize..(1usize << 9) {
                if Self::sum_mask(mask) != l { continue; }

                // Build required frequencies: if digit d is chosen, freq[d] = d occurrences
                let mut freq = [0usize; 10];
                for d in 1..=9 {
                    if (mask & (1usize << (d - 1))) != 0 {
                        freq[d] = d;
                    }
                }

                // For l > len(n): minimal candidate is just all digits in ascending order
                // For l == len(n): find the minimal number strictly greater than n using digit-DP/backtracking
                let cand: i64 = if l > len_n {
                    Self::build_min_from_freq(&freq)
                } else {
                    match Self::next_strictly_greater_same_len(n as i64, &freq) {
                        Some(v) => v,
                        None => continue,
                    }
                };

                if cand > n as i64 && cand < best {
                    best = cand;
                }
            }

            if best != i64::MAX {
                return best as i32;
            }
        }

        unreachable!("No numerically balanced number in i32 range");
    }

    // ------- helpers -------

    fn num_len(mut x: i64) -> usize {
        // Return number of decimal digits in x (x >= 0)
        if x == 0 { return 1; }
        let mut len = 0;
        while x > 0 {
            len += 1;
            x /= 10;
        }
        len
    }

    fn sum_mask(mask: usize) -> usize {
        // Sum of chosen digits (each digit d contributes exactly d to the total length)
        let mut s = 0;
        for d in 1..=9 {
            if (mask & (1usize << (d - 1))) != 0 {
                s += d;
            }
        }
        s
    }

    fn build_min_from_freq(freq: &[usize; 10]) -> i64 {
        // Build the lexicographically smallest number from the multiset (ascending digits)
        let mut out: Vec<u8> = Vec::new();
        for d in 1..=9 {
            for _ in 0..freq[d] {
                out.push(d as u8);
            }
        }
        Self::digits_to_i64(&out)
    }

    fn digits_to_i64(digs: &[u8]) -> i64 {
        // Convert a vector of decimal digits to i64
        let mut v: i64 = 0;
        for &d in digs {
            v = v * 10 + d as i64;
        }
        v
    }

    fn next_strictly_greater_same_len(n: i64, freq_in: &[usize; 10]) -> Option<i64> {
        // Build the minimal number strictly greater than n having exactly the required frequencies,
        // assuming total frequency equals the length of n.
        let nd: Vec<u8> = n.to_string().bytes().map(|b| b - b'0').collect();

        // Quick sanity: total frequency must match the target length
        let total: usize = (1..=9).map(|d| freq_in[d]).sum();
        if total != nd.len() {
            return None;
        }

        let mut freq = *freq_in;
        let mut out: Vec<u8> = Vec::with_capacity(nd.len());

        // DFS over positions with a "tight" prefix: as long as we match n's prefix,
        // at position pos we can place either nd[pos] (if available) to keep tight,
        // or the smallest digit > nd[pos], after which we fill the tail minimally.
        fn dfs(
            pos: usize,
            nd: &[u8],
            freq: &mut [usize; 10],
            out: &mut Vec<u8>,
        ) -> Option<()> {
            if pos == nd.len() {
                // Exact equality with n is not allowed (we need strictly greater)
                return None;
            }

            let need = nd[pos];

            // 1) Try placing exactly nd[pos] to keep the prefix equal to n
            if (1..=9).contains(&need) && freq[need as usize] > 0 {
                freq[need as usize] -= 1;
                out.push(need);
                if dfs(pos + 1, nd, freq, out).is_some() {
                    return Some(());
                }
                out.pop();
                freq[need as usize] += 1;
            }

            // 2) Place the smallest available digit strictly greater than nd[pos]
            //    Then complete the suffix with the remaining digits in ascending order
            for d in (need + 1)..=9 {
                let du = d as usize;
                if freq[du] == 0 { continue; }
                freq[du] -= 1;
                out.push(d);

                // Fill the rest minimally to guarantee the smallest possible > n
                for x in 1..=9 {
                    for _ in 0..freq[x] {
                        out.push(x as u8);
                    }
                }
                return Some(());
            }

            // No valid digit can be placed at this position
            None
        }

        if dfs(0, &nd, &mut freq, &mut out).is_some() {
            Some(Self::digits_to_i64(&out))
        } else {
            None
        }
    }
}
