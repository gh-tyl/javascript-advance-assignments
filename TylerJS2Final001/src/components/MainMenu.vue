<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <div class="container">
      <ul class="navbar-nav me-auto mt-2 mt-lg-0">
        <li v-if="!loginStatus.isLogin" class="nav-item">
          <router-link class="nav-link" to="/">Login</router-link>
        </li>
        <li v-if="loginStatus.role == 'teacher'" class="nav-item">
          <router-link class="nav-link" to="/teacher">Teacher</router-link>
        </li>
        <li v-if="loginStatus.role == 'student'" class="nav-item">
          <router-link class="nav-link" to="/student">Student</router-link>
        </li>
        <li v-if="loginStatus.isLogin" class="nav-item" @click="logout">
          <router-link class="nav-link" to="/signout">Signout</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MainMenu',
  components: {
  },
  props: {
    loginStatus: Object,
  },
  data() {
    return {
    }
  },
  methods: {
    logout() {
      this.loginStatus.isLogin = false
      this.loginStatus.role = ''
      this.delSessionStorage()
      // emit event to parent component
      this.$emit('login', this.loginStatus)
    },
    // del session storage
    delSessionStorage() {
      sessionStorage.removeItem('loginStatus')
      sessionStorage.removeItem('user')
    }
  },
}
</script>
