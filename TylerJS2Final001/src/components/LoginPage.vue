<template>
  <h1>Login</h1>
  <form>
    <!-- select box for role -->
    <div class="form-group">
      <label for="role">Role</label>
      <select class="form-control" id="role" v-model="role">
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
      </select>
    </div>
    <label for="email">Email</label>
    <input type="text" id="email" v-model="email" />
    <label for="password">Password</label>
    <input type="password" id="password" v-model="password" />
    <button type="submit" @click.prevent="login">Login</button>
  </form>
</template>

<script>
export default {
  name: 'LoginPage',
  components: {
  },
  props: {
    loginStatus: Object,
    students: Map,
    teachers: Map,
  },
  data() {
    return {
      email: '',
      password: '',
      role: '',
    }
  },
  methods: {
    login() {
      if (this.role === 'teacher') {
        // cbonett0@bloglovin.com
        // 4AtxB91hZnTM
        this.email = 'cbonett0@bloglovin.com'
        this.password = '4AtxB91hZnTM'
        if (this.teachers.has(this.email)) {
          if (this.teachers.get(this.email).password === this.password) {
            this.loginStatus.isLogin = true
            this.loginStatus.role = 'teacher'
            // emit event to parent component
            this.$emit('login', this.loginStatus, this.teachers.get(this.email))
          } else {
            alert('Wrong password')
          }
        } else {
          alert('Invalid email')
        }
      } else if (this.role === 'student') {
        // awaren0@exblog.jp
        // Ze1kTEInQO
        this.email = 'awaren0@exblog.jp'
        this.password = 'Ze1kTEInQO'
        if (this.students.has(this.email)) {
          if (this.students.get(this.email).password === this.password) {
            this.loginStatus.isLogin = true
            this.loginStatus.role = 'student'
            // emit event to parent component
            this.$emit('login', this.loginStatus, this.students.get(this.email))
          } else {
            alert('Wrong password')
          }
        } else {
          alert('Invalid email')
        }
      }
    }
  }
}
</script>
