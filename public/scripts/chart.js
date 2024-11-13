import "../../node_modules/chart.js/dist/chart.umd.js";
import {Offer} from "./Offer.js";

"use strict";
(function() {
    const chart = document.getElementById("mychart");

    const OFFERS = [
        new Offer("Software Engineer",  "Company",   110000, 10000, 30000, 0.05, 28, 28000),
        new Offer("Software Developer", "Startup",   120000, 15000, 25000, 0.04, 32, 30000),
        new Offer("Web Developer",      "Nonprofit", 90000,  9000,  28000, 0.06, 30, 20000)
    ]

    sortOffersInPlace(OFFERS);
    displayOffersRanks(OFFERS);

    //sorts offers by total profit
    function sortOffersInPlace(offers) {
        return offers.sort((a, b) => b.getTotal - a.getTotal);
    }

    function displayOffersRanks(offers) {
        const list = document.getElementById("ranking");
        for (let index = 0; index < offers.length; index++) {
            let li = document.createElement("li");
            let h3 = document.createElement("h3")
            h3.innerText = offers[index].getTitle;
            li.appendChild(h3);
            list.appendChild(li);
        }
    }

    //using Chart.js library
    new Chart(chart, {
        type: 'bar',
        data: {
            labels: OFFERS.map(offer => offer.getTitle),
            datasets: [
                {label: 'Salary',
                backgroundColor: "orange",
                data: OFFERS.map(offer => offer.salary)
                },

                {label: 'Bonus',
                backgroundColor: "pink",
                data: OFFERS.map(offer => offer.bonus)
                },

                {label: 'Stocks',
                backgroundColor: "yellow",
                data: OFFERS.map(offer => offer.stocksValue)
                },

                {label: '401k Match',
                backgroundColor: "green",
                data: OFFERS.map(offer => offer.match401k)
                },

                {label: 'PTO',
                backgroundColor: "blue",
                data: OFFERS.map(offer => offer.pto)
                },

                {label: 'Healthcare',
                backgroundColor: "red",
                data: OFFERS.map(offer => offer.healthcareValue)
                }
            ]
        },
        options: {
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        }
    });
})();