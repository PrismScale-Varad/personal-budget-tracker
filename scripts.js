document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed.");

    const categoryInput = document.getElementById("category");
    const amountInput = document.getElementById("amount");
    const typeSelect = document.getElementById("type");

    // Initialize localStorage if it doesn't exist
    if (!localStorage.getItem("expenses")) {
        console.log("Initializing localStorage for expenses.");
        localStorage.setItem("expenses", JSON.stringify([]));
    }

    // Function to handle form submission
    window.addExpense = () => {
        console.log("addExpense function triggered.");

        // Retrieve inputs
        const category = categoryInput.value.trim();
        console.log("Category:", category);

        const amount = parseFloat(amountInput.value);
        console.log("Amount:", amount);

        const type = typeSelect.value;
        console.log("Type:", type);

        // Validate inputs
        if (!category || isNaN(amount) || type === "Select") {
            console.log("Validation failed. Inputs are invalid.");
            alert("Please fill in all fields correctly.");
            return;
        }

        console.log("Validation passed.");

        // Create an expense object
        const expense = {
            category,
            amount,
            type,
            date: new Date().toISOString(),
        };
        console.log("Expense object created:", expense);

        // Retrieve existing expenses from localStorage
        const expenses = JSON.parse(localStorage.getItem("expenses"));
        console.log("Current expenses from localStorage:", expenses);

        // Add the new expense to the list
        expenses.push(expense);
        console.log("New expense added to the list.");

        // Save updated expenses back to localStorage
        localStorage.setItem("expenses", JSON.stringify(expenses));
        console.log("Expenses saved to localStorage.");

        // Clear the form inputs
        categoryInput.value = "";
        amountInput.value = "";
        typeSelect.value = "Select";
        console.log("Form inputs cleared.");

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
    logExpenses();
});
