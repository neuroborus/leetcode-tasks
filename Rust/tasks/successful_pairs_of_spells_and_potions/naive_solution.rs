// fixme
impl Solution {
    pub fn successful_pairs(spells: Vec<i32>, potions: Vec<i32>, success: i64) -> Vec<i32> {
        let mut result: Vec<i32> = Vec::with_capacity(spells.len());
        
        for spell in spells.iter() {
            let mut counter: i32 = 0;

            for potion in potions.iter() {
                if (spell * potion) as i64 >= success {
                    counter += 1;
                }
            }
            result.push(counter);
        }

        result
    }
}