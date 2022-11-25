<template>
  <h1>Student</h1>
  <ul>
    <!-- student info -->
    <li>Name: {{ user.first_name }} {{ user.last_name }}</li>
    <li>Email: {{ user.email }}</li>
    <li>Phone: {{ user.phone }}</li>
    <li>Gender: {{ user.gender }}</li>
    <li>Teacher: {{ teacher4student.first_name }} {{ teacher4student.last_name }}</li>

    <!-- student marks -->
    <StudentTableCompo :headers="headers" :mark_data="mark_data" :loginStatus="loginStatus" />

  </ul>
</template>

<script>
import StudentTableCompo from './StudenttableCompo.vue';

export default {
  name: 'StudentPage',
  components: {
    StudentTableCompo
  },
  props: {
    loginStatus: Object,
    user: Object,
    teacher4student: Object,
    mark: Object,
  },
  data() {
    return {
      // get key from mark
      headers: Object,
      // get value from mark
      mark_data: Object,
    }
  },
  methods: {
    // create headers
    createHeaders() {
      console.log('createHeaders')
      // get key from mark
      this.headers = Object.keys(this.mark);
      // drop some keys(sid)
      this.headers.splice(0, 1);
    },
    // create mark data
    createMarkData() {
      console.log('createMarkData');
      // get value from mark
      this.mark_data = Object.values(this.mark);
      // drop some values(sid)
      this.mark_data.splice(0, 1);
    },
  },
  mounted() {
    console.log(this.mark);
    this.createHeaders();
    this.createMarkData();
  }
}
</script>
