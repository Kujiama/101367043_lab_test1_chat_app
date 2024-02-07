// User Routes
const express = require('express');
const route = express.Router();
const User = require('../models/UserModel');

// Get all users
// localhost:3001/v1/user/all
route.get('/all', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Get user by id
// localhost:3001/v1/user/:id
route.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Create user
// localhost:3001/v1/user/new
route.post('/new', async (req, res) => {
    const user = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});


// Update user
// localhost:3001/v1/user/update/:id
route.patch('/update/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.username = req.body.username;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.password = req.body.password;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Delete user
// localhost:3001/v1/user/delete/:id
route.delete('/delete/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await user.remove();
        res.json({message: 'User deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = route;
