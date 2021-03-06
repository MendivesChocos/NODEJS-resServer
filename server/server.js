require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'))
  
mongoose.connect(process.env.URL_DB, (err, res) => {
    if ( err ) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, ()=> {
    console.log('Escuchando el puerto nodejs ', 3000);
})