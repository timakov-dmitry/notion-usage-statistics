<template>
    <div>
        <h1>Статистика использования блоков</h1>
        <p>Количество элементов: <strong>{{ count }}</strong> блоков</p>
    </div>
</template>

<script>
    const axios = require('axios').default;

    export default {
        name: "statistics",

        data: () => ({
            count: 0
        }),
        async created() {
            const response = await axios.get('http://127.0.0.1:3000/statistics');
            this.count = response.data.length;
        }
    }
</script>

<style scoped>

</style>
