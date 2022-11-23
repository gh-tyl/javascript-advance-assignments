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
};
</script>
