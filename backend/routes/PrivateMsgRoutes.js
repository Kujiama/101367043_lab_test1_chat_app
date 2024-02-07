const express = require('express');
const route = express.Router();
const PrivateMsg = require('../models/PrivateMsgModel');

// Get all messages with user in chat with
// localhost:3001/v1/private/:from_user/messages/:to_user
// we are going to use id instead of username
// this is goin to work vice versa whne socket is implemented
route.get('/:from_user/messages/:to_user', async (req, res) => {
    try {
        const messages = await PrivateMsg.find({from_user: req.params.from_user, to_user: req.params.to_user});
        res.json(messages);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});



// Send message to user
// localhost:3001/v1/private/:from_user/send/:to_user
route.post('/:from_user/send/:to_user', async (req, res) => {
    const message = new PrivateMsg({
        from_user: req.params.from_user,
        to_user: req.params.to_user,
        message: req.body.message
    });

    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = route;



