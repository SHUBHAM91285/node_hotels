const express = require('express')
const app = express()
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());//it stores the data in req.body, the data which is send by postman

app.get('/', function (req, res) {
    res.send('Welcome to our Hotel.')
})

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);

app.listen(3000,()=>{
    console.log("Server is running on port: 3000");
})