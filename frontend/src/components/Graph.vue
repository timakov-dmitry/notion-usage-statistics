<template>
    <div>
        <plotly :data="blocksCountGraph.data"
                :layout="blocksCountGraph.layout"
                :display-mode-bar="false"
                :scrollZoom="true"
        ></plotly>
        <plotly :data="volumeGraph.data"
                :layout="volumeGraph.layout"
                :display-mode-bar="false"
                :scrollZoom="true"
        ></plotly>
    </div>
</template>

<script>
const { Plotly } = require('vue-plotly')
const { getGraphsData } = require('../store')

export default {
  components: {
    Plotly
  },

  name: 'graph',

  data: () => ({
    blocksCountGraph: {
      layout: {
        title: 'NUMBER OF CREATED BLOCKS',
        font_size: 100
      },
      data: [],
      style: {
        type: 'scatter',
        fill: 'tonexty',
        fillcolor: '#ff9933'
      }
    },

    volumeGraph: {
      layout: {
        title: 'DOWNLOADED DATA VOLUME'
      },
      data: [],
      style: {
        type: 'scatter',
        fillcolor: '#99cc00',
        fill: 'tonexty'
      }
    }
  }),

  methods: {
    appendStyles (graph, style) {
      return graph.map((item) => ({ ...item, ...style }))
    }
  },

  async created () {
    const { blocksCountGraph, volumeGraph } = await getGraphsData()
    this.blocksCountGraph.data = this.appendStyles(blocksCountGraph, this.blocksCountGraph.style)
    this.volumeGraph.data = this.appendStyles(volumeGraph, this.volumeGraph.style)
  }
}
</script>

<style scoped>

h2 {
    color: #111;
    font-family: 'Open Sans Condensed',
    sans-serif;
    font-size: 25px;
    font-weight: 500;
    line-height: 30px;
    margin: 0 0 20px;
    padding: 0 30px;
    text-align: center;
    text-transform: uppercase;
}
</style>
