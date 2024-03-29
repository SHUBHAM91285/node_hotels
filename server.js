const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();
const passport = require('./auth')

const bodyParser = require('body-parser');
app.use(bodyParser.json());//it stores the data in req.body, the data which is send by postman
const PORT = process.env.PORT || 3000;

const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toString()}] Request Made to : ${req.originalUrl}`)
    next();
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session: false})
app.get('/',function (req, res) {
    res.send('Welcome to our Hotel.')
})

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//app.use('/person',localAuthMiddleware,personRoutes);
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);

app.listen(PORT,()=>{
    console.log("Server is running on port: 3000");
})