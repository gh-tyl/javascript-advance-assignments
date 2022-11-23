<template>
    <!-- Nav tabs -->
    <ul v-if="isLogin" class="nav nav-tabs" id="navId" role="tablist">
        <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link>
        </li>
        <li class="nav-item dropdown">
            <router-link class="nav-link active" to="/product">Product</router-link>
        </li>
        <li class="nav-item dropdown">
            <router-link class="nav-link active" to="/cart">Cart</router-link>
        </li>
        <li class="nav-item dropdown">
            <!-- logout button -->
            <button class="nav-link active" @click="logout">Logout</button>
        </li>
    </ul>
    <ul v-else class="nav nav-tabs" id="navId" role="tablist">
        <li class="nav-item">
            <router-link class="nav-link active" to="/login">Login</router-link>
        </li>
    </ul>

</template>

<script>
export default {
    name: 'MainMenu',
    props: {
        isLogin: Boolean,
    },
    methods: {
        logout() {
            sessionStorage.removeItem('user');
            this.$router.push('/login');
        },
    },
};
</script>
