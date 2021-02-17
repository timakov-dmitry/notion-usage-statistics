<template>
    <div>
        <h3>Загрузить архив</h3>
        <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
        <button @click="submitFile()" class="btn btn-primary">Отправить</button>
    </div>
</template>

<script>
    const axios = require('axios').default;

    export default {
        name: "Upload",
        data: () => ({}),
        methods: {
            async submitFile() {
                let formData = new FormData();
                formData.append('file', this.file);
                try {
                    const res = await axios.post('http://127.0.0.1:3000/statistics', formData);
                    console.log(res.status);
                } catch (e) {
                    console.error("got err: ", e)
                }
            },
            handleFileUpload() {
                this.file = this.$refs.file.files[0];
            }
        }
    }
</script>

<style scoped>
    button.btn {
    color: #fff;
    user-select: none;
    background: rgb(102, 186, 118);
    padding: .7em 1.5em;
    outline: none;
    } 
    button.btn:active { background: rgb(70, 138, 83); }
</style>
