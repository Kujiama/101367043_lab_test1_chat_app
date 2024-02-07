const express = require('express');
const route = express.Router();
const GroupMsg = require('../models/GroupMsgModel');


// Get all messages from room
// localhost:3001/v1/room/:room/messages
route.get('/:room/messages', async (req, res) => {
    try {
        const messages = await GroupMsg.find({to_room: req.params.room});
        res.json(messages);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Send message to room
// localhost:3001/v1/room/:room/send
route.post('/:room/send', async (req, res) => {
    const message = new GroupMsg({
        from_user: req.body.from_user,
        to_room: req.params.room,
        message: req.body.message
    });
    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// delete message from room
// localhost:3001/v1/room/:room/delete/:id
route.delete('/:room/delete/:id', async (req, res) => {
    try {
        const message = await GroupMsg.findById(req.params.id);
        if (message.to_room === req.params.room) {
            await message.remove();
            res.json({message: 'Message deleted'});
        } else {
            res.status(400).json({message: 'Message not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = route;