// O(n)
impl Solution {
    pub fn max_area(height: Vec<i32>) -> i32 {
        if height.len() < 2 { return 0; }

        let (mut l, mut r) = (0usize, height.len() - 1);
        let mut best = 0;

        while l < r {
            let h = height[l].min(height[r]);
            let w = (r - l) as i32;
            best = best.max(h * w);

            // Skip lowest border
            if height[l] < height[r] {
                l += 1;
            } else {
                r -= 1;
            }
        }

        best
    }
}
