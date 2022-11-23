<template>
    <div>
        <input type="text" v-model="username" />
        <input type="password" v-model="password" />
        <button @click="login">Login</button>
    </div>
</template>

<script>
import JsonServices from '../services/JsonServices.js';

export default {
    name: 'LoginForm',
    data() {
        return {
            users: new Map(),
            username: '',
            password: '',
        };
    },
    methods: {
        // un: dfilchakov0
        // pw: yJqPtEVqR
        async loadUsers() {
            JsonServices.getUser()
                .then((response) => {
                    response.data.forEach((user) => {
                        this.users.set(user.userName, user);
                    });
                    console.log(this.users);
                })
                .catch((error) => {
                    console.log('Error: ' + error);
                });
        },
        login() {
            // console.log(this.users);
            console.log(this.username)
            // this.username = 'dfilchakov0'
            // this.password = 'yJqPtEVqR'
            if (this.users.has(this.username)) {
                if (this.users.get(this.username).password === this.password) {
                    console.log('Login successful');
                    this.$emit('login', true, this.users.get(this.username));
                    this.$router.push('/');
                } else {
                    console.log('Wrong password');
                    this.$emit('login', false);
                }
            } else {
                console.log('User not found');
                this.$emit('login', false);
            }
        },
    },
    mounted() {
        this.loadUsers();
    },
};
</script>
