impl Solution {
    pub fn maximum_energy(energy: Vec<i32>, k: i32) -> i32 {
        let mut best_result = i32::MIN;
        // for the each step type
        for st in 1..(k + 1) {
            let mut size_k = st as usize;

            let mut current_value = 0i32;
            let mut best_value = i32::MIN;

            let mut current_index = (energy.len() - size_k) as isize;
            // let mut best_index = current_index;

            while current_index >= 0 {
                let value = energy[current_index as usize];
                current_value += value;

                if current_value > best_value {
                    best_value = current_value;
                    // best_index = current_index;
                }

                current_index -= k as isize;
            }

            if best_value > best_result {
                best_result = best_value;
            }
        }
        best_result
    }
}
