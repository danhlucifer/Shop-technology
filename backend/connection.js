require('dotenv').config();
const mongoose = require('mongoose');

const connectionStr = "mongodb+srv://ShopStore:nodejs@cluster0.gd10ryv.mongodb.net/test";

mongoose.connect(connectionStr, {useNewUrlparser: true})
.then(()=> console.log('Connected to MongoDB'))
.catch(err => console.log(err))

mongoose.connection.on('error', err =>{
    console.log(err);
})