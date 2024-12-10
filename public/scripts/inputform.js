document.addEventListener("DOMContentLoaded", function() {

    /**
     * Toggles the display of the description text when the [?] button is clicked
     */
    function showDescription(descriptionId) {
        const description = document.getElementById(descriptionId);
        if (description) {
            description.style.display = description.style.display === "none" || description.style.display === ""
                ? "block"
                : "none";
        } else {
            console.warn(`Element with ID "${descriptionId}" not found.`);
        }
    }

        /**
     * Event listener for all [?] buttons to show descriptions
     */
    const descriptionLinks = document.querySelectorAll('[onclick^="showDescription"]');
    descriptionLinks.forEach(link => {
        link.addEventListener('click', function() {
            const descriptionId = link.getAttribute('onclick').match(/'([^']+)'/)[1];
            showDescription(descriptionId);
        });
    });

    /**
     * Toggles the custom input field if the user selects "other"
     */
    function toggleCustomInput(field) {
        const customInput = document.getElementById(`custom${capitalizeFirstLetter(field)}`);
        const selectInput = document.getElementById(field);
        if (selectInput.value === "other") {
            customInput.style.display = "block";
            customInput.value = ""; 
        } else {
            customInput.style.display = "none";
            customInput.value = ""; 
        }
    }

    /**
     * Capitalizes the first letter of a string
     */
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * Toggle additional form visibility for each form
     */
    function toggleForm() {
        const form = document.getElementById("optionsForm");
        const moreOptions = document.getElementById('moreOptions');
    
        if (form) {
            form.style.display = form.style.display === "none" || form.style.display === "" ? "block" : "none";
        } else {
            console.warn('Form with ID "optionsForm" not found.');
        }
    
        if (moreOptions) {
            moreOptions.style.display = moreOptions.style.display === 'none' || moreOptions.style.display === '' ? 'block' : 'none';
        } else {
            console.warn('Element with ID "moreOptions" not found.');
        }
    }
    
    /**
     * Event listener for the "More Options" button
     */
    const optionsButton = document.querySelector('.moreOptions button');
    if (optionsButton) {
        optionsButton.addEventListener('click', toggleForm);
    }



    /**
     * Limit job offer form creation to a maximum of 5
     */
    let formCount = 1; 
    const maxForms = 5;

    const addJobOfferButton = document.querySelector('.button-container button[type="button"]');
    const formsContainer = document.getElementById('formsContainer');
    const initialForm = document.getElementById('jobOfferForm');

    // Move the initial form to the formsContainer
    formsContainer.appendChild(initialForm);

    addJobOfferButton.addEventListener('click', () => {
        if (formCount < maxForms) {
            const newForm = createJobOfferForm();
            formsContainer.appendChild(newForm);
            formCount++;

            if (formCount === maxForms) {
                addJobOfferButton.disabled = true;
                addJobOfferButton.textContent = 'Maximum of 5 Forms Reached';
            }
        }
    });

    /**
     * Create a new job offer form by cloning the original form
     */
    function createJobOfferForm() {
  
        const formTemplate = document.getElementById('jobOfferForm');
        const newForm = formTemplate.cloneNode(true);
        
     
        const inputs = newForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.value = '';
        });

        // Customize ID so its unique
        newForm.id = `jobOfferForm${formCount + 1}`;


        // Add event listener to the cloned button ---- this maybe where the issue is
        const clonedButton = newForm.querySelector('.addJobOfferButton');
        if (clonedButton) {
            
            clonedButton.disabled = true;
        }
        
        return newForm;
    }
});

/**
 * Toggle the visibility of the cloned job offer form.
 */
function toggleJobOfferForm(button) {
    const form = button.nextElementSibling; 
    if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
}

