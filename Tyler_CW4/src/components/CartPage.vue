<template>
  <div class="cart-page">
    <h1>Cart Page</h1>
    <p>Cart page body content</p>
    <div>
      <TableCompo :products="null_products" :carts="carts" :shippingFee="shippingFee" :isList="false"
        @delete-from-cart="deleteFromCart" @add-amount="addAmount" @sub-amount="subAmount" />
    </div>
    <div>
      <!-- option from cities -->
      <select v-model="selectedCity">
        <option v-for="(city, idx) in cities" :key="idx" :value="city.prov">{{ city.city }}</option>
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
      selectedCity: '',
      shippingFee: 0,
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
  watch: {
    selectedCity: function (newVal, oldVal) {
      console.log('watch cities');
      console.log(newVal);
      if (newVal.prov === 'ON') {
        console.log('ON');
        this.shippingFee = 50;
      } else if (newVal.prov === 'AB') {
        this.shippingFee = 10;
      } else {
        this.shippingFee = 0;
      }
    },
  },
};
</script>
