<template>
  <header>
    <MainMenu :loginStatus="loginStatus" @login="login" />
  </header>

  <main>
    <router-view :loginStatus="loginStatus" :students="students" :teachers="teachers" :marks="marks" @login="login"
      :user="user" :mark="mark" :teacher4student="teacher4student" :students4teacher="students4teacher" />
  </main>
</template>

<script>
import JsonServices from './services/JsonServices.js'
import MainMenu from './components/MainMenu.vue'
import cryptojs from 'crypto-js';

export default {
  name: 'App',
  components: {
    MainMenu
  },
  data() {
    return {
      students: new Map(),
      teachers: new Map(),
      marks: new Array(),
      loginStatus: {
        isLogin: false,
        role: '',
      },
      user: new Map(),
      mark: Object,
      teacher4student: Object,
      students4teacher: new Array(),
    }
  },
  methods: {
    loadStudents() {
      JsonServices.getStudentsData()
        .then(req => {
          req.data.forEach(student => {
            this.students.set(student.email, student)
          })
        })
    },
    loadTeachers() {
      JsonServices.getTeachersData()
        .then(req => {
          req.data.forEach(teacher => {
            this.teachers.set(teacher.email, teacher)
          })
        })
    },
    loadMarks() {
      JsonServices.getMarksData()
        .then(req => {
          this.marks = req.data
        })
    },
    login(loginStatus, user) {
      this.loginStatus = loginStatus
      this.user = user
      console.log(this.loginStatus)
      if (this.loginStatus.isLogin) {
        // save to sesstion
        this.saveToSessionStorage()
        if (this.loginStatus.role === 'teacher') {
          this.getStudents()
          this.$router.push('/teacher')
        } else if (this.loginStatus.role === 'student') {
          this.getTeacherInfo()
          this.getStudentMark()
          this.$router.push('/student')
        }
      } else {
        this.$router.push('/')
      }
    },
    // save to session storage
    saveToSessionStorage() {
      sessionStorage.setItem('loginStatus', JSON.stringify(this.loginStatus))
      // encrypt user password
      this.user.password = this.encrypt(this.user.password)
      sessionStorage.setItem('user', JSON.stringify(this.user))
    },
    encrypt(password) {
      return cryptojs.AES.encrypt(password, "secret key").toString();
    },
    decrypt(password) {
      return cryptojs.AES.decrypt(password, "secret key").toString(cryptojs.enc.Utf8);
    },
    // get teacher info
    getTeacherInfo() {
      this.teachers.forEach(teacher => {
        if (teacher.tid === this.user.tid) {
          this.teacher4student = teacher
          return false
        }
      })
    },
    // get students for teacher
    getStudents() {
      this.students.forEach(student => {
        if (student.tid === this.user.tid) {
          this.students4teacher.push(student)
        }
      })
    },
    // get student mark
    getStudentMark() {
      this.marks.forEach(mark => {
        if (mark.sid === this.user.sid) {
          this.mark = mark
          console.log(this.mark)
          return false
        }
      })
    },
    // check session storage if login
    checkSessionStorage() {
      console.log("check session storage")
      if (sessionStorage.getItem('loginStatus')) {
        this.loginStatus = JSON.parse(sessionStorage.getItem('loginStatus'))
        this.user = JSON.parse(sessionStorage.getItem('user'))
        console.log(this.user)
        // decrypt user password
        this.user.password = this.decrypt(this.user.password)
        // check user
        this.loginCheck()
        console.log(this.loginStatus)
        if (this.loginStatus.isLogin) {
          this.login(this.loginStatus, this.user)
        } else {
          this.$router.push('/')
        }
      }
    },
    loginCheck() {
      console.log("login check")
      if (this.loginStatus.role === 'teacher') {
        if (this.teachers.has(this.user.email)) {
          if (this.teachers.get(this.user.email).password === this.user.password) {
            this.loginStatus.isLogin = true
            this.loginStatus.role = 'teacher'
          } else {
            this.loginStatus.isLogin = false
            this.loginStatus.role = ''
            alert('Wrong password')
          }
        } else {
          this.loginStatus.isLogin = false
          this.loginStatus.role = ''
          alert('Invalid email')
        }
      } else if (this.loginStatus.role === 'student') {
        if (this.students.has(this.email)) {
          if (this.students.get(this.email).password === this.password) {
            this.loginStatus.isLogin = true
            this.loginStatus.role = 'student'
          } else {
            this.loginStatus.isLogin = false
            this.loginStatus.role = ''
            alert('Wrong password')
          }
        } else {
          this.loginStatus.isLogin = false
          this.loginStatus.role = ''
          alert('Invalid email')
        }
      }
    }
  },
  mounted() {
    this.loadStudents()
    this.loadTeachers()
    this.loadMarks()
    // sleep 1s
    this.checkSessionStorage()
  }
}
</script>
