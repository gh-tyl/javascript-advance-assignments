<template>
  <div>
    <input type="text" v-model="username" />
    <input type="password" v-model="password" />
    <button @click="login">Login</button>
  </div>
</template>

<script>
import JsonServices from '../services/JsonServices.js';
import cryptojs from 'crypto-js';

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
      this.username = 'dfilchakov0'
      this.password = 'yJqPtEVqR'
      // this.password = this.encrypt(this.password)
      if (this.users.has(this.username)) {
        if (this.users.get(this.username).password === this.password) {
          console.log('Login successful');
          this.saveSession();
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
    saveSession() {
      this.users.get(this.username).password = this.encrypt(this.password);
      sessionStorage.setItem('user', JSON.stringify(this.users.get(this.username)));
    },
    encrypt(password) {
      return cryptojs.AES.encrypt(password, "secret key").toString();
    },
    decrypt(password) {
      return cryptojs.AES.decrypt(password, "secret key").toString(cryptojs.enc.Utf8);
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>
