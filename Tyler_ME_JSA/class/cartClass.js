class cartClass {
    #customerId;
    #cart = new Map();
    constructor(customerId) {
        this.#customerId = customerId;
    }
    addProduct(item) {
        this.#cart.set(item.drugID, item.obj);
    }
    removeProduct(itemId) {
        this.#cart.delete(itemId);
    }
    searchProduct(drugID) {
        return this.#cart.has(drugID);
    }
    getProduct(drugID) {
        return this.#cart.get(drugID);
    }
    calTotal() {
        let sum = 0;
        for (const product of this.returnValues()) {
            console.log('product.shipping', product.shipping);
            if (product.shipping == true) {
                sum += ((product.price * product.amount) + (product.price * product.amount * 0.1));
            } else {
                sum += product.price * product.amount;
            }
        }
        return sum;
    }
    returnValues() {
        return this.#cart.values();
    }
}
export default cartClass;
