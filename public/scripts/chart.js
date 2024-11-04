"use strict";
(function() {
    const chart = document.getElementById("mychart");

    //using Chart.js library
    new Chart(chart, {
        type: 'bar',
        data: {
            labels: ['Offer 1', 'Offer 2', 'Offer 3'],
            datasets: [{
                label: 'Income',
                backgroundColor: "green",
                data: [150000, 200000, 190000],
                borderWidth: 1
            }]
        },
        options: {
        }
    });
})();