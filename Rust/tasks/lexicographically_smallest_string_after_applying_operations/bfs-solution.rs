// TODO: make faster

use std::collections::{HashSet, VecDeque};


impl Solution {
    pub fn find_lex_smallest_string(s: String, a: i32, b: i32) -> String {
        // Normalize types
        let a = ((a % 10) + 10) % 10; // guard against negative a (just in case)
        let b = b as usize;

        // BFS over strings reachable by the two operations
        let mut seen: HashSet<String> = HashSet::new();
        let mut q: VecDeque<String> = VecDeque::new();

        seen.insert(s.clone());
        q.push_back(s.clone());

        let mut best = s;

        while let Some(cur) = q.pop_front() {
            if cur < best {
                best = cur.clone();
            }

            // op1: add a to all odd indices (0-indexed)
            let next_add = Solution::add_to_odd(&cur, a as u8);
            if seen.insert(next_add.clone()) {
                q.push_back(next_add);
            }

            // op2: rotate right by b positions
            let next_rot = Solution::rotate_right(&cur, b);
            if seen.insert(next_rot.clone()) {
                q.push_back(next_rot);
            }
        }

        best
    }

    // Add 'a' (mod 10) to all digits at odd indices.
    fn add_to_odd(s: &str, a: u8) -> String {
        let mut bytes = s.as_bytes().to_vec(); // ASCII digits
        let n = bytes.len();
        let a = a % 10;

        // odd indices: 1,3,5,...
        let mut i = 1usize;
        while i < n {
            let d = bytes[i] - b'0';          // 0..9
            let nd = (d + a) % 10;
            bytes[i] = b'0' + nd;
            i += 2;
        }

        // Safe because we only modified ASCII digits
        String::from_utf8(bytes).unwrap()
    }

    // Rotate string to the right by b positions.
    fn rotate_right(s: &str, b: usize) -> String {
        let n = s.len();
        if n == 0 { return s.to_string(); }
        let r = b % n;
        if r == 0 { return s.to_string(); }
        format!("{}{}", &s[n - r..], &s[..n - r])
    }
}