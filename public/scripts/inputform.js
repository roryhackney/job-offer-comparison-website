/**
 * Function to display the "more options" button when clicked
 */
function toggleForm() {
    const form = document.getElementById("optionsForm");
    if (form.style.display === "none" || form.style.display === "") {
        form.style.display = "block"; // Show form
    } else {
        form.style.display = "none";  // Hide form
    }
}

/**
 * Function to calculate and display the total compensation
 */

// Add event listener to handle form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from actually submitting
    calculateTotal();        // Call the function to calculate the total
});

function calculateTotal() {
    // Get the values of all relevant input fields, using a fallback value of 0 if not filled
    const baseSalary = parseFloat(document.getElementById("baseSalary").value) || 0;
    const bonus = parseFloat(document.getElementById("bonus").value) || 0;
    const stockOptions = parseFloat(document.getElementById("stockOptions").value) || 0;
    const signingBonus = parseFloat(document.getElementById("signingBonus").value) || 0;
    const k401Match = parseFloat(document.getElementById("k401Match").value) || 0;
    const transportationCost = parseFloat(document.getElementById("transportationCost").value) || 0;
    const educationReimbursement = parseFloat(document.getElementById("educationReimbursement").value) || 0;

    // Check if relocationCost input is visible and has value
    const relocationCostElement = document.getElementById("relocationCost");
    const relocationCost = (relocationCostElement && relocationCostElement.style.display !== "none")
        ? parseFloat(relocationCostElement.value) || 0
        : 0;

    // Log the values for debugging
    console.log("Base Salary:", baseSalary);
    console.log("Bonus:", bonus);
    console.log("Stock Options:", stockOptions);
    console.log("Signing Bonus:", signingBonus);
    console.log("401K Match:", k401Match);
    console.log("Transportation Cost:", transportationCost);
    console.log("Education Reimbursement:", educationReimbursement);
    console.log("Relocation Cost:", relocationCost);

    // Calculate the total compensation
    const total = baseSalary + bonus + stockOptions + signingBonus + k401Match + transportationCost + educationReimbursement + relocationCost;

    // Display the total
    const totalDisplay = document.getElementById("totalDisplay");
    if (totalDisplay) {
        totalDisplay.innerText = 'Total Compensation: $' + total.toFixed(2);
    }
}
