const mongoose = require('mongoose');

// const CService = require('../services/user.services');
const ChatModel = require('../models/chatmessages.model');

const ChatService = {
    async createChat({ conversation_id, user_id, friend_id, message }){

        const Chatdata = await ChatModel.create({
            conversation_id: conversation_id,
            user_id: user_id,
            friend_id: friend_id,
            message: message
        });
        console.log("CHATDATa", Chatdata);
        return Chatdata;
    },

    async deleteChat(id){
        const deletedData = await ChatModel.updateOne(
            { _id: id },
            { $set: { is_deleted: true }},
            { new: true }

        );
        return deletedData;
    },
    async listChat(){

    }
};
module.exports = ChatService;