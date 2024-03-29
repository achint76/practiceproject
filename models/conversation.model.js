const mongoose = require('mongoose');
const ConversationSchema = mongoose.Schema({
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'users',
    //     required: true
    // },
    // friend_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'users',
    //     required: true
    // },
    user_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Refers to the User model
        required: true
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});
const ConversationModel = mongoose.model('conversation', ConversationSchema);
module.exports = ConversationModel;
