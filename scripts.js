document.addEventListener("DOMContentLoaded", () => {
    const categoryInput = document.getElementById("category");
    const amountInput = document.getElementById("amount");
    const typeSelect = document.getElementById("type");
    const expenseList = document.getElementById("expense-list");

    if (!localStorage.getItem("expenses")) {
        console.log("Initializing localStorage for expenses.");
        localStorage.setItem("expenses", JSON.stringify([]));
    }

    function renderExpenses() {
        console.log("Rendering expenses...");
        const expenses = JSON.parse(localStorage.getItem("expenses"));
        expenseList.innerHTML = "";
        expenses.forEach((expense, index) => {
            const expenseItem = document.createElement("div");
            expenseItem.className = "p-2 bg-gray-600 text-gray-300 rounded-md shadow-md flex justify-between items-center mb-2";

            expenseItem.innerHTML = `
                <div>
                    <p><strong>Category:</strong> ${expense.category}</p>
                    <p><strong>Amount:</strong> ₹${expense.amount.toFixed(2)}</p>
                    <p><strong>Type:</strong> ${expense.type}</p>
                    <p><strong>Date:</strong> ${new Date(expense.date).toLocaleString()}</p>
                </div>
                <button class="text-red-500 hover:underline" onclick="deleteExpense(${index})">Delete</button>
            `;
            expenseList.appendChild(expenseItem);
        });
    }

    window.addExpense = () => {
        console.log("addExpense function triggered.");

        const category = categoryInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const type = typeSelect.value;

        if (!category || isNaN(amount) || type === "Select") {
            console.log("Validation failed. Inputs are invalid.");
            alert("Please fill in all fields correctly.");
            return;
        }

        const expense = {
            category,
            amount,
            type,
            date: new Date().toISOString(),
        };

        const expenses = JSON.parse(localStorage.getItem("expenses"));

        expenses.push(expense);

        localStorage.setItem("expenses", JSON.stringify(expenses));

        categoryInput.value = "";
        amountInput.value = "";
        typeSelect.value = "Select";

        alert("Expense added successfully!");

        renderExpenses();
    };

    window.deleteExpense = (index) => {
        const expenses = JSON.parse(localStorage.getItem("expenses"));
        expenses.splice(index, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        renderExpenses();
    };


    renderExpenses();
});
