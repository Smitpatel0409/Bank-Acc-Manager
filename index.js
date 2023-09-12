class BankAccount {
    constructor(accountHolder, accountType) {
        this.accountHolder = accountHolder;
        this.accountType = accountType;
        this.balance = 0;
    }

    deposit(amount) {
        if (amount <= 0) {
            throw new Error('Invalid amount for deposit');
        }
        this.balance += amount;
    }

    withdraw(amount) {
        if (amount <= 0) {
            throw new Error('Invalid amount for withdrawal');
        }
        if (amount > this.balance) {
            throw new Error('Insufficient funds');
        }
        this.balance -= amount;
    }

    getBalance() {
        return this.balance;
    }
}

const accountNameInput = document.getElementById('accountName');
const accountTypeSelect = document.getElementById('accountType');
const amountInput = document.getElementById('amount');
const depositButton = document.getElementById('deposit');
const withdrawButton = document.getElementById('withdraw');
const balanceButton = document.getElementById('balance');
const messageElement = document.getElementById('message');

let currentAccount;

depositButton.addEventListener('click', () => {
    try {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount)) {
            throw new Error('Invalid amount');
        }
        currentAccount.deposit(amount);
        messageElement.textContent = `Deposited $${amount} successfully. New balance: $${currentAccount.getBalance()}`;
    } catch (error) {
        messageElement.textContent = error.message;
    } finally {
        amountInput.value = '';
    }
});

withdrawButton.addEventListener('click', () => {
    try {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount)) {
            throw new Error('Invalid amount');
        }
        currentAccount.withdraw(amount);
        messageElement.textContent = `Withdrawn $${amount} successfully. New balance: $${currentAccount.getBalance()}`;
    } catch (error) {
        messageElement.textContent = error.message;
    } finally {
        amountInput.value = '';
    }
});

balanceButton.addEventListener('click', () => {
    const balance = currentAccount.getBalance();
    messageElement.textContent = `Current balance: $${balance}`;
});

accountNameInput.addEventListener('change', () => {
    const accountName = accountNameInput.value.trim();
    const accountType = accountTypeSelect.value;
    currentAccount = new BankAccount(accountName, accountType);
    messageElement.textContent = `Account created for ${accountName} (${accountType}).`;
});
