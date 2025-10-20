impl Solution {
    pub fn final_value_after_operations(operations: Vec<String>) -> i32 {
        let mut pluses = 0;
        let mut minuses = 0;

        for op in operations {
            if op == "++X" || op == "X++" {
                pluses += 1;
            } else {
                minuses += 1;
            }
        }

        pluses - minuses
    }
}
