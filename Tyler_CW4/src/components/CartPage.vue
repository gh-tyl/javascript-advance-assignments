<template>
    <div class="cart-page">
        <h1>Cart Page</h1>
        <p>Cart page body content</p>
        <div>
            <TableCompo :products="null_products" :carts="carts" :isList="false" @delete-from-cart="deleteFromCart"
                @add-amount="addAmount" @sub-amount="subAmount" />
        </div>
        <div>
            <!-- option from cities -->
            <select v-model="selectedCity" @change="changeCity">
                <option v-for="city in cities" :value="city">
                    {{ city.city }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
import TableCompo from './TableCompo.vue';
import JsonServices from '../services/JsonServices.js';

export default {
    name: 'CartPage',
    components: {
        TableCompo,
    },
    props: {
        isLogin: {
            type: Boolean,
            required: true,
        },
        carts: {
            type: Map,
            required: true,
        },
    },
    data() {
        return {
            // carts: new Map(),
            null_carts: new Map(),
            cities: new Array(),
            city: '',
        };
    },
    methods: {
        async loadCity() {
            JsonServices.getCity()
                .then((response) => {
                    this.cities = response.data;
                    console.log(this.cities);
                })
                .catch((error) => {
                    console.log('Error: ' + error);
                });
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
            if (product.amount > 1) {
                product.amount--;
                this.carts.set(id, product);
            }
        },
    },
    mounted() {
        if (this.isLogin) {
            this.loadCity();
            console.log('CartPage mounted');
        } else {
            this.$router.push('/login');
        }
    },
    // watch: {
    //     city: function (newVal, oldVal) {
    //         console.log('watch cities');
    //         if (newVal.prov === 'ON') {
    //             this.total += 50;
    //         } else if (newVal.prov === 'AB') {
    //             this.total += 20;
    //         }

    //     },
    // },
    watch: {
        city: {
            handler() {
                console.log('watch cities');
                if (newVal.prov === 'ON') {
                    this.total += 50;
                } else if (newVal.prov === 'AB') {
                    this.total += 20;
                }
            },
            deep: true,
        },
    },
};
</script>
