let totalIncome = 0;
let totalExpenses = 0;

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1000);
});

function addIncome() {
    const description = document.getElementById('income-description').value.trim();
    const amount = parseFloat(document.getElementById('income-amount').value);

    if (description === '' || isNaN(amount) || amount <= 0) {
        showNotification('Please enter a valid income description and amount.', 'error');
        return;
    }

    totalIncome += amount;
    updateTransactionHistory(description, 'Income', amount);
    updateSummary();
    clearIncomeInputs();
}

function addExpense() {
    const description = document.getElementById('expense-description').value.trim();
    const category = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (description === '' || isNaN(amount) || amount <= 0) {
        showNotification('Please enter a valid expense description and amount.', 'error');
        return;
    }

    totalExpenses += amount;
    updateTransactionHistory(description, category, amount, 'Expense');
    updateSummary();
    clearExpenseInputs();
}

function updateTransactionHistory(description, category, amount, type = 'Income') {
    const transactionHistory = document.getElementById('transaction-history');
    const row = document.createElement('tr');
    row.classList.add('fade-in');

    row.innerHTML = `
        <td>${description}</td>
        <td>${category}</td>
        <td>${amount.toFixed(2)}</td>
        <td class="${type.toLowerCase()}">${type}</td>
        <td><button onclick="deleteTransaction(this, ${amount}, '${type}')"><i class="fas fa-trash"></i> Delete</button></td>
    `;

    transactionHistory.appendChild(row);
}

function deleteTransaction(button, amount, type) {
    const row = button.parentElement.parentElement;
    row.classList.add('fade-out');
    setTimeout(() => {
        row.remove();
        if (type === 'Income') {
            totalIncome -= amount;
        } else {
            totalExpenses -= amount;
        }
        updateSummary();
    }, 300);
}

function updateSummary() {
    const totalIncomeEl = document.getElementById('total-income');
    const totalExpensesEl = document.getElementById('total-expenses');
    const balanceEl = document.getElementById('balance');

    totalIncomeEl.textContent = totalIncome.toFixed(2);
    totalExpensesEl.textContent = totalExpenses.toFixed(2);
    balanceEl.textContent = (totalIncome - totalExpenses).toFixed(2);

    // Animate summary numbers
    [totalIncomeEl, totalExpensesEl, balanceEl].forEach(el => {
        el.classList.add('pulse');
        setTimeout(() => el.classList.remove('pulse'), 300);
    });

    // Color balance based on value
    const balance = totalIncome - totalExpenses;
    balanceEl.style.color = balance >= 0 ? '#28a745' : '#dc3545';
}

function clearIncomeInputs() {
    document.getElementById('income-description').value = '';
    document.getElementById('income-amount').value = '';
}

function clearExpenseInputs() {
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-category').value = 'Housing';
}

function clearAll() {
    document.getElementById('transaction-history').innerHTML = '';
    totalIncome = 0;
    totalExpenses = 0;
    updateSummary();
    showNotification('All transactions cleared!', 'success');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}