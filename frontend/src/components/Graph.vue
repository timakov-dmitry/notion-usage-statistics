<template>
    <div>
        <plotly :data="pageCountGraph.data"
                :layout="pageCountGraph.layout"
                :display-mode-bar="false"
                :scrollZoom="true"
        ></plotly>
        <plotly :data="volumeGraph.data"
                :layout="volumeGraph.layout"
                :display-mode-bar="false"
                :scrollZoom="true"
        ></plotly>
        <plotly :data="elementsCountGraph.data"
                :layout="elementsCountGraph.layout"
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

    elementsCountGraph: {
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

    pageCountGraph: {
      layout: {
        title: 'NUMBER OF PAGES',
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
        title: 'DOWNLOADED DATA VOLUME (Mb)'
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
      return graph.map( item => ({ ...item, ...style }))
    }
  },

  async created () {
    const { pageCountGraph, volumeGraph, elementsCountGraph } = await getGraphsData()
    console.log(pageCountGraph, volumeGraph, elementsCountGraph);
    this.pageCountGraph.data = this.appendStyles(pageCountGraph, this.pageCountGraph.style)
    this.volumeGraph.data = this.appendStyles(volumeGraph, this.volumeGraph.style)
    this.elementsCountGraph.data = this.appendStyles(elementsCountGraph, this.elementsCountGraph.style)
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
