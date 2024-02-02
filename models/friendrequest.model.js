const mongoose = require('mongoose');
const FriendRequestSchema = mongoose.Schema({
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
    requeststatus: {
        type: String,
        enum: ['accepted', 'declined', 'waiting'],
        default: 'waiting'
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});
const Requestmodel = mongoose.model('friend-request', FriendRequestSchema);
module.exports = RequestModel;