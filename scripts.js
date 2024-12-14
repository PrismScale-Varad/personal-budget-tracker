document.addEventListener("DOMContentLoaded", () => {
    const categoryInput = document.getElementById("category");
    const amountInput = document.getElementById("amount");
    const typeSelect = document.getElementById("type");

    // Initialize localStorage if it doesn't exist
    if (!localStorage.getItem("expenses")) {
        localStorage.setItem("expenses", JSON.stringify([]));
    }

    // Function to handle form submission
    window.addExpense = () => {
        // Retrieve inputs
        const category = categoryInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const type = typeSelect.value;

        // Validate inputs
        if (!category || isNaN(amount) || type === "Select") {
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

        // Optional: Log current expenses to console
        logExpenses();
    };

    // Function to log all expenses to the console
    function logExpenses() {
        const expenses = JSON.parse(localStorage.getItem("expenses"));
        console.log("Current Expenses:", expenses);
    }

    // Example: Uncomment the line below to log expenses on page load
    // logExpenses();
});
