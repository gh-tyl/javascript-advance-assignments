<script setup>
import MainMenu from './components/MainMenu.vue';
import HomePage from './components/HomePage.vue';
import ProductPage from './components/ProductPage.vue';
</script>

<template>
  <header>
    <MainMenu :isLogin="isLogin" />
  </header>
  <main>
    <router-view :isLogin="isLogin" @login="login" :userInfo="userInfo" @checkout="checkout" :carts="carts" />
  </main>
</template>

<script>
export default {
  name: 'App',
  components: {
    MainMenu,
    HomePage,
    ProductPage,
  },
  data() {
    return {
      products: new Array(),
      carts: new Map(),
      isLogin: false,
      userInfo: new Map(),
    };
  },
  methods: {
    login(value, user) {
      this.isLogin = value;
      if (value) {
        this.userInfo = user;
        console.log(this.userInfo);
      }
    },
    checkout(value) {
      console.log('checkout');
      console.log(value);
      this.carts = value;
      this.$router.push('/cart');
    },
  },
  mounted() {
    if (sessionStorage.getItem('user')) {
      this.isLogin = true;
      this.userInfo = JSON.parse(sessionStorage.getItem('user'));
    }
  },
};
</script>