function cloneJobOfferButton() {
    const originalButton = document.getElementById('addJobOfferButton'); 
    const clonedButton = originalButton.cloneNode(true); 
    const container = document.getElementById('container');
    container.appendChild(clonedButton);

    //THIS MIGHT BE THE ISSUE
    clonedButton = newForm.querySelector('.addJobOfferButton');
    if (clonedButton) {
        clonedButton.addEventListener('click', createJobOfferForm);
    }
        alert('Cloned button clicked');
}


/* Stock Compensation - Stock Options, RSU & ESSP field */
document.getElementById('stockCompensationType').addEventListener('change', function() {
    const stockCompensationFields = document.getElementById('stockCompensationFields');
    stockCompensationFields.innerHTML = '';
    
    const selectedType = this.value;
    
    if (selectedType === 'stockOptions') {
        stockCompensationFields.innerHTML = `
            <div class="form-group stock-options-fields">
                <label for="marketPrice">Market Price ($):</label>
                <input type="number" id="marketPrice" name="marketPrice" min="0" step="0.01" placeholder="e.g. 100" required>
            </div>
            <div class="form-group stock-options-fields">
                <label for="strikePrice">Strike Price ($):</label>
                <input type="number" id="strikePrice" name="strikePrice" min="0" step="0.01" placeholder="e.g. 50" required>
            </div>
            <div class="form-group stock-options-fields">
                <label for="numberOfOptions">Number of Options:</label>
                <input type="number" id="numberOfOptions" name="numberOfOptions" min="1" placeholder="e.g. 1000" required>
            </div>
        `;
    } else if (selectedType === 'rsu') {
        stockCompensationFields.innerHTML = `
            <div class="form-group rsu-fields">
                <label for="marketPrice">Market Price ($):</label>
                <input type="number" id="marketPrice" name="marketPrice" min="0" step="0.01" placeholder="e.g. 100" required>
            </div>
            <div class="form-group rsu-fields">
                <label for="numberOfRSUs">Number of RSUs:</label>
                <input type="number" id="numberOfRSUs" name="numberOfRSUs" min="1" placeholder="e.g. 1000" required>
            </div>
        `;
    } else if (selectedType === 'espp') {
        stockCompensationFields.innerHTML = `
            <div class="form-group espp-fields">
                <label for="marketPrice">Market Price ($):</label>
                <input type="number" id="marketPrice" name="marketPrice" min="0" step="0.01" placeholder="e.g. 100" required>
            </div>
            <div class="form-group espp-fields">
                <label for="purchasePrice">Purchase Price ($):</label>
                <input type="number" id="purchasePrice" name="purchasePrice" min="0" step="0.01" placeholder="e.g. 80" required>
            </div>
            <div class="form-group espp-fields">
                <label for="numberOfShares">Number of Shares:</label>
                <input type="number" id="numberOfShares" name="numberOfShares" min="1" placeholder="e.g. 1000" required>
            </div>
        `;
    }
});

// Validate Form before Submission
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();  
    
    if (validateForm()) {
        // If validation passes, gather form data
        const formData = new FormData(event.target);
        
        console.log('Form Data:', Object.fromEntries(formData.entries()));

        alert('Form has been successfully validated!');

        // Submit the form manually after validation
        event.target.submit();  
    } else {
        console.log('Form is invalid. Please check your input.');
    }
});

