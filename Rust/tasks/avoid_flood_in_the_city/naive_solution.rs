// TODO: it's too slow - optimize
impl Solution {
    pub fn avoid_flood(rains: Vec<i32>) -> Vec<i32> {
        let mut flood_lakes: Vec<i32> = Vec::with_capacity(rains.len()); // stores indexes of fulfilled lakes
        let mut lakes: std::collections::HashSet<i32> = std::collections::HashSet::new(); // is lake fulfilled with water
        let mut results: Vec<i32> = vec![1; rains.len()];
        for (index, rainy_lake) in rains.iter().enumerate() {
            if *rainy_lake == 0 {
                // TODO: optimize
                let nearest_needed = rains.iter().skip(index + 1).find(|&&x| x != 0 && lakes.contains(&x));
                match nearest_needed {
                    Some(to_dry) => {
                        results[index] = *to_dry;
                        lakes.remove(to_dry);
                    },
                    None => {
                        match flood_lakes.pop() {
                            Some(to_dry) => {
                                results[index] = to_dry;
                                lakes.remove(&to_dry);
                            },
                            None => (),
                        };
                    },
                };
            } else if *rainy_lake > 0 {
                if lakes.contains(rainy_lake) {
                    return [].to_vec();
                }
                results[index] = -1;
                flood_lakes.push(*rainy_lake);
                lakes.insert(*rainy_lake);
            }
        }
        results
    }
}
