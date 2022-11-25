<template>
  <h1>Teacher</h1>
  <ul>
    <li>Name: {{ user.first_name }} {{ user.last_name }}</li>
    <li>Email: {{ user.email }}</li>
    <li>Phone: {{ user.phone }}</li>
  </ul>
  <TableCompo :headers="headers" :data="data" :stuHeaders="stuHeaders" />
</template>

<script>
import TableCompo from './TableCompo.vue';

export default {
  name: 'TeacherPage',
  components: {
    TableCompo
  },
  props: {
    loginStatus: Object,
    user: Object,
    students4teacher: Array,
    marks: Array,
  },
  data() {
    return {
      headers: ['Student#', 'Name', 'Email', 'Phone', 'Course Mark', 'Overall Grade'],
      data: [],
      course_marks: Object,
      overall_grade: 0,
      stuHeaders: [],
    }
  },
  methods: {
    // create data
    createData() {
      this.students4teacher.forEach((student, index) => {
        this.getStudentMark(student);
        this.getOverallGrade(this.course_marks);
        this.data.push([student.sid, student.first_name + ' ' + student.last_name, student.email, student.phone, this.course_marks, this.overall_grade]);
      });
      this.createStuHeaders();
    },
    // get student mark
    getStudentMark(student) {
      this.marks.forEach(mark => {
        if (mark.sid === student.sid) {
          // del sid from mark
          delete mark.sid;
          this.course_marks = mark;
          return false;
        }
      });
    },
    // create header for student mark
    createStuHeaders() {
      this.stuHeaders = Object.keys(this.course_marks);
    },
    // get overall grade
    getOverallGrade(course_marks) {
      // obj to array
      let marks = Object.values(course_marks);
      let sum = 0;
      marks.forEach(mark => {
        sum += mark;
      });
      this.overall_grade = Math.round((sum / marks.length) * 100) / 100;
    },
  },
  mounted() {
    this.createData();
  }
}
</script>
