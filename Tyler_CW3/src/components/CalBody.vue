<script setup>
</script>

<template>
    <div class="display">
        <div class="from unit-set">
            <input type="number" v-model="from_num">
            <select v-model="from_unit">
                <option v-for="value, unit in units" :key="unit" :value="unit">{{ unit }}</option>
            </select>
        </div>
        <div class="to unit-set">
            <!-- <input type="number" v-model="to_num"> -->
            <p>{{ to_num }}</p>
            <select v-model="to_unit">
                <option v-for="value, unit in units" :key="unit" :value="unit">{{ unit }}</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CalBody',
    data() {
        return {
            units: {
                'Nanometers': 1,
                'Microns': 1000,
                'Millimeters': 1000000,
                'Centimeters': 10000000,
                'Meters': 1000000000,
                'Kilometers': 1000000000000,
                'Inches': 25400000,
                'Feet': 304800000,
                'Yards': 914400000,
                'Miles': 1609344000000,
                'Nautical Miles': 1852000000000
            },
            from_num: 0,
            from_unit: 'Nanometers',
            to_num: 0,
            to_unit: 'Nanometers'
        }
    },
    computed: {
        to_num: function () {
            return this.from_num * this.units[this.from_unit] / this.units[this.to_unit];
        }
    }
}
</script>

<style scoped>
.unit-set {
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: space-between;
}

input,
select {
    border: 0px;
    border-radius: 3px;
}
</style>
