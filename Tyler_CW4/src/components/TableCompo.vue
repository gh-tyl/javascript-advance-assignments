<template>
    <div class="table-responsive">
        <table v-if="isList" class="table table-dark">
            <thead>
                <tr>
                    <th scope="col">Product ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Price</th>
                    <th scope="col">Add</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.pId">
                    <td>{{ product.pId }}</td>
                    <td>{{ product.pName }}</td>
                    <td>{{ product.price }}</td>
                    <td>
                        <button class="btn btn-primary" @click="addToCart(product)">
                            Add to Cart
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <table v-else class="table table-dark">
            <thead>
                <tr>
                    <th scope="col">Product ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Price</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Total</th>
                    <th scope="col">After Tax</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in carts" :key="product.pId">
                    <td>{{ product[1].pId }}</td>
                    <td>{{ product[1].pName }}</td>
                    <td>{{ product[1].price }}</td>
                    <!-- <td>{{ product[1].amount }}</td> -->
                    <td>
                        <button class="btn btn-primary" @click="addAmount(product[1].pId)">
                            +
                        </button>
                        {{ product[1].amount }}
                        <button class="btn btn-primary" @click="subAmount(product[1].pId)">
                            -
                        </button>
                    </td>
                    <td>{{ totalItem(product[1].price, product[1].amount) }}</td>
                    <td>{{ totalItemWithTax(product[1].price, product[1].amount) }}</td>
                    <td>
                        <button class="btn btn-primary" @click="deleteFromCart(product[1].pId)">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4" class="text-right">Total</td>
                    <td colspan="1">{{ total }}</td>
                    <td colspan="1">{{ totalWithTax }}</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
export default {
    name: 'TableCompo',
    props: {
        products: {
            type: Array,
            required: true,
        },
        carts: {
            type: Map,
            required: true,
        },
        isList: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    data() {
        return {
            total: 0,
            totalWithTax: 0,
        };
    },
    methods: {
        addToCart(product) {
            this.$emit('add-to-cart', product);
        },
        deleteFromCart(id) {
            this.$emit('delete-from-cart', id);
        },
        addAmount(id) {
            this.$emit('add-amount', id);
        },
        subAmount(id) {
            this.$emit('sub-amount', id);
        },
        totalItem(price, amount) {
            return (price * amount).toFixed(2);;
        },
        totalItemWithTax(price, amount) {
            return (price * amount * 1.1).toFixed(2);
        },
    },
    watch: {
        carts: {
            handler() {
                this.total = 0;
                this.carts.forEach((value, key) => {
                    this.total += value.price * value.amount;
                });
                this.total = this.total.toFixed(2);
                this.totalWithTax = (this.total * 1.1).toFixed(2);
            },
            deep: true,
        },
    },
    mounted() {
        this.total = 0;
        this.carts.forEach((value, key) => {
            this.total += value.price * value.amount;
        });
        this.total = this.total.toFixed(2);
        this.totalWithTax = (this.total * 1.1).toFixed(2);
    },
}
</script>
