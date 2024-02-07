const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

//.env file access
require('dotenv').config();

const app = express(); // create an express app
const server = http.createServer(app); // create a http server on express app
const chatApp = socketIO(server); // create a socket.io server on localhost:3002


app.use(express.json()); // parse json data


// connect to mongoDB
const mongoose = require('mongoose');


const SERVERPORT = 3001;

// ============ MongoDB connection ============
// Connect to MongoDB
const DB_HOST = "cluster0.ehf8jjp.mongodb.net";
const DB_USER = 'prickedneedle11';
const DB_PASSWORD = 'yUgwTaE0KNo4QLz9';
const DB_NAME = 'w2024_3133_labtest1';
const DB_CONN = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then( (success) => {
  console.log('Success Mongodb connection')
}).catch( (error) => {
  console.log('Error Mongodb connection')
});


// ============ Routes ============
// trying this method to store routes in a object
const routes = {
  user: require('./routes/UserRoutes'),
  privateMsg: require('./routes/PrivateMsgRoutes'),
  groupMsg: require('./routes/GroupMsgRoutes')
};

// Routes
app.use('/v1/user', routes.user);
app.use('/v1/private', routes.privateMsg);
app.use('/v1/room', routes.groupMsg);


// ============ Socket.io ============
// Socket.io


app.listen(SERVERPORT, () => { console.log(`Server is running on localhost:${SERVERPORT}`) });


