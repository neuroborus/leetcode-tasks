use std::collections::HashSet;

#[derive(PartialEq, Eq, Hash)]
struct Point {
    x: i32,
    y: i32,
}

impl Solution {
    pub fn count_unguarded(m: i32, n: i32, guards: Vec<Vec<i32>>, walls: Vec<Vec<i32>>) -> i32 {
        let mut guards_set: HashSet<Point> = HashSet::new();
        let mut walls_set: HashSet<Point> = HashSet::new();

        for g in guards {
            let point = Point {
                x: g[0],
                y: g[1],
            };
            guards_set.insert(point);
        }

        for w in walls {
            let point = Point {
                x: w[0],
                y: w[1],
            };
            walls_set.insert(point);
        }

        let is_ungarded_left = |x: i32, y: i32| -> bool {
            let mut x_cursor = x - 1;
            while (x_cursor >= 0) {
                let point = Point { x: x_cursor, y };
                if (guards_set.contains(&Point { x: x_cursor, y })) {
                    return false;
                }
                if (walls_set.contains(&Point { x: x_cursor, y })) {
                    return true;
                }

                x_cursor -= 1;
            }
            true
        };
        let is_ungarded_right = |x: i32, y: i32| -> bool {
            let mut x_cursor = x + 1;
            while (x_cursor < m) {
                let point = Point { x: x_cursor, y };
                if (guards_set.contains(&point)) {
                    return false;
                }
                if (walls_set.contains(&point)) {
                    return true;
                }

                x_cursor += 1;
            }
            true
        };
        let is_ungarded_top = |x: i32, y: i32| -> bool {
            let mut y_cursor = y - 1;
            while (y_cursor >= 0) {
                let point = Point { x, y: y_cursor };
                if (guards_set.contains(&point)) {
                    return false;
                }
                if (walls_set.contains(&point)) {
                    return true;
                }

                y_cursor -= 1;
            }
            true
        };
        let is_ungarded_bottom = |x: i32, y: i32| -> bool {
            let mut y_cursor = y + 1;
            while (y_cursor < n) {
                let point = Point { x, y: y_cursor };
                if (guards_set.contains(&point)) {
                    return false;
                }
                if (walls_set.contains(&point)) {
                    return true;
                }

                y_cursor += 1;
            }
            true
        };
        let is_ungarded_cell = |x: i32, y: i32| -> bool {
            let point = Point { x, y };
            if guards_set.contains(&point) || walls_set.contains(&point) {
                return false;
            }

            is_ungarded_left(x, y) && is_ungarded_right(x, y) && is_ungarded_top(x, y) && is_ungarded_bottom(x, y)
        };

        let mut ungarded = 0i32;

        for i in 0..m {
            for j in 0..n {
                if is_ungarded_cell(i, j) {
                    ungarded += 1;
                }
            }
        }

        ungarded
    }
}
