const express = require('express');

//const dotenv = require('dotenv');
//const mongoose = require('mongoose');
//const cookieParser = require('cookie-parser');
//const verifyToken = require('./routes/verifyToken')

const app = express();

/*
dotenv.config();
mongoose.connect(
    process.env.DB_CONNECT,
    () =>{
    console.log('connected to the database');
});

process.env.TOKEN_SECRET;
*/

app.set('view engine', 'ejs' );
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//cookies
//app.use(cookieParser());
//tokens
//app.use(verifyToken.verifyToken);

//import Routes
//const authRoutes = require('./routes/authroutes');
const getRoutes = require('./routes/getroutes');
//const postRoutes = require('./routes/postroutes');

//Route middlewars
//app.use('/', authRoutes);
app.use('/', getRoutes);
//app.use('/', postRoutes);

app.listen(8080, () => {
    console.log('running!');
});