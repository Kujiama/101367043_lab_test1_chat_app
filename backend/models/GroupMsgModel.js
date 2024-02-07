// Group Message Schema
const mongoose = require('mongoose');


const GroupMsgSchema = new mongoose.Schema({
    from_user: {
        type: String,
        required: [true, 'Sender is required']
    },
    to_room:{
        type: String,
        required: [true, 'Room is required']
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    },
    sentOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Group', GroupMsgSchema);