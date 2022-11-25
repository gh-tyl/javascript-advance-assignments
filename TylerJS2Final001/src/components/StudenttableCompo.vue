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
        <tr>
          <td v-for="data in mark_data" :key="data">{{ data }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
export default {
  name: 'StudentTableCompo',
  components: {
  },
  props: {
    loginStatus: Object,
    headers: Object,
    mark_data: Object,
  },
  data() {
    return {
    }
  },
  methods: {

  },
  mounted() {
  }
}
</script>
