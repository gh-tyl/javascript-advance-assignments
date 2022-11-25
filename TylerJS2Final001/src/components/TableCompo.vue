<template>
  <div class="table-responsive">
    <table class="table table-dark">
      <thead>
        <!-- print header from headers -->
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <!-- print data from mark -->
        <tr v-for="stu in data" :key="stu">
          <td>{{ stu[0] }}</td>
          <td>{{ stu[1] }}</td>
          <td>{{ stu[2] }}</td>
          <td>{{ stu[3] }}</td>
          <td>
            <StudentTableCompo :headers="stuHeaders" :mark_data="createMarkData(stu[4])" />
          </td>
          <td>{{ stu[5] }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <!-- highestStudentName -->
          <td colspan="1">Highest Student</td>
          <td colspan="2">{{ highestStudentName }}</td>
          <!-- lowestStudentName -->
          <td colspan="1">Lowest Student</td>
          <td colspan="2">{{ lowestStudentName }}</td>
        </tr>
        <!-- avg -->
        <tr>
          <td colspan="2">Average</td>
          <td colspan="2">{{ studentAverage }}</td>
        </tr>
      </tfoot>
    </table>
  </div>

</template>

<script>
import StudentTableCompo from './StudenttableCompo.vue';

export default {
  name: 'TableCompo',
  components: {
    StudentTableCompo
  },
  props: {
    loginStatus: Object,
    headers: Object,
    data: Array,
    stuHeaders: Object,
  },
  data() {
    return {
      highestStudentName: '',
      lowestStudentName: '',
      studentAverage: 0,
    }
  },
  methods: {
    // create mark data
    createMarkData(mark) {
      // get value from mark
      let mark_data = Object.values(mark);
      return mark_data;
    },
    calAvg() {
      let sum = 0;
      let count = 0;
      for (let i = 0; i < this.data.length; i++) {
        sum += this.data[i][5];
        count++;
      }
      this.studentAverage = (sum / count).toFixed(2);
    },
    calHighestStudent() {
      let highest = 0;
      let highestStudentName = '';
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i][5] > highest) {
          highest = this.data[i][5];
          highestStudentName = this.data[i][1] + ' ' + this.data[i][2];
        }
      }
      this.highestStudentName = highestStudentName;
    },
    calLowestStudent() {
      let lowest = 100;
      let lowestStudentName = '';
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i][5] < lowest) {
          lowest = this.data[i][5];
          lowestStudentName = this.data[i][1] + ' ' + this.data[i][2];
        }
      }
      this.lowestStudentName = lowestStudentName;
    },
  },
  mounted() {
    this.calAvg();
    this.calHighestStudent();
    this.calLowestStudent();
  }
}
</script>
