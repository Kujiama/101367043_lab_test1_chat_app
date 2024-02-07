// User Routes
const express = require('express');
const route = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

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

// Get user by username
// localhost:3001/v1/user/:username
route.get('/:username', async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Create user
// localhost:3001/v1/user/new
route.post('/new', async (req, res) => {

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hashedPassword
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//login user
// localhost:3001/v1/user/login/:username
route.post('/login/:username', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({message: 'Invalid password'});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
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
