// O(n^2) - too slow
impl Solution {
    pub fn max_area(height: Vec<i32>) -> i32 {
        let mut max_v: i32 = 0;
        for (outer_iter, &outer_element) in height.iter().enumerate() {
            for (inner_iter, &inner_element) in height.iter().enumerate().skip(outer_iter + 1) {
                let min_height = outer_element.min(inner_element);
                let width = (inner_iter - outer_iter) as i32;
                let current_v = width * min_height;

                if (current_v > max_v) {
                    max_v = current_v;
                }
            }
        }
        max_v
    }
}
