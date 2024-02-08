const ConversationService = require('../services/conservation.service');
const ChatService = require('../services/chat.services');
const ConversationController = {
    // async createConversation(req, res){
    //     const { user_id, friend_id } = req.body;
    //     if(!user_id || !friend_id){
    //         throw new Error('Both user_id and friend_id are required');
    //     }
    //     const payload = {};
    //     payload.user_id = user_id;
    //     payload.friend_id = friend_id;
    //     console.log(payload,"PAYLOAD");
    //     const checkConversation = await ConversationService.createConversation(payload);
    //     if(!checkConversation){
    //         res.status(500).json({
    //             success: false,
    //             message: 'Getting error in checking Conversation',
    //             error: error.message
    //         })
    //     }
    //     res.status(200).json({
    //         success: true,
    //         message: 'conversation made or already exists',
    //         user: checkConversation
    //     })
    // }
    async createConversation(req, res) {
        try {
            console.log("REQBODY", req.body.user_ids[0]);
            const conversation = await ConversationService.findConversation({
                friend_id: req.body.user_ids[0],
                user_id: req.body.user_ids[1]
            });
            if (!conversation || conversation == null) {
                
                const createConv = await ConversationService.createConversation({
                    user_id: req.body.user_id,
                    friend_id: req.body.friend_id,
                    message: req.body.message
                });
                const payload = {};
                payload.conversation_id = createConv._id;
                payload.user_id = user_id,
                payload.friend_id = friend_id,
                payload.message = message
                // const chatdata = await ChatService.createChat({
                //     conversation_id: req.body.conversation_id,
                //     user_id: req.body.user_id,
                //     friend_id: req.body.friend_id,
                //     message: req.body.message
                // });
                const chatdata = await ChatService.createChat(payload);
                res.status(200).json({
                    success: true,
                    data: chatdata
                });
            } else {
                // const newChatdata = await ConversationService.createChat({
                //     conversation_id: req.body.conversation_id,
                //     user_id: req.body.user_id,
                //     friend_id: req.body.friend_id,
                //     message: req.body.message
                // })
                const payload = {};
                payload.conversation_id = conversation_id;
                payload.user_id = user_id,
                payload.friend_id = friend_id,
                payload.message = message
                const newChatdata = await ChatService.createChat(payload);
                res.status(200).json({
                    success: true,
                    data: newChatdata
                })
            }
        }

        catch (error) {
            console.error("Getting error in creating conversation:", error);
            res.status(500).json({
                success: false,
                message: 'Getting error in creating  conversation',
                error: error.message
            })
        }
    }
};
module.exports = ConversationController;