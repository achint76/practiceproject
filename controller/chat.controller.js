const ChatService = require('../services/chat.services');
const conversationService = require('../services/')
const ChatController = {
    async startConversation(req, res){
        try{
            const { user_id, friend_id } = req.body;
            const isANewConversation = await ChatService.findConversation(user_id, friend_id);
            if(isANewConversation){
                const createConversation = await ChatService.createConversation(user_id, friend_id);
                if(!createConversation){
                    res.status(500).json({
                        success: false,
                        message: 'Conversation not created',
                        error: error.message
                    })
                }

                const createChat = await ChatService.createChat({
                    conversation_id: req.body.conversation_id,
                    user_id: req.body.user_id,
                    friend_id: req.body.friend_id,
                    message: req.body.message

                })
            }
            res.status(200).json({
                success: true,
                message: 'Conversation started',
                user: data
            })
        }catch(error){
            console.error("Getting error in starting Conversation:", error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },

    async startChat(req, res){

    },
    async deleteChat(req, res){

    },
    async listChat(req, res){

    }
};
module.exports = ChatController;  