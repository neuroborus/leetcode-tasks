#[derive(Clone, Copy)]
struct Time {
        start: i64,
        finish: i64,
    }

impl Solution {
    pub fn min_time(skill: Vec<i32>, mana: Vec<i32>) -> i64 {

        let mut timings: Vec<Time> = Vec::with_capacity(skill.len());

        let zero_time = Time {
                start: 0,
                finish: 0,
            };
        {
            let m = mana[0];
            let mut prev = zero_time;
            for s in skill.iter() {
                prev = Time {
                    start: prev.finish,
                    finish: prev.finish + (m * s) as i64,
                };
                timings.push(prev);
            }
        }

        let last_ind = skill.len() - 1;

        for m in &mana[1..] {
            let mut pure_times: Vec<Time> = Vec::with_capacity(skill.len());
            let mut time = zero_time;

            let mut bottleneck: i64 = 0;
            for (i, s) in skill.iter().enumerate() {
                time = Time {
                    start: time.finish,
                    finish: time.finish + (m * s) as i64,
                };
                pure_times.push(time);
                delays[i] = timings[i].finish - time.start;

                let delay = timings[i].finish - time.start;
                if (delay > bottleneck) {
                    bottleneck = delay;
                }
            }

            timings = pure_times.iter()
                .map(|(x)| Time {
                    start: x.start + bottleneck,
                    finish: x.finish + bottleneck,
                })
                .collect();
        }

        timings[last_ind].finish
    }
}
