const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();
const routes = require('./routes');

app.use(cors());
app.use(fileUpload({createParentPath: true}));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use('/statistics', routes);
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});






