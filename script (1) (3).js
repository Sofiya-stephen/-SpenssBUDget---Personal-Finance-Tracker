


/*document.addEventListener('DOMContentLoaded', () => {
  const transactionForm = document.getElementById('transaction-form');
  const transactionList = document.getElementById('transaction-list');
  const incomeAmount = document.getElementById('income-amount');
  const expenseAmount = document.getElementById('expense-amount');
  const balanceAmount = document.getElementById('balance-amount');
  const typeToggles = document.querySelectorAll('.type-toggle');
  const filterType = document.getElementById('filter-type');
  const expenseCategoriesDiv = document.getElementById('expense-categories');
  const recentTransactionsDiv = document.getElementById('recent-transactions');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const addBtnMobile = document.getElementById('add-btn-mobile');

  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  let currentType = 'expense';

  // Set today's date
  document.getElementById('date').valueAsDate = new Date();

  // Toggle transaction type
  typeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      currentType = btn.dataset.type;
      typeToggles.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Add transaction
  transactionForm.addEventListener('submit', e => {
    e.preventDefault();
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;

    if (!description || isNaN(amount) || !date) {
      return alert('Please fill all fields correctly!');
    }

    const transaction = {
      id: Date.now(),
      type: currentType,
      description,
      amount,
      date,
      category
    };

    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    updateUI();
    transactionForm.reset();
    document.getElementById('date').valueAsDate = new Date();
  });

  // Filter transactions
  filterType.addEventListener('change', updateUI);

  // Mobile add button focus
  addBtnMobile.addEventListener('click', () => {
    document.getElementById('description').focus();
  });

  // Theme toggle
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    const themeIcon = document.body.classList.contains('dark-mode') ? 'fa-moon' : 'fa-sun';
    themeToggleBtn.innerHTML = `<i class="fas ${themeIcon}"></i>`;
  });

  // Update UI
  function updateUI() {
    renderTransactions();
    renderSummary();
    renderOverview();
  }

  function renderTransactions() {
    const filter = filterType.value;
    let filteredTransactions = [...transactions];
    if (filter !== 'all') {
      filteredTransactions = filteredTransactions.filter(t => t.type === filter);
    }

    if (filteredTransactions.length === 0) {
      transactionList.innerHTML = `<p class="empty-msg">No transactions found!</p>`;
      return;
    }

    transactionList.innerHTML = filteredTransactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(t => `
        <div class="transaction-item">
          <span>${t.description} (${t.category}) - ${t.type === 'income' ? '+' : '-'}₹${t.amount}</span>
          <button class="delete-btn" data-id="${t.id}"><i class="fas fa-trash"></i></button>
        </div>
      `).join('');

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        transactions = transactions.filter(t => t.id !== id);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        updateUI();
      });
    });
  }

  function renderSummary() {
    let income = 0, expense = 0;
    transactions.forEach(t => {
      if (t.type === 'income') income += t.amount;
      else expense += t.amount;
    });
    incomeAmount.textContent = income.toFixed(2);
    expenseAmount.textContent = expense.toFixed(2);
    balanceAmount.textContent = (income - expense).toFixed(2);
  }

  function renderOverview() {
    // Expense by category
    const expenseByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const totalExpense = Object.values(expenseByCategory).reduce((sum, val) => sum + val, 0);

    if (totalExpense === 0) {
      expenseCategoriesDiv.innerHTML = `<p class="empty-msg">No expense data yet</p>`;
    } else {
      expenseCategoriesDiv.innerHTML = Object.entries(expenseByCategory)
        .sort((a, b) => b[1] - a[1])
        .map(([cat, amt]) => {
          const percentage = ((amt / totalExpense) * 100).toFixed(1);
          return `
            <div class="category-bar">
              <span>${cat}</span>
              <span>₹${amt.toFixed(2)}</span>
              <div class="bar-bg"><div class="bar-fill" style="width:${percentage}%;"></div></div>
            </div>
          `;
        }).join('');
    }

    // Recent transactions (last 5)
    const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    if (recent.length === 0) {
      recentTransactionsDiv.innerHTML = `<p class="empty-msg">No recent transactions</p>`;
    } else {
      recentTransactionsDiv.innerHTML = recent.map(t => `
        <div class="transaction-item">
          <span>${t.description} (${t.category}) - ${t.type === 'income' ? '+' : '-'}₹${t.amount}</span>
        </div>
      `).join('');
    }
  }

  updateUI();
}); */

