const mongoose = require('mongoose');
const ConversationModel = require('../models/conversation.model');
const ChatService = require('../services/chat.services');
const ConversationService = {
    async findConversation({ user_ids }) {
        console.log("USERI(DS", user_ids);
        
        const isavl = await ConversationModel.findOne({ user_ids}).exec();
        console.log(isavl,"ISAVL");
        return isavl;
    },

    async createConversation({ user_ids, message}) {
       
        try{
            const convData = await ConversationModel.create({
                user_ids: user_ids, message
            })
            console.log("CONVDATA", convData);
            return convData;
        }catch(error){
            throw error;
        }
    }

};
module.exports = ConversationService;