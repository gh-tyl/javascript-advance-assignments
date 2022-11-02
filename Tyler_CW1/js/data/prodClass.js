export class prodClass {
    #id;
    #item_name;
    #price;
    constructor(id, item_name, price) {
        this.#id = id;
        this.#item_name = item_name;
        this.#price = price;
    }
    get id() {
        return this.#id;
    }
    get item_name() {
        return this.#item_name;
    }
    get price() {
        return this.#price;
    }
}
