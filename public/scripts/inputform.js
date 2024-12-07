document.addEventListener("DOMContentLoaded", function() {

    let formCount = 1;  // counter

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
     * Toggles the custom input field if the user selects "other"
     */
    function toggleCustomInput(field) {
        const customInput = document.getElementById(`custom${capitalizeFirstLetter(field)}`);
        const selectInput = document.getElementById(field);
        if (selectInput.value === "other") {
            customInput.style.display = "block";
            customInput.value = ""; // Clear previous input
        } else {
            customInput.style.display = "none";
            customInput.value = ""; // Clear previous input
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
        if (form.style.display === "none" || form.style.display === "") {
            form.style.display = "block"; // Show form
        } else {
            form.style.display = "none";  // Hide form
        }
    }

    /**
     * Clones the job offer form and appends it to the container
     */
    function cloneJobOfferForm() {
        // Limit the number of job offer forms to 5
        if (formCount >= 5) {
            alert("You can only add up to 5 job offers.");
            return;
        }

        const formsContainer = document.getElementById('formsContainer');
        const originalForm = document.getElementById('jobOfferForm');
        const clonedForm = originalForm.cloneNode(true);

        // Clear input values in the cloned form
        const inputs = clonedForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.type !== 'button' && input.type !== 'submit') {
                input.value = '';
            }
        });

        // Assign unique IDs to the cloned form elements to avoid duplicates
        clonedForm.id = `jobOfferForm-${Date.now()}`; 
        const elementsWithIds = clonedForm.querySelectorAll('[id]');
        elementsWithIds.forEach(el => {
            const newId = `${el.id}-${Date.now()}`;
            el.id = newId;
        });

        // Attach event listeners to the [?] buttons in the cloned form
        const descriptionButtons = clonedForm.querySelectorAll('span[onclick]');
        descriptionButtons.forEach(button => {
            const descriptionId = button.getAttribute('onclick').match(/'(.+?)'/)[1];
            const newDescriptionId = `${descriptionId}-${Date.now()}`;
            button.setAttribute('onclick', `showDescription('${newDescriptionId}')`);
        });

        // Attach toggle logic for "More Options" inside the cloned form
        const moreOptionsButton = clonedForm.querySelector('.moreOptions button');
        if (moreOptionsButton) {
            moreOptionsButton.addEventListener('click', function() {
                const optionsForm = clonedForm.querySelector('#optionsForm');
                if (optionsForm) {
                    if (optionsForm.style.display === 'none' || optionsForm.style.display === '') {
                        optionsForm.style.display = 'block';
                    } else {
                        optionsForm.style.display = 'none';
                    }
                }
            });
        }

        formsContainer.appendChild(clonedForm);

        formCount++; 
    }

    /**
     * Event listener for the "More Options" button
     */
    const optionsButton = document.querySelector('.moreOptions button');
    if (optionsButton) {
        optionsButton.addEventListener('click', toggleForm);
    }

    /**
     * Event listener for "Add Job Offer" button to clone the form
     */
    const addJobOfferButton = document.querySelector('.button-container button[type="button"]');
    if (addJobOfferButton) {
        addJobOfferButton.addEventListener('click', cloneJobOfferForm);
    }
});
