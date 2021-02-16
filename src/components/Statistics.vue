<template>
    <div>
        <h1>Статистика использования блоков</h1>
        <p>Количество элементов: <strong>{{ blocksCount }}</strong> блоков</p>
    </div>
</template>

<script>
    export default {
        name: "statistics",
        props: ['blocksCount'],
        data: () => ({
            count: 0,
        }),
    }
</script>

<style scoped>

</style>
