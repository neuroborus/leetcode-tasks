// TODO: research

use std::collections::HashMap;

impl Solution {
    pub fn max_partitions_after_operations(s: String, k: i32) -> i32 {
        // DFS state:
        // i        - current index in s
        // cur_mask - bitmask of distinct letters in the current (ongoing) partition
        // can_ch   - 1 if we still may change one character somewhere (not necessarily here), else 0
        fn dfs(
            bytes: &[u8],
            k: u32,
            i: usize,
            cur_mask: u32,
            can_ch: u8,
            memo: &mut HashMap<u64, i32>,
        ) -> i32 {
            if i == bytes.len() {
                // Count the last (possibly non-empty) partition.
                return 1;
            }

            // Pack state into u64 key: [ i | cur_mask | can_ch ]
            let key: u64 = ((i as u64) << 32) | ((cur_mask as u64) << 1) | (can_ch as u64);
            if let Some(&ans) = memo.get(&key) {
                return ans;
            }

            // Option 1: do NOT change s[i], just extend/reset according to k-distinct rule.
            let bit = 1u32 << (bytes[i] - b'a');
            let nxt = cur_mask | bit;
            let mut best = if nxt.count_ones() > k {
                // Exceeds k -> we must start a new partition here; current char starts the next one.
                dfs(bytes, k, i + 1, bit, can_ch, memo) + 1
            } else {
                // Stay in the current partition.
                dfs(bytes, k, i + 1, nxt, can_ch, memo)
            };

            // Option 2: if we still can change one character overall, try changing s[i] to any letter.
            if can_ch == 1 {
                for c in 0..26 {
                    let bit2 = 1u32 << c;
                    let nxt2 = cur_mask | bit2;
                    let candidate = if nxt2.count_ones() > k {
                        // Starting a new partition because of the change.
                        dfs(bytes, k, i + 1, bit2, 0, memo) + 1
                    } else {
                        dfs(bytes, k, i + 1, nxt2, 0, memo)
                    };
                    if candidate > best {
                        best = candidate;
                    }
                }
            }

            memo.insert(key, best);
            best
        }

        let mut memo = HashMap::new();
        let k_u = k as u32;
        dfs(s.as_bytes(), k_u, 0, 0, 1, &mut memo)
    }
}