document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const transactionForm = document.getElementById('transaction-form');
  const transactionList = document.getElementById('transaction-list');
  const filterType = document.getElementById('filter-type');
  const addBtnMobile = document.getElementById('add-btn-mobile');
  const themeToggleBtn = document.getElementById('theme-toggle');

  const incomeAmount = document.getElementById('income-amount');
  const expenseAmount = document.getElementById('expense-amount');
  const balanceAmount = document.getElementById('balance-amount');

  const expenseCategories = document.getElementById('expense-categories');
  const recentTransactions = document.getElementById('recent-transactions');

  const typeToggles = document.querySelectorAll('.type-toggle');

  // Set today's date
  document.getElementById('date').valueAsDate = new Date();

  // Transactions array
  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  let currentType = 'expense';

  // Theme setup
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    themeToggleBtn.innerHTML = `<i class="fas fa-moon"></i>`;
  } else {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    themeToggleBtn.innerHTML = `<i class="fas fa-sun"></i>`;
  }

  // Type toggle buttons
  typeToggles.forEach(button => {
    button.addEventListener('click', () => {
      typeToggles.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      currentType = button.dataset.type;
    });
  });

  // Add transaction
  transactionForm.addEventListener('submit', e => {
    e.preventDefault();
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;

    if (!description || isNaN(amount) || !date) {
      alert('Please fill all fields correctly.');
      return;
    }

    const transaction = {
      id: generateId(),
      type: currentType,
      description,
      amount,
      date,
      category
    };

    transactions.push(transaction);
    saveTransactions();
    updateUI();
    transactionForm.reset();
  });

  // Filter transactions
  filterType.addEventListener('change', updateUI);

  // Mobile add button focus
  addBtnMobile.addEventListener('click', () => {
    document.getElementById('description').focus();
  });

  // Theme toggle
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      themeToggleBtn.innerHTML = `<i class="fas fa-moon"></i>`;
    } else {
      localStorage.setItem('theme', 'light');
      themeToggleBtn.innerHTML = `<i class="fas fa-sun"></i>`;
    }
  });

  // Generate unique ID
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Save transactions to localStorage
  function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  // Update UI
  function updateUI() {
    updateTransactionsList();
    updateSummary();
    updateOverview();
  }

  // Update transactions list
  function updateTransactionsList() {
    const filter = filterType.value;
    let filtered = [...transactions];
    if (filter !== 'all') {
      filtered = filtered.filter(t => t.type === filter);
    }

    if (filtered.length === 0) {
      transactionList.innerHTML = `<p class="empty-msg">No transactions found!</p>`;
      return;
    }

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    transactionList.innerHTML = filtered.map(t => `
      <div class="transaction-item ${t.type}">
        <div>
          <p class="desc">${t.description}</p>
          <p class="date">${formatDate(t.date)} - ${t.category}</p>
        </div>
        <div class="amount-delete">
          <p class="amount ${t.type === 'income' ? 'income-color' : 'expense-color'}">
            ${t.type === 'income' ? '+' : '-'}₹${t.amount.toFixed(2)}
          </p>
          <button class="delete-btn" data-id="${t.id}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');

    // Add delete functionality
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteTransaction(btn.dataset.id));
    });
  }

  // Delete transaction
  function deleteTransaction(id) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      transactions = transactions.filter(t => t.id !== id);
      saveTransactions();
      updateUI();
    }
  }

  // Update summary
  function updateSummary() {
    const income = transactions.filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;

    incomeAmount.textContent = `₹${income.toFixed(2)}`;
    expenseAmount.textContent = `₹${expense.toFixed(2)}`;
    balanceAmount.textContent = `₹${balance.toFixed(2)}`;
  }

  // Update overview
  function updateOverview() {
    // Expense categories
    const expenseByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        if (!acc[t.category]) acc[t.category] = 0;
        acc[t.category] += t.amount;
        return acc;
      }, {});

    const totalExpense = Object.values(expenseByCategory).reduce((sum, val) => sum + val, 0);

    expenseCategories.innerHTML = Object.entries(expenseByCategory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([category, amount]) => {
        const percentage = totalExpense === 0 ? 0 : ((amount / totalExpense) * 100).toFixed(1);
        return `
          <div class="category-bar">
            <div class="cat-name">${category} - ₹${amount.toFixed(2)}</div>
            <div class="bar">
              <div class="fill" style="width:${percentage}%;"></div>
            </div>
          </div>
        `;
      }).join('') || '<p>No expense data yet.</p>';

    // Recent transactions (last 5)
    const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    recentTransactions.innerHTML = recent.map(t => `
      <div class="recent-item ${t.type}">
        <p>${t.description}</p>
        <p>${formatDateShort(t.date)} - ₹${t.amount.toFixed(2)}</p>
      </div>
    `).join('') || '<p>No recent transactions.</p>';
  }

  // Date formatting
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function formatDateShort(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  // Initial UI update
  updateUI();
});
