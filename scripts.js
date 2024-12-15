document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed.");

    const categoryInput = document.getElementById("category");
    const amountInput = document.getElementById("amount");
    const typeSelect = document.getElementById("type");
    const expenseList = document.getElementById("expense-list");

    // Initialize localStorage if it doesn't exist
    if (!localStorage.getItem("expenses")) {
        console.log("Initializing localStorage for expenses.");
        localStorage.setItem("expenses", JSON.stringify([]));
    }

    // Function to render the list of expenses
    function renderExpenses() {
        console.log("Rendering expenses...");
        const expenses = JSON.parse(localStorage.getItem("expenses"));
        expenseList.innerHTML = ""; // Clear the list first
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

    // Function to handle form submission
    window.addExpense = () => {
        console.log("addExpense function triggered.");

        // Retrieve inputs
        const category = categoryInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const type = typeSelect.value;

        // Validate inputs
        if (!category || isNaN(amount) || type === "Select") {
            console.log("Validation failed. Inputs are invalid.");
            alert("Please fill in all fields correctly.");
            return;
        }

        // Create an expense object
        const expense = {
            category,
            amount,
            type,
            date: new Date().toISOString(),
        };

        // Retrieve existing expenses from localStorage
        const expenses = JSON.parse(localStorage.getItem("expenses"));

        // Add the new expense to the list
        expenses.push(expense);

        // Save updated expenses back to localStorage
        localStorage.setItem("expenses", JSON.stringify(expenses));

        // Clear the form inputs
        categoryInput.value = "";
        amountInput.value = "";
        typeSelect.value = "Select";

        alert("Expense added successfully!");

        // Re-render the expenses list
        renderExpenses();
    };

    // Function to delete an expense
    window.deleteExpense = (index) => {
        console.log(`Deleting expense at index ${index}`);
        const expenses = JSON.parse(localStorage.getItem("expenses"));
        expenses.splice(index, 1); // Remove the expense at the given index
        localStorage.setItem("expenses", JSON.stringify(expenses)); // Save updated list
        renderExpenses(); // Re-render the expenses
    };

    // Initial render of expenses on page load
    renderExpenses();
});
