<template>
    <div>
        <h3>Количество созданных блоков</h3>
        <v-sparkline
                :value="countBlocks"
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
        <h3>Объем загруженных данных</h3>
        <v-sparkline
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
            radius: 10,
            padding: 8,
            lineCap: 'round',
            gradient: gradients[5],
            countBlocks: [],
            valueHistory: [],
            gradientDirection: 'top',
            gradients,
            fill: false,
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
            } catch (e) {
                console.error(e)
            }
        }
    }
</script>

<style scoped>

</style>
