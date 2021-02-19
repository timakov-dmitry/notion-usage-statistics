<template>
    <div>
        <h1>Download archive</h1>
        <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
        <button @click="submitFile()" class="btn btn-primary">Send</button>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>

</template>

<script>
    const axios = require('axios').default;

    export default {
        
        name: "Upload",
        data: () => ({
        snackbar: false,
        text: '',
        timeout: 2000,
        }),
        methods: {
            async submitFile() {
                let formData = new FormData();
                formData.append('file', this.file);
                try {
                    const res = await axios.post('http://127.0.0.1:3000/statistics', formData);
                    if (res.status == 200){
                        this.snackbar = true;
                        this.text = res.data.message
                        console.log(res.data.message)
                    }
                    else{
                        this.snackbar = true;
                        this.text = 'An error occurred while uploading the file'
                    }
                       
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
    font-size: 15px; 
    font-weight: 500; 
    line-height: 30px; 
    margin: 0 0 20px; 
    padding: 0 30px; 
    text-transform: uppercase;
    } 
    button.btn:active { background: rgb(70, 138, 83); }

    h1 { color: #111; 
    font-family: 'Open Sans Condensed', 
    sans-serif; 
    font-size: 25px; 
    font-weight: 500; 
    line-height: 48px; 
    margin: 0 0 20px; 
    padding: 0 30px; 
    text-transform: uppercase; }
  
    input {
      color: #111; 
      font-family: 'Open Sans Condensed', 
      sans-serif; 
      font-size: 15px; 
      font-weight: 500; 
      line-height: 20px; 
      margin: 0 0 20px; 
      padding: 0 30px; 
      
    }

</style>
