<template>
    <div>
        <h1>Block usage statistics</h1>
        <p>Amount of created pages: <strong>{{ count }}</strong></p>
        <p>Amount of created text blocks: <strong>{{ elements }}</strong></p>
        <p>Volume: <strong>{{ volume }}</strong> Mb</p>
    </div>
</template>

<script>
const { getStatisticsData } = require('../store')

export default {
  name: 'statistics',

  data: () => ({
    count: 0,
    volume: 0,
    elements: 0
  }),

  async created () {
    const { count, volume, elements } = await getStatisticsData()
    this.count = count
    this.volume = volume
    this.elements = elements
  }
}
</script>

<style scoped>
h1 {
    color: #111;
    font-family: 'Open Sans Condensed',
    sans-serif;
    font-size: 25px;
    font-weight: 500;
    line-height: 48px;
    margin: 0 0 20px;
    padding: 0 30px;
    text-transform: uppercase;
}

p {
    color: #111;
    font-family: 'Open Sans Condensed',
    sans-serif;
    font-size: 15px;
    font-weight: 500;
    line-height: 10px;
    margin: 0 0 20px;
    padding: 0 30px;
}
</style>
