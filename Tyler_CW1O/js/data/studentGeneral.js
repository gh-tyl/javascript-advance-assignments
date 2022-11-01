export class stuClass {
    #fname;
    #lname;
    #country;
    #scores;
    constructor(fname, lname, country, scores) {
        this.#fname = fname;
        this.#lname = lname;
        this.#country = country;
        this.#scores = scores;
    }
    calAverage() {
        let sum = 0;
        this.#scores.forEach(score => {
            sum += score;
        });
        // return alpabet
        let average = sum / this.#scores.length
        if (average >= 100) {
            return 'A';
        } else if (average >= 90) {
            return 'B+';
        } else if (average >= 80) {
            return 'B';
        } else if (average >= 70) {
            return 'C';
        } else {
            return 'F';
        }
    }
    get name() {
        return `${this.#fname} ${this.#lname}`;
    }
    get country() {
        return this.#country;
    }
    set scores(scores) {
        this.#scores = scores;
    }
    display() {
        return `Student Name: ${this.name} From: ${this.country} academic standing is: ${this.calAverage()}`;
    }
    returnAll() {
        return [this.name, this.country, this.calAverage()];
    }
}