// Function to validate the form
function validateForm(form) {
    let valid = true;
    const errorMessages = [];

    // Validate company
    const company = form.querySelector('#company');
    if (!company.value) {
        valid = false;
        errorMessages.push('Company name is required.');
    }
    // Validate job title
    const jobTitle = form.querySelector('#jobTitle');
    if (!jobTitle.value) {
        valid = false;
        errorMessages.push('Job Title is required.');
    }

    // Validate number fields (baseSalary, bonus, signingBonus, k401Contribution, k401Match)
    const baseSalary = form.querySelector('#baseSalary');
    if (!baseSalary.value || baseSalary.value <= 0) {
        valid = false;
        errorMessages.push('Base Salary must be a positive number.');
    }

    const bonus = form.querySelector('#bonus');
    if (bonus && bonus.value < 0) {
        valid = false;
        errorMessages.push('Bonus must be a positive number or left empty.');
    }

    const signingBonus = form.querySelector('#signingBonus');
    if (signingBonus && signingBonus.value < 0) {
        valid = false;
        errorMessages.push('Signing Bonus must be a positive number or left empty.');
    }

    // Skip 401K validation if no value is provided
    const k401Contribution = form.querySelector('#k401Contribution');
    if (k401Contribution.value && k401Contribution.value < 0) {
        valid = false;
        errorMessages.push('401K Contribution must be a positive number.');
    }

    const k401Match = form.querySelector('#k401Match');
    if (k401Match.value && k401Match.value < 0) {
        valid = false;
        errorMessages.push('401K Match must be a positive number.');
    }

    // Validate select fields - healthInsurance
    const healthInsurance = form.querySelector('#healthInsurance');
    if (healthInsurance.value && !healthInsurance.value) {
        valid = false;
        errorMessages.push('Health Insurance option must be selected.');
    }

    const otherCompensation = form.querySelector('#otherCompensation');
    if (otherCompensation && otherCompensation.value < 0) {
        valid = false;
        errorMessages.push('Other Compensation must be a positive number or left empty.');
    }

    // Validate Relocation Cost
    const relocationCost = form.querySelector('#relocationCost');
    if (relocationCost && relocationCost.value < 0) {
        valid = false;
        errorMessages.push('Relocation Cost must be a positive number or left empty.');
    }

    // Validate Educational Reimbursement
    const educationalReimbursement = form.querySelector('#educationalReimbursement');
    if (educationalReimbursement && educationalReimbursement.value < 0) {
        valid = false;
        errorMessages.push('Educational Reimbursement must be a positive number or left empty.');
    }

    // Validate Transportation Cost
    const transportationCost = form.querySelector('#transportationCost');
    if (transportationCost && transportationCost.value < 0) {
        valid = false;
        errorMessages.push('Transportation Cost must be a positive number or left empty.');
    }

    // Show errors if invalid
    const errorContainer = document.getElementById('errorMessages');
    if (errorMessages.length > 0) {
        errorContainer.innerHTML = errorMessages.join('<br>');
    } else {
        errorContainer.innerHTML = '';  
    }

    return valid;
}


/* gather input from the form and save it in the data structure */

// Array to store job offers
const jobOffers = [];
const jobOfferForm = document.getElementById("jobOfferForm");

/**
 * Event listener for the form submit
 */
jobOfferForm.addEventListener("submit", function(event) {
    event.preventDefault(); 

    // Create a job offer object by gathering form input values
    const jobOffer = {
        company: document.getElementById("company").value.trim(),
        jobTitle: document.getElementById("jobTitle").value.trim(),
        baseSalary: parseFloat(document.getElementById("baseSalary").value) || 0,
        bonus: parseFloat(document.getElementById("bonus").value) || 0,
        signingBonus: parseFloat(document.getElementById("signingBonus").value) || 0,
        k401Contribution: parseFloat(document.getElementById("k401Contribution").value) || 0,
        k401Match: parseFloat(document.getElementById("k401Match").value) || 0,
        stockCompensationType: document.getElementById("stockCompensationType").value,
        healthInsurance: document.getElementById("healthInsurance").value,
        otherCompensation: parseFloat(document.getElementById("other").value) || 0,
        workType: document.getElementById("workType").value,
        ptoDays: parseInt(document.getElementById("ptoDays").value) || 0,
        relocationCost: parseFloat(document.getElementById("relocationCost").value) || 0,
        educationReimbursement: parseFloat(document.getElementById("educationReimbursement").value) || 0,
        transportationCost: parseFloat(document.getElementById("transportationCost").value) || 0
    };

    // Save the job offer object in the array
    jobOffers.push(jobOffer);

    // Clear the form
    jobOfferForm.reset();
});

  