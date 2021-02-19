<template>
    <div>
        <h2>Number of created blocks</h2>
        <v-sparkline
                :labels="labels"
                :label-size="3"
                :value="countBlocks"
                :gradient="gradient"
                :smooth="radius || false"
                :padding="padding"
                :line-width="width"
                :stroke-linecap="lineCap"
                :gradient-direction="gradientDirection"
                :type="type"
                :auto-line-width="autoLineWidth"
                auto-draw
        >
        </v-sparkline>
        <h2>Downloaded data volume</h2>
        <v-sparkline
                :labels="labels"
                :label-size="3"
                :value="valueHistory"
                :gradient="gradient"
                :smooth="radius || false"
                :padding="padding"
                :line-width="width"
                :stroke-linecap="lineCap"
                :gradient-direction="gradientDirection"
                :fill="fill"
                :type="type"
                :auto-line-width="autoLineWidth"
                auto-draw
        >
        </v-sparkline>
    </div>

</template>

<script>
    import moment from 'moment';
    const axios = require('axios').default;

    const gradients = [
        ['#222'],
        ['#42b3f4'],
        ['red', 'orange', 'yellow'],
        ['purple', 'violet'],
        ['#00c6ff', '#F0F', '#FF0'],
        ['#f72047', '#ffd200', '#1feaea'],
    ]


    export default {
        name: "graph",
        props:['statisticsResult'],
        data: () => ({
            width: 2,
            radius: 4,
            padding: 8,
            smooth:3,
            lineCap: 'round',
            gradient: gradients[5],
            countBlocks: [],
            valueHistory: [],
            labels:[],
            gradientDirection: 'top',
            gradients,
            fill: true,
            type: 'trend',
            autoLineWidth: false,
        }),
        async created() {
            try {
                const request = await axios.get('http://127.0.0.1:3000/statistics');
                let data = request.data;
                data.forEach(record => {
                    record.ts = moment(record.date).unix();
                });
                data = data.sort((a, b) => (a.ts > b.ts) ? 1 : -1);
                console.log(data);
                this.countBlocks = data.map(record => record.count);
                this.valueHistory = data.map(record => record.volume);
                this.labels = data.map(record => moment.unix(record.ts).format("DD.MM")+'\n'+'('+record.count+')');
                console.log(this.labels)
            } catch (e) {
                console.error(e)
            }
        }
    }
</script>

<style scoped>

h2 { color: #111; 
    font-family: 'Open Sans Condensed', 
    sans-serif; 
    font-size: 25px; 
    font-weight: 500; 
    line-height: 48px; 
    margin: 0 0 20px; 
    padding: 0 30px; 
    text-align: center; 
    text-transform: uppercase; }

</style>
