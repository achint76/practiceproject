const mongoose = require('mongoose');
const ConversationModel = require('../models/conversation.model');
const ChatService = require('../services/chat.services');
const ConversationService = {
    async findConversation({ friend_id, user_id }) {
        const isavl = await ConversationModel.aggregate([
            {
                $match: {
                    user_ids: { $all: [user_id, friend_id]}
                }
            }
        ])
    },

    async createConversation({ friend_id, user_id, message}) {
        // try {
        //     const existConversation = await this.findConversation();
        //     if (!existConversation) {
        //         const createConv = await ConversationModel.create(payload);
        //         return createConv;
        //     }
        //     const startChat = await ChatService.startChat();
        //     return startChat;
        // } catch (error) {
        //     throw error;
        // }
        try{
            const convData = await ConversationModel.create({
                user_ids: [user_id, friend_id]
            })
            return convData;
        }catch(error){
            throw error;
        }
    }

};
module.exports = ConversationService;