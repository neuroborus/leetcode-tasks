// TODO: from borders to center
impl Solution {
    #[inline]
    fn is_touches_pacific(i: usize, j: usize) -> bool {
        i == 0 || j == 0
    }
    #[inline]
    fn is_touches_atlantic(i: usize, j: usize, height: usize, width: usize) -> bool {
        i == height - 1 || j == width - 1
    }

    fn flow(
        i: usize,
        j: usize,
        height: usize,
        width: usize,
        heights: &Vec<Vec<i32>>,
        pacifics: &mut Vec<Vec<Option<bool>>>,
        atlantics: &mut Vec<Vec<Option<bool>>>,
        visiting: &mut Vec<Vec<bool>>,
    ) -> (bool, bool) {
        visiting[i][j] = true;

        let mut pacific: bool = match pacifics[i][j] {
            Some(b) => b,
            None => Self::is_touches_pacific(i, j),
        };
        let mut atlantic: bool = match atlantics[i][j] {
            Some(b) => b,
            None => Self::is_touches_atlantic(i, j, height, width),
        };

        if pacific && atlantic {
                    pacifics[i][j]  = Some(true);
                    atlantics[i][j] = Some(true);
                    visiting[i][j] = false;
                    return (true, true);
        }

        let current_height = heights[i][j];

        // top
        if i > 0 {
            let h_ind = i - 1;
            if current_height >= heights[h_ind][j] && !visiting[h_ind][j] {
                let (p, a) = Self::flow(h_ind, j, height, width, heights, pacifics, atlantics, visiting);
                pacific = pacific || p;
                atlantic = atlantic || a;
            }
        }
        // left
        if j > 0 {
            let w_ind = j - 1;
            if current_height >= heights[i][w_ind] && !visiting[i][w_ind] {
                let (p, a) = Self::flow(i, w_ind, height, width, heights, pacifics, atlantics, visiting);
                pacific = pacific || p;
                atlantic = atlantic || a;
            }
        }
        // down
        if i < height - 1 {
            let h_ind = i + 1;
            if current_height >= heights[h_ind][j] && !visiting[h_ind][j] {
                let (p, a) = Self::flow(h_ind, j, height, width, heights, pacifics, atlantics, visiting);
                pacific = pacific || p;
                atlantic = atlantic || a;
            }
        }
        // right
        if j < width - 1 {
            let w_ind = j + 1;
            if current_height >= heights[i][w_ind] && !visiting[i][w_ind] {
                let (p, a) = Self::flow(i, w_ind, height, width, heights, pacifics, atlantics, visiting);
                pacific = pacific || p;
                atlantic = atlantic || a;
            }
        }

        pacifics[i][j] = Some(pacific);
        atlantics[i][j] = Some(atlantic);

        visiting[i][j] = false;

        (pacific, atlantic)
    }

    pub fn pacific_atlantic(heights: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let height = heights.len();
        let width = heights.first().map_or(0, |row| row.len());

        let mut pacifics: Vec<Vec<Option<bool>>> = vec![vec![None; width]; height];
        let mut atlantics: Vec<Vec<Option<bool>>> = vec![vec![None; width]; height];
        let mut visiting: Vec<Vec<bool>> = vec![vec![false; width]; height];

        let mut results: Vec<Vec<i32>> = vec![];
        for i in 0..height {
            for j in 0..width {
                let (p, a) = Self::flow(i, j, height, width, &heights, &mut pacifics, &mut atlantics, &mut visiting);
                if p && a {
                    results.push(vec![i as i32, j as i32]);
                }
            }
        }
        results
    }
}
