class prodClass {
    constructor(pId, pName, price, amount) {
        this.pId = pId;
        this.pName = pName;
        this.price = price;
        this.amount = amount;
    }

    toObject() {
        return {
            pId: this.pId,
            pName: this.pName,
            price: this.price,
            amount: this.amount
        }
    }
}

export default prodClass;
