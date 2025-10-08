impl Solution {
    pub fn successful_pairs(spells: Vec<i32>, potions: Vec<i32>, success: i64) -> Vec<i32> {
        let mut result: Vec<i32> = Vec::with_capacity(spells.len());
        let mut sorted_potions = potions.clone();
        sorted_potions.sort(); // asc

        let potions_len: usize = potions.len();
        let initial_bs_pointer: usize = potions_len / 2;

        for spell in spells.iter() {
            if *spell == 0 {
                result.push(0);
                continue;
            }

            let mut top_border: usize = potions_len;
            let mut low_border: usize = 0;

            let need = (success + *spell as i64 - 1) / *spell as i64; // min requirement for potion

            while low_border < top_border {
                let bs_pointer = low_border + (top_border - low_border) / 2;
                if (sorted_potions[bs_pointer] as i64) < need {
                    low_border = bs_pointer + 1;
                } else {
                    top_border = bs_pointer;
                }
            }

            let options = (potions_len - low_border) as i32;
            result.push(options);
        }
        result
    }
}