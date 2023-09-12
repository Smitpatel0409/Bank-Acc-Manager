class BankAccount {
    constructor(accountHolder, accountType) {
        this.accountHolder = accountHolder;
        this.accountType = accountType;
        this.balance = 0;
    }

    performAction(action, amount) {
        switch (action) {
            case 'deposit':
                try {
                    this.deposit(amount);
                    return `Deposited $${amount} successfully. New balance: $${this.getBalance()}`;
                } catch (error) {
                    return error.message;
                }
                break;
            case 'withdraw':
                try {
                    this.withdraw(amount);
                    return `Withdrawn $${amount} successfully. New balance: $${this.getBalance()}`;
                } catch (error) {
                    return error.message;
                }
                break;
            case 'balance':
                return `Current balance: $${this.getBalance()}`;
            default:
                return 'Invalid action';
        }
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
const actionButtons = document.querySelectorAll('.action-button');
const messageElement = document.getElementById('message');

let currentAccount;

accountNameInput.addEventListener('change', () => {
    const accountName = accountNameInput.value.trim();
    const accountType = accountTypeSelect.value;
    currentAccount = new BankAccount(accountName, accountType);
    messageElement.textContent = `Account created for ${accountName} (${accountType}).`;
});

actionButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        const amount = parseFloat(amountInput.value);
        
        let message = currentAccount.performAction(action, amount);
        
        messageElement.textContent = message;
        
        if (action === 'deposit' || action === 'withdraw') {
            amountInput.value = '';
        }
    });
});
