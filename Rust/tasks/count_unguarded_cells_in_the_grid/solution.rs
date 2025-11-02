impl Solution {
    pub fn count_unguarded(m: i32, n: i32, guards: Vec<Vec<i32>>, walls: Vec<Vec<i32>>) -> i32 {
        let (m, n) = (m as usize, n as usize);

        // Bit flags for a cell's state:
        // WALL  - the cell contains a wall
        // GUARD - the cell contains a guard
        // SEEN  - the cell is visible from at least one guard (no wall in between)
        const WALL:  u8 = 1 << 0;
        const GUARD: u8 = 1 << 1;
        const SEEN:  u8 = 1 << 2;

        // Use a flat 1D grid to reduce overhead vs Vec<Vec<_>>
        let mut grid = vec![0u8; m * n];
        let idx = |i: usize, j: usize| -> usize { i * n + j };

        // Mark guards
        for g in &guards {
            let (i, j) = (g[0] as usize, g[1] as usize);
            grid[idx(i, j)] |= GUARD;
        }
        // Mark walls
        for w in &walls {
            let (i, j) = (w[0] as usize, w[1] as usize);
            grid[idx(i, j)] |= WALL;
        }

        // Row sweeps: left -> right and right -> left
        for i in 0..m {
            // Left to right: a "ray" is on after a guard and off after a wall
            let mut ray = false;
            for j in 0..n {
                let v = grid[idx(i, j)];
                if v & WALL != 0 { ray = false; }       // wall blocks the ray
                else if v & GUARD != 0 { ray = true; }  // guard turns the ray on
                else if ray { grid[idx(i, j)] |= SEEN; } // empty cell gets marked as seen
            }
            // Right to left
            ray = false;
            for j in (0..n).rev() {
                let v = grid[idx(i, j)];
                if v & WALL != 0 { ray = false; }
                else if v & GUARD != 0 { ray = true; }
                else if ray { grid[idx(i, j)] |= SEEN; }
            }
        }

        // Column sweeps: top -> bottom and bottom -> top
        for j in 0..n {
            // Top to bottom
            let mut ray = false;
            for i in 0..m {
                let v = grid[idx(i, j)];
                if v & WALL != 0 { ray = false; }
                else if v & GUARD != 0 { ray = true; }
                else if ray { grid[idx(i, j)] |= SEEN; }
            }
            // Bottom to top
            ray = false;
            for i in (0..m).rev() {
                let v = grid[idx(i, j)];
                if v & WALL != 0 { ray = false; }
                else if v & GUARD != 0 { ray = true; }
                else if ray { grid[idx(i, j)] |= SEEN; }
            }
        }

        // Count unguarded cells:
        // - Only cells with value 0 are counted (no WALL, no GUARD, not SEEN)
        let mut ans = 0i32;
        for v in grid {
            if v == 0 { ans += 1; }
        }
        ans
    }
}
