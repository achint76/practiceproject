const ChatService = require('../services/chat.services');
const conversationService = require('../services/conservation.service')
const ChatController = {
    // async startConversation(req, res){
    //     try{
    //         const { user_id, friend_id } = req.body;
    //         const isANewConversation = await ChatService.findConversation(user_id, friend_id);
    //         if(isANewConversation){
    //             const createConversation = await ChatService.createConversation(user_id, friend_id);
    //             if(!createConversation){
    //                 res.status(500).json({
    //                     success: false,
    //                     message: 'Conversation not created',
    //                     error: error.message
    //                 })
    //             }

    //             const createChat = await ChatService.createChat({
    //                 conversation_id: req.body.conversation_id,
    //                 user_id: req.body.user_id,
    //                 friend_id: req.body.friend_id,
    //                 message: req.body.message

    //             })
    //         }
    //         res.status(200).json({
    //             success: true,
    //             message: 'Conversation started',
    //             user: data
    //         })
    //     }catch(error){
    //         console.error("Getting error in starting Conversation:", error);
    //         res.status(500).json({
    //             success: false,
    //             message: 'Internal Server Error',
    //             error: error.message
    //         })
    //     }
    // },

    async startChat(req, res){
        try{
            // const { conversation_id, user_id, friend_id, message } = req.body;
            // const payload = {};
            // payload.conversation_id = conversation_id;
            // payload.user_id = user_id;
            // payload.friend_id = friend_id;
            // payload.message = message;
            const { conversation_id, user_id, friend_id, message } = req.body;
            const messageData = await ChatService.createChat({ conversation_id, user_id, friend_id, message});
            if(!messageData)
            throw new Error("error in sending messages");

            res.status(200).json({
                success: true,
                message: 'message sent successfully',
                data: messageData
            })
        }catch(error){
            console.error("Error in start chatting", error);
            res.status(500).json({
                success: false,
                message: 'Not able to chat or message',
                error: error.message
            })
        }
    },
    async deleteChat(req, res){
        try{
            if(!req.query._id){
                throw new Error("Need to pass message or chat id to delete!");
            }
            const id = req.query._id;
            const messageDelete = await ChatService.deleteChat(id);

            res.status(200).json({
                success: true,
                message: 'message deletede successfully',
                data: messageDelete
            })
        }catch(error){
            console.error("error in deleting message");
            res.status(500).json({
                success: false,
                message: 'error in deleting chat',
                error: error.message
            })
        }
    },
    async listChat(req, res){
        try{
            
            res.status(200).json({
                success: true,
                message: 'listed messages',
                data
            })
        }catch(error){
            console.error("error in listing messages:", error);
            res.status(500).json({
                success: false,
                message: 'error in listing messages',
                error: error.message
            })
        }
    }
};
module.exports = ChatController;  