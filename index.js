require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const url = process.env.URL || "http://localhost";
app.use(express.json());
const userRoute = require('./router/user.router');

const connect = async() => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongodb");
    }catch(error){
        throw error;
    }
}



app.use('/user', userRoute);

app.listen(port, () => {
    connect();
    console.log(` Server listening at ${url}:${port}`);
})