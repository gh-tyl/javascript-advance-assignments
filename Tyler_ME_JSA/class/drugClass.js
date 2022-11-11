class drugClass {
    #drugID;
    #drugName;
    #productOf;
    #price;
    constructor(drugID, drugName, productOf, price) {
        this.#drugID = drugID;
        this.#drugName = drugName;
        this.#productOf = productOf;
        this.#price = price;
    }
    toObject() {
        return {
            drugID: this.#drugID,
            drugName: this.#drugName,
            productOf: this.#productOf,
            price: this.#price
        }
    }
}
export default drugClass;
