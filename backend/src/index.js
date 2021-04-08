const express = require('express')
const cors = require('cors')
const path = require('path')
const config = require('../../config')
const fileUpload = require('express-fileupload')
const app = express()
const routes = require('./routes')
console.log(path.join(__dirname, '../..' ,'frontend/dist')); 
app.use(cors())
app.use(fileUpload({ createParentPath: true }))
app.use(express.static(path.join(__dirname, '../..' ,'frontend/dist')))
app.use('/statistics', routes)

app.listen(config.BACKEND_PORT, () => console.log(`Notion report server app listening at http://localhost:${config.BACKEND_PORT}`) )
