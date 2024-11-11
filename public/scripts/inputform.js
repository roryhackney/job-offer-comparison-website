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
     * Toggle additional form visibility
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
     * Event listener for the "More Options" button
     */

    const optionsButton = document.querySelector('.moreOptions button');
    if (optionsButton) {
        optionsButton.addEventListener('click', toggleForm);
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

});
