const express = require('express');
const mongoose = require('mongoose')


const app = express()

require('dotenv').config()


const PORT = process.env.NODE_ENV || 3200

mongoose.connect(process.env.MONGO_URI_PROD);
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'))
db.on('open',()=>{
    console.log('DB Connected successfully');
})

app.use(express.urlencoded({extended:true}))


app.listen(PORT,()=>{
    console.log('Served::::::::.....');
})