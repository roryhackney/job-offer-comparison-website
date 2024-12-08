export class Offer {
    //fields (default unit $/year)
        //company: str
        //job title: str
        //salary: int
        //bonus: int
        //signing bonus: int
        //401k: contribution: int,
        //      match: int (%),
        //insurance: fullCoverage OR partialCoverage
        //other: int
        //stock: type: stockOptions OR rsu OR espp OR ""
        //workType: in-person OR remote OR hybrid OR ""
        //relocationCost: int (should be made negative?)
        //educationalReimb: int
        //transportationCost: int (make negative?)
        //ptoDays: int

    constructor(company, title, salary=0, bonus=0, signingBonus=0, contributionTo401k=0, percentMatch401k=0, insurance, otherCompensation=0, stockType='', stockMarketPrice=0, stockPurchasePrice=0, stockQuantity=0, workType='', relocationCost=0, educationReimbursement=0, transportationCost=0, ptoDays=0) {
        this.company = company;
        this.title = title;
        this.salary = salary;
        this.bonus = bonus;
        this.signingBonus = signingBonus;
        //value = percent * yearly contribution
        this.companyContribution401k = percentMatch401k * contributionTo401k;
        this.insurance = insurance;
        this.otherCompensation = otherCompensation;
        //if rsu, price * qty, else (price-cost) * quantity
        this.stockValue = stockType === 'rsu' ? (stockMarketPrice * stockQuantity) : 
                                                ((stockMarketPrice - stockPurchasePrice) * stockQuantity);
        this.workType = workType;
        this.relocationCost = relocationCost; //treat as negative in the algorithm
        this.educationReimbursement = educationReimbursement;
        this.transportationCost = transportationCost; //treat as negative in the algorithm
        //value = daily pay * num days
        this.ptoValue = ptoDays * (salary / 260);
    }

    get getHeading() {
        return this.title + " at " + this.company;
    }
    
    get getTotal() {
        return this.salary + this.bonus + this.signingBonus + this.companyContribution401k + this.otherCompensation + this.stockValue - this.relocationCost + this.educationReimbursement - this.transportationCost + this.ptoValue;
        //TODO: implement actual algorithm
        //TODO: figure out how to handle value of insurance
    }

    get getJson() {
        return {
            "company": this.company,
            "title": this.title,
            "salary": this.salary,
            "bonus": this.bonus,
            "signingBonus": this.signingBonus,
            "companyContribution401k": this.companyContribution401k,
            "insurance": this.insurance,
            "otherCompensation": this.otherCompensation,
            "stockValue": this.stockValue,
            "workType": this.workType,
            "relocationCost": this.relocationCost,
            "educationReimbursement": this.educationReimbursement,
            "transportationCost": this.transportationCost,
            "ptoValue": this.ptoValue
        };
    }
}