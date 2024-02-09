require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3003;
const url = process.env.URL || "http://localhost";

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(express.json());
const userRoute = require('./router/user.router');
const conversationRoute = require('./router/conversation.router');
const chatRoute = require('./router/chat.router');
const connect = async() => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongodb");
        }catch(error){
        throw error;
    }
}



app.use('/user', userRoute);
app.use('/conversation', conversationRoute);
app.use('/chat', chatRoute);
app.listen(port, () => {
    connect();
    console.log(`Server listening at ${url}:${port}`);
})

