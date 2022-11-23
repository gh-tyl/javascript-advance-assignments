<template>
    <div class="home-page">
        <h1>Home Page</h1>
        <p>Home page body content</p>
    </div>
    <div>
        <ul>
            <li>customerId: {{ userInfo.customerId }}</li>
            <li>userName: {{ userInfo.userName }}</li>
            <li>first_name: {{ userInfo.first_name }}</li>
            <li>last_name: {{ userInfo.last_name }}</li>
            <!-- <li>password: {{ userInfo.password }}</li> -->
            <li>email: {{ userInfo.email }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    props: {
        userInfo: Object,
    },
    mounted() {
        if (this.userInfo) {
            console.log(this.userInfo);
        } else {
            console.log('No user info');
            this.$router.push('/login');
        }
    },
}
</script>
