export class Offer {
    constructor(role, company, salary, bonus, stocksValue, percent401k, ptoDays, healthcareValue) {
        this.role = role;
        this.company = company;
        this.salary = salary;
        this.bonus = bonus;
        this.stocksValue = stocksValue;
        //value = percent * 2000 savings/mo * 12 mo in yr
        this.match401k = percent401k * 2000 * 12;
        //value = daily pay * num days
        this.pto = Math.floor(salary / 365.0 * ptoDays);
        this.healthcareValue = healthcareValue;
    }

    get getTitle() {
        return this.role + " at " + this.company;
    }
    
    get getTotal() {
        return this.salary + this.bonus + this.stocksValue + this.match401k + this.pto + this.healthcareValue;
    }

    get getJson() {
        return {
            "role": this.role,
            "company": this.company,
            "salary": this.salary,
            "bonus": this.bonus,
            "stocksValue": this.stocksValue,
            "match401k": this.match401k,
            "pto": this.pto,
            "healthcare": this.healthcareValue
        };
    }
}