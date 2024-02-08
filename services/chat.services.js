const mongoose = require('mongoose');

// const CService = require('../services/user.services');
const ChatModel = require('../models/chatmessages.model');

const ChatService = {
    async createChat(payload){
        const Chatdata = await ChatModel.create(payload);
    }
};
module.exports = ChatService;