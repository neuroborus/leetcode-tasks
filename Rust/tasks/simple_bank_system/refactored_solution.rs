use std::collections::{HashMap, hash_map::Entry};

struct Bank {
    accounts: HashMap<i32, i64>,
}

impl Bank {
    fn new(balance: Vec<i64>) -> Self {
        let accounts = balance
            .into_iter()
            .enumerate()
            .map(|(i, x)| ((i as i32) + 1, x)) // 1-based keys
            .collect();

        Self { accounts }
    }

    #[inline]
    fn valid(&self, a: i32) -> bool {
        self.accounts.contains_key(&a)
    }

    fn deposit(&mut self, account: i32, money: i64) -> bool {
        if !self.valid(account) { return false; }
        *self.accounts.get_mut(&account).unwrap() += money;
        true
    }

    fn withdraw(&mut self, account: i32, money: i64) -> bool {
        if !self.valid(account) { return false; }
        let bal = self.accounts.get_mut(&account).unwrap();
        if *bal < money { return false; }
        *bal -= money;
        true
    }

    fn transfer(&mut self, account1: i32, account2: i32, money: i64) -> bool {
        if !self.valid(account1) || !self.valid(account2) { return false; }
        // if account1 == account2 { return true; } // or false

        // 1) withdraw from account1
        match self.accounts.entry(account1) {
            Entry::Occupied(mut from) => {
                if *from.get() < money { return false; }
                *from.get_mut() -= money;
                drop(from); // release &mut to avoid double mutable borrow
            }
            Entry::Vacant(_) => return false, // shouldn't happen if valid()
        }

        // 2) deposit to account2
        *self.accounts.get_mut(&account2).unwrap() += money;
        true
    }
}
