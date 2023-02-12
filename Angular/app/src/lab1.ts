class Account {
  public Acc_no: number;
  public Balance: number;

  constructor(acc_no = 0, balance = 0) {
    this.Acc_no = acc_no;
    this.Balance = balance;
  }

  public debitAmount() {}

  public creditAmount() {}

  public getBalance() {}
}

interface IAccount {
  Date_of_opening: string;
}

class Saving_Account extends Account implements IAccount {
  public Date_of_opening: string;
  public Min_Balance: number;

  constructor(
    date_of_opening: string,
    min_balance = 0,
    acc_no = 0,
    balance = 0
  ) {
    super(acc_no, balance);
    this.Date_of_opening = date_of_opening;
    this.Min_Balance = min_balance;
  }
}

class Current_Account extends Account implements IAccount {
  public Date_of_opening: string;
  public interest_rate: number;

  constructor(
    date_of_opening: string,
    interest_rate: number,
    acc_no = 0,
    balance = 0
  ) {
    super(acc_no, balance);
    this.Date_of_opening = date_of_opening;
    this.interest_rate = interest_rate;
  }
}
