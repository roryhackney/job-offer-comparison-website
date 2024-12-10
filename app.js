// Import the Offer class from offer.js
import { Offer } from './offer.js';

document.addEventListener("DOMContentLoaded", function () {
    const formsContainer = document.getElementById("formsContainer");
    const resultsContainer = document.getElementById("resultsContainer");
    const submitButton = document.getElementById("submitButton");

    // Array to store offer data
    const offerData = [];

    /**
     * Handles form submission and processes the job offers
     */
    function handleFormSubmission(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Gather data from all forms
        const forms = formsContainer.querySelectorAll(".job-offer-form");
        offerData.length = 0; // Clear previous data
        forms.forEach(form => {
            const formData = new FormData(form);

            // Extract form data
            const company = formData.get("company");
            const title = formData.get("title");
            const salary = parseFloat(formData.get("salary")) || 0;
            const bonus = parseFloat(formData.get("bonus")) || 0;
            const signingBonus = parseFloat(formData.get("signingBonus")) || 0;
            const contributionTo401k = parseFloat(formData.get("contributionTo401k")) || 0;
            const percentMatch401k = parseFloat(formData.get("percentMatch401k")) || 0;
            const insurance = formData.get("insurance");
            const otherCompensation = parseFloat(formData.get("otherCompensation")) || 0;
            const stockType = formData.get("stockType") || "";
            const stockMarketPrice = parseFloat(formData.get("stockMarketPrice")) || 0;
            const stockPurchasePrice = parseFloat(formData.get("stockPurchasePrice")) || 0;
            const stockQuantity = parseFloat(formData.get("stockQuantity")) || 0;
            const workType = formData.get("workType") || "";
            const relocationCost = parseFloat(formData.get("relocationCost")) || 0;
            const educationReimbursement = parseFloat(formData.get("educationReimbursement")) || 0;
            const transportationCost = parseFloat(formData.get("transportationCost")) || 0;
            const ptoDays = parseInt(formData.get("ptoDays"), 10) || 0;

            // Create a new Offer instance
            const offer = new Offer(
                company,
                title,
                salary,
                bonus,
                signingBonus,
                contributionTo401k,
                percentMatch401k,
                insurance,
                otherCompensation,
                stockType,
                stockMarketPrice,
                stockPurchasePrice,
                stockQuantity,
                workType,
                relocationCost,
                educationReimbursement,
                transportationCost,
                ptoDays
            );

            // Add the offer to the array
            offerData.push(offer);
        });

        // Display results
        displayResults(offerData);

        // Compare offers if there are enough
        compareOffers();
    }

    /**
     * Displays the results of the job offer calculations
     */
    function displayResults(offerData) {
        resultsContainer.innerHTML = ""; // Clear previous results

        offerData.forEach((offer, index) => {
            const offerElement = document.createElement("div");
            offerElement.className = "offer-result";

            offerElement.innerHTML = `
                <h3>Offer ${index + 1}: ${offer.getHeading()}</h3>
                <p><strong>Total Compensation:</strong> $${offer.getTotal().toFixed(2)}</p>
                <pre>${JSON.stringify(offer.getJson(), null, 2)}</pre>
            `;

            resultsContainer.appendChild(offerElement);
        });
    }

    /**
     * Compares the offers and identifies strengths and weaknesses
     */
    function compareOffers() {
        if (offerData.length < 2) {
            alert("Please add at least two job offers for comparison.");
            return;
        }
    
        let score1 = 0;
        let score2 = 0;
        const pros1 = [];
        const pros2 = [];
    
        const offer1 = offerData[0];
        const offer2 = offerData[1];
    
        // Compare salary
        if (offer1.salary > offer2.salary) {
            score1++;
            pros1.push("Higher Salary");
        } else if (offer1.salary < offer2.salary) {
            score2++;
            pros2.push("Higher Salary");
        }
    
        // Compare bonus
        else if (offer1.bonus > offer2.bonus) {
            score1++;
            pros1.push("Higher Bonus");
        } else if (offer1.bonus < offer2.bonus) {
            score2++;
            pros2.push("Higher Bonus");
        }
    
        // Compare signing bonus
        else if (offer1.signingBonus > offer2.signingBonus) {
            score1++;
            pros1.push("Higher Signing Bonus");
        } else if (offer1.signingBonus < offer2.signingBonus) {
            score2++;
            pros2.push("Higher Signing Bonus");
        }
    
        // Compare contribution to 401k
        else if (offer1.contributionTo401k > offer2.contributionTo401k) {
            score1++;
            pros1.push("Higher Contribution to 401k");
        } else if (offer1.contributionTo401k < offer2.contributionTo401k) {
            score2++;
            pros2.push("Higher Contribution to 401k");
        }
    
        // Compare percent match of 401k
        else if (offer1.percentMatch401k > offer2.percentMatch401k) {
            score1++;
            pros1.push("Higher Percent Match for 401k");
        } else if (offer1.percentMatch401k < offer2.percentMatch401k) {
            score2++;
            pros2.push("Higher Percent Match for 401k");
        }
    
        // Compare relocation cost
        else if (offer1.relocationCost > offer2.relocationCost) {
            score1++;
            pros1.push("Higher Relocation Cost Covered");
        } else if (offer1.relocationCost < offer2.relocationCost) {
            score2++;
            pros2.push("Higher Relocation Cost Covered");
        }
    
        // Compare PTO days
        else if (offer1.ptoDays > offer2.ptoDays) {
            score1++;
            pros1.push("More PTO Days");
        } else if (offer1.ptoDays < offer2.ptoDays) {
            score2++;
            pros2.push("More PTO Days");
        }
    
        // Compare other compensation
        else if (offer1.otherCompensation > offer2.otherCompensation) {
            score1++;
            pros1.push("Higher Other Compensation");
        } else if (offer1.otherCompensation < offer2.otherCompensation) {
            score2++;
            pros2.push("Higher Other Compensation");
        }
    
        // Compare total compensation
        else if (offer1.getTotal() > offer2.getTotal()) {
            score1++;
            pros1.push("Higher Total Compensation");
        } else if (offer1.getTotal() < offer2.getTotal()) {
            score2++;
            pros2.push("Higher Total Compensation");
        }
        
         // CHART FUNCTION IS HERE
        // Display comparison results 
        const resultElement = document.createElement("div");
        resultElement.className = "comparison-result";
    
        resultElement.innerHTML = `
            <h4>Comparison Results:</h4>
            <div>
                <h5>Offer 1:</h5>
                <p><strong>Score:</strong> ${score1}</p>
                <p><strong>Pros:</strong> ${pros1.join(", ")}</p>
            </div>
            <div>
                <h5>Offer 2:</h5>
                <p><strong>Score:</strong> ${score2}</p>
                <p><strong>Pros:</strong> ${pros2.join(", ")}</p>
            </div>
        `;
    
        resultsContainer.appendChild(resultElement);
    }
    

    // Attach event listener to the submit button
    if (submitButton) {
        submitButton.addEventListener("click", handleFormSubmission);
    }
});
