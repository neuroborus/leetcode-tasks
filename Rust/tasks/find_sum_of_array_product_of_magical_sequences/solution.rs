// TODO: research
impl Solution {
    pub fn magical_sum(m: i32, k: i32, nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;

        let m = m as usize;
        let k0 = k as usize;
        let n = nums.len();

        // Precompute C(n, r) for 0..=m (mod MOD).
        let mut comb = vec![vec![0i64; m + 1]; m + 1];
        for i in 0..=m {
            comb[i][0] = 1;
            for j in 1..=i {
                comb[i][j] = (comb[i - 1][j] + comb[i - 1][j - 1]) % MOD;
            }
        }

        // Precompute powers: pow[i][e] = nums[i]^e (mod MOD), for e=0..m.
        let mut pow = vec![vec![1i64; m + 1]; n];
        for i in 0..n {
            let base = ((nums[i] as i64 % MOD) + MOD) % MOD;
            for e in 1..=m {
                pow[i][e] = (pow[i][e - 1] * base) % MOD;
            }
        }

        // 4D memo as a flat array: [rem_m][rem_k][i][carry]
        // Only store states with 0 <= rem_k <= k0; negative k handled by early return.
        let dims = (m + 1, k0 + 1, n + 1, m + 1);
        let tot = dims.0 * dims.1 * dims.2 * dims.3;
        let mut memo = vec![-1i32; tot];

        #[inline]
        fn idx(rem_m: usize, rem_k: usize, i: usize, carry: usize,
               dims: (usize, usize, usize, usize)) -> usize {
            (((rem_m * dims.1 + rem_k) * dims.2 + i) * dims.3 + carry)
        }

        #[inline]
        fn popcnt(x: usize) -> i32 { x.count_ones() as i32 }

        fn dfs(
            rem_m: usize,
            rem_k: i32,
            i: usize,
            carry: usize,
            n: usize,
            k0: usize,
            m0: usize,
            comb: &Vec<Vec<i64>>,
            pow: &Vec<Vec<i64>>,
            memo: &mut Vec<i32>,
            dims: (usize, usize, usize, usize),
        ) -> i32 {
            // Pruning: impossible if we cannot reach rem_k even with all remaining bits = 1.
            if rem_k < 0 { return 0; }
            if (rem_m as i32) + popcnt(carry) < rem_k { return 0; }

            if rem_m == 0 {
                return if popcnt(carry) == rem_k { 1 } else { 0 };
            }
            if i == n { return 0; }

            // Only memoize when 0 <= rem_k <= k0
            if rem_k >= 0 && (rem_k as usize) <= k0 {
                let id = idx(rem_m, rem_k as usize, i, carry, dims);
                let got = memo[id];
                if got != -1 { return got; }

                let mut res: i64 = 0;
                for cnt in 0..=rem_m {
                    let contribution = (comb[rem_m][cnt] * pow[i][cnt]) % MOD;
                    let new_carry = carry + cnt;
                    let bit = (new_carry & 1) as i32;
                    let sub = dfs(
                        rem_m - cnt,
                        rem_k - bit,
                        i + 1,
                        new_carry >> 1,
                        n, k0, m0, comb, pow, memo, dims,
                    ) as i64;
                    res += (sub * contribution) % MOD;
                    if res >= MOD { res -= MOD; }
                }

                memo[id] = (res % MOD) as i32;
                return memo[id];
            }

            // If rem_k is outside memoized range, compute without storing.
            let mut res: i64 = 0;
            for cnt in 0..=rem_m {
                let contribution = (comb[rem_m][cnt] * pow[i][cnt]) % MOD;
                let new_carry = carry + cnt;
                let bit = (new_carry & 1) as i32;
                let sub = dfs(
                    rem_m - cnt,
                    rem_k - bit,
                    i + 1,
                    new_carry >> 1,
                    n, k0, m0, comb, pow, memo, dims,
                ) as i64;
                res += (sub * contribution) % MOD;
                if res >= MOD { res -= MOD; }
            }
            (res % MOD) as i32
        }

        dfs(m, k as i32, 0, 0, n, k0, m, &comb, &pow, &mut memo, dims)
    }
}
