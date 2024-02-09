const mongoose = require('mongoose');
const ChatSchema = mongoose.Schema({
    conversation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'conversation',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    friend_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    message: {
        type: String,
        
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);
const ChatModel = mongoose.model("chatmessage", ChatSchema);

module.exports = ChatModel;