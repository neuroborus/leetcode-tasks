impl Solution {
    pub fn max_sum_div_three(nums: Vec<i32>) -> i32 {
        let mut first_min_rest_one = i32::MAX;
        let mut second_min_rest_one = i32::MAX;

        let mut first_min_rest_two = i32::MAX;
        let mut second_min_rest_two = i32::MAX;

        let mut general_sum = 0i32;
        for num in nums {
            general_sum += num;
            match num % 3 {
                1 => {
                    if num < first_min_rest_one {
                        second_min_rest_one = first_min_rest_one;
                        first_min_rest_one = num;
                    } else if num < second_min_rest_one {
                        second_min_rest_one = num;
                    }
                },
                2 => {
                    if num < first_min_rest_two {
                        second_min_rest_two = first_min_rest_two;
                        first_min_rest_two = num;
                    } else if num < second_min_rest_two {
                        second_min_rest_two = num;
                    }
                },
                _ => (),
            }
        }

        let delta: i32 = match general_sum % 3 {
            0 => 0,
            1 => first_min_rest_one.min(
                first_min_rest_two.saturating_add(second_min_rest_two),
            ),
            2 => first_min_rest_two.min(
                first_min_rest_one.saturating_add(second_min_rest_one),
            ),
            _ => unreachable!(),
        };

        general_sum - delta
    }
}