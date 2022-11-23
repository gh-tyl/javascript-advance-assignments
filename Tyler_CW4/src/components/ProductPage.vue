<script setup>
import TableCompo from './TableCompo.vue';
import JsonServices from '../services/JsonServices.js';
import prodClass from '../class/prodClass.js';
</script>

<template>
    <div class="product-page">
        <h1>Product Page</h1>
        <p>Product page body content</p>
    </div>
    <div class="row">
        <div class="col-6">
            <TableCompo :products="products" :carts="null_carts" :isList="true" @add-to-cart="addToCart" />
        </div>
        <div class="col-6">
            <TableCompo :products="null_products" :carts="carts" :isList="false" @delete-from-cart="deleteFromCart"
                @add-amount="addAmount" @sub-amount="subAmount" />
            <button class="btn btn-primary" @click="checkout">Checkout</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductPage',
    components: {
        TableCompo,
    },
    props: {
        isLogin: {
            type: Boolean,
            required: true,
        },
        // products: {
        //     type: Array,
        //     required: true,
        // },
        carts: {
            type: Map,
            required: true,
        },
    },
    data() {
        return {
            products: new Array(),
            null_products: new Array(),
            // carts: new Map(),
            null_carts: new Map(),
            amount: 1,
        };
    },
    methods: {
        async loadProducts() {
            JsonServices.getProd()
                .then((response) => {
                    this.products = response.data;
                })
                .catch((error) => {
                    console.log('Error: ' + error);
                });
        },
        addToCart(product) {
            if (this.carts == null) {
                this.carts = new Map();
            }
            if (this.carts.has(product.pId)) {
                let prodObj = this.carts.get(product.pId);
                prodObj.amount++;
                this.carts.set(product.pId, prodObj);
            } else {
                let prodObj = new prodClass(product.pId, product.pName, product.price, this.amount);
                this.carts.set(prodObj.pId, prodObj.toObject());
            }
        },
        deleteFromCart(id) {
            this.carts.delete(id);
        },
        addAmount(id) {
            let product = this.carts.get(id);
            product.amount++;
            this.carts.set(id, product);
        },
        subAmount(id) {
            let product = this.carts.get(id);
            product.amount--;
            if (product.amount <= 0) {
                product.amount = 0;
            }
            this.carts.set(id, product);
        },
        checkout() {
            this.$emit('checkout', this.carts);
        },
    },
    mounted() {
        if (this.isLogin) {
            this.loadProducts();
        } else {
            this.$router.push('/login');
        }
    },
}
</script>
