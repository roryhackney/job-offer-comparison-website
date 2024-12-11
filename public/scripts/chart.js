import "../../node_modules/chart.js/dist/chart.umd.js";
import {Offer} from "./Offer.js";

"use strict";
(function() {
    const chart = document.getElementById("mychart");

    // //Test with demo data before connecting to Nguyen's code - works
    // const OFFERS = [
    //     {"score": 10, pros: ["Some", "cool", "pros"], "offer":
    //         new Offer("Company1", "Title1", 80000, 10000, 1000, 2000, 5, 0, 1300, "rsu", 0, 0, 0, "remote", 1000, 1200, 100, 10)
    //     },
    //     {"score": 15, pros: ["Other", "excellent", "wins"], "offer":
    //         new Offer("Company2", "Title2", 90000, 5000, 1200, 4000, 2, 0, 1400, "rsu", 0, 0, 0, "hybrid", 2000, 1100, 1000, 100)
    //     }
    // ];
    
    // score, pros, offer objects
    const OFFERS = [
        JSON.parse(localStorage.getItem("offer1")),
        JSON.parse(localStorage.getItem("offer2"))
    ];
    console.log("OFFERS", OFFERS);

    sortOffersInPlace(OFFERS);
    displayOffersRanks(OFFERS);

    //sorts offers by score instead of total cash value
    function sortOffersInPlace(offers) {
        return offers.sort((a, b) => b.score - a.score);
    }

    //Display title, company, score, total value, pros for each offer
    function displayOffersRanks(offers) {
        const list = document.getElementById("ranking");
        //create a list item for each offer to display information
        for (let index = 0; index < offers.length; index++) {
            const off = offers[index].offer;
            //create elements and text content
            let li = document.createElement("li");
            let h3 = document.createElement("h3")
            h3.innerText = off.title + " at " + off.company;
            let scoreP = document.createElement("p");
            scoreP.innerText = "Score: " + offers[index].score;
            // let valueP = document.createElement("p");
            // valueP.innerText = "Value: " + Math.round(off.getTotal);
            let prosP = document.createElement("p");
            prosP.innerText = "Pros: " + offers[index].pros.join(", ");
            
            //add content to the document
            li.appendChild(h3);
            li.appendChild(scoreP);
            // li.appendChild(valueP);
            li.appendChild(prosP);
            list.appendChild(li);
        }
    }

    //using Chart.js library
    //TODO: update to display SCORE and FIELDS
    new Chart(chart, {
        type: 'bar',
        data: {
            labels: OFFERS.map(off => off.offer.title + " at " + off.offer.company),
            datasets: [
                {label: 'Salary',
                backgroundColor: "red",
                data: OFFERS.map(off => off.offer.salary)
                },

                {label: 'Bonus',
                backgroundColor: "orange",
                data: OFFERS.map(off => off.offer.bonus)
                },

                {label: "Signing Bonus",
                backgroundColor: "yellow",
                data: OFFERS.map(off => off.offer.signingBonus)
                },

                {label: '401k Match',
                backgroundColor: "green",
                data: OFFERS.map(off => off.offer.companyContribution401k)
                },

                {label: 'Other',
                backgroundColor: "blue",
                data: OFFERS.map(off => off.offer.otherCompensation)
                },

                {label: "Edu Reimbursement",
                backgroundColor: "purple",
                data: OFFERS.map(off => off.offer.educationReimbursement)
                },

                {label: 'PTO',
                backgroundColor: "pink",
                data: OFFERS.map(off => off.offer.ptoValue)
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