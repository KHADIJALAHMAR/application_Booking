const express = require('express');
const app =express();
const path = require('path');

// require controller user
const UserController = require('./controllers/userController');
const UserRoute = require('./routes/routeUser');

// import fil connexion database
require('./config/database');
// 


// template engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// encoded url 

app.use(express.urlencoded({extended: true}));


app.get('/' , (req,res) => {res.render("landing")});

// user routes
app.use(UserRoute);










const Port = process.env. Port || 3000;
app.listen(Port ,() => console.log (`app runnig on ${Port} port`));