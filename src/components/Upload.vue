<template>
    <div>
        <label>Archive
            <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
        </label>
        <button @click="submitFile()" class="btn btn-primary">Отправить</button>
    </div>
</template>

<script>
    const axios = require('axios').default;

    export default {
        name: "Upload",
        data: () => {

        },
        methods: {
            async submitFile() {
                let formData = new FormData();
                formData.append('file', this.file);
                await axios.post('http://127.0.0.1:3000/statistics', formData);
                console.log('SUCCESS!!');
            },
            handleFileUpload() {
                this.file = this.$refs.file.files[0];
            }
        }
    }
</script>

<style scoped>

</style>
