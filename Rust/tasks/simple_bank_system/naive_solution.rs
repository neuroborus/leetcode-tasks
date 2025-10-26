use std::collections::HashMap;

struct Bank {
    accounts_quantity: i32,
    accounts: HashMap<i32, i64>,
}


/**
 * `&self` means the method takes an immutable reference.
 * If you need a mutable reference, change it to `&mut self` instead.
 */
impl Bank {

    fn new(balance: Vec<i64>) -> Self {
        let accounts_quantity = balance.len() as i32;
        let accounts = balance.into_iter().enumerate().map(|(i, x)| ((i + 1) as i32, x)).collect();

        Self {
            accounts_quantity,
            accounts,
        }
    }

    fn transfer(&mut self, account1: i32, account2: i32, money: i64) -> bool {
        if account1 > self.accounts_quantity || account2 > self.accounts_quantity {
            return false;
        }
        if self.accounts.get(&account1).copied().unwrap_or(0) < money {
            return false;
        }

        {
            let acc1_b = self.accounts.get_mut(&account1).unwrap();
            if *acc1_b < money {
                return false;
            }
        }
        self.accounts.entry(account2).and_modify(|n| *n += money).or_insert(money);
        self.accounts.entry(account1).and_modify(|n| *n -= money).or_insert(money);

        true
    }

    fn deposit(&mut self, account: i32, money: i64) -> bool {
        if account > self.accounts_quantity {
            return false;
        }
        self.accounts.entry(account).and_modify(|n| *n += money).or_insert(money);

        true
    }

    fn withdraw(&mut self, account: i32, money: i64) -> bool {
        if account > self.accounts_quantity {
            return false;
        }
        if self.accounts.get(&account).copied().unwrap_or(0) < money {
            return false;
        }
        let acc_b = self.accounts.get_mut(&account).unwrap();
        if (*acc_b < money) {
            return false;
        }
        *acc_b -= money;

        true
    }
}

/**
 * Your Bank object will be instantiated and called as such:
 * let obj = Bank::new(balance);
 * let ret_1: bool = obj.transfer(account1, account2, money);
 * let ret_2: bool = obj.deposit(account, money);
 * let ret_3: bool = obj.withdraw(account, money);
 */
