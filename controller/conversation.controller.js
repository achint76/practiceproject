const ConversationService = require('../services/conservation.service');
const ChatService = require('../services/chat.services');
const ConversationController = {
    
    async createConversation(req, res) {
        try {
            const { user_ids, message } = req.body;
            if(!user_ids || user_ids.length !== 2 ){
                throw new Error("Invalid user ids provided!");
            }
            console.log("1stCheck", user_ids);
            //first check if conversation already exists
            const conversation = await ConversationService.findConversation({
                user_ids
            })
            console.log("CON EXIST OR NOT", conversation);
            //if conversation doesn't exists create a new one
            if(!conversation){
                const newConversation = await ConversationService.createConversation({
                    user_ids, message
                })
                console.log("CON DON't EXISTS", newConversation);
                //create chat message for newly created conversation
                const chatData = await ChatService.createChat({
                    conversation_id: newConversation._id,
                    user_id: user_ids[0],
                    friend_id: user_ids[1],
                    message
                })
                console.log("CHat for newconv", chatData);
                res.status(200).json({
                    success: true,
                    data: chatData
                })
            }else{
                //if conversation already exists, add a new chat message to it
                const Chatdata = await ChatService.createChat({
                    conversation_id: conversation._id,
                    user_id: user_ids[0],
                    friend_id: user_ids[1],
                    message
                });
                console.log("IF IT CONV EXIST", Chatdata);

                res.status(200).json({
                    success: true,
                    data: Chatdata
                });

            }
        }catch(error){
            console.error("Error in creating conversation:", error);
            res.status(500).json({
                success: false,
                message: 'Getting error in creating conversation',
                error: error.message
            })
        }
    },

    async listingConversation(req, res){
        try{
            res.status(200).json({
                success: true,
                message: 'Listing successful',
                data
            })
        }catch(error){
            console.error("GEtting error in listing:", error);
            res.status(500).json({
                success: false,
                message: 'error in listing conversation',
                error: error.message
            });
        }
    }




    
};
module.exports = ConversationController;