// Optimized

struct Bank {
    balances: Vec<i64>,
}

impl Bank {
    fn new(balance: Vec<i64>) -> Self {
        Self { balances: balance }
    }

    #[inline]
    fn idx(&self, account: i32) -> Option<usize> {
        // map 1-based account to 0-based index
        if account >= 1 && (account as usize) <= self.balances.len() {
            Some((account - 1) as usize)
        } else {
            None
        }
    }

    fn deposit(&mut self, account: i32, money: i64) -> bool {
        let i = match self.idx(account) { Some(i) => i, None => return false };
        self.balances[i] += money;
        true
    }

    fn withdraw(&mut self, account: i32, money: i64) -> bool {
        let i = match self.idx(account) { Some(i) => i, None => return false };
        if self.balances[i] < money { return false; }
        self.balances[i] -= money;
        true
    }

    fn transfer(&mut self, account1: i32, account2: i32, money: i64) -> bool {
        let (i, j) = match (self.idx(account1), self.idx(account2)) {
            (Some(i), Some(j)) => (i, j),
            _ => return false,
        };
        if self.balances[i] < money { return false; }

        // Two sequential mutations avoid borrow conflicts.
        self.balances[i] -= money;
        self.balances[j] += money;
        true
    }
}
