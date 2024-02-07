// Private Message Schema
const mongoose = require('mongoose');

const PrivateMsgSchema = new mongoose.Schema({
    from_user: {
        type: String,
        required: [true, 'Sender is required']
    },
    to_user: {
        type: String,
        required: [true, 'Receiver is required']
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

module.exports = mongoose.model('Private', PrivateMsgSchema);
