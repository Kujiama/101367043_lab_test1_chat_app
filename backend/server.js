const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors'); // Cross-Origin Resource Sharing

const SERVERPORT = 3001;


//.env file access
require('dotenv').config();

const app = express(); // create an express app
app.use(express.json()); // parse json data

// since we are running the server on a different port from the client, we need to enable cors
app.use(cors({
  origin: ["http://localhost:3001","http://localhost:3002", "http://localhost:3000"], // allow client from localhost:3000
  methods: ["GET", "POST"], // to allow get and post requests
  credentials: true // Allow cookies and HTTP authentication
})); // enable cors


const server = app.listen(SERVERPORT, () => {
  console.log(`Server started at localhost:${SERVERPORT}`);
});


const chatApp = socketIO(server, {
  cors: {
    origin: ["http://localhost:3001","http://localhost:3002", "http://localhost:3000"], // allow client  from localhost:3000
    methods: ["GET", "POST"], // to allow get and post requests
    credentials: true // Allow cookies and HTTP authentication
  } 

}); // create a socket.io server on localhost:3001




// connect to mongoDB
const mongoose = require('mongoose');



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

// ============ Models ============
// Models are used to create a schema for the data that will be stored in the database
// and to be able to store directly to the database
const GroupMsg = require('./models/GroupMsgModel');


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

chatApp.on('connection', (socket) => {


  // console.log('New user connected');

  // join room on the server side when user joins room
  socket.on('join_room', (room) => {
    socket.join(room.name);
    console.log(`${room.user} joined room: ${room.name}`);
    chatApp.to(room.name).emit('user_join', { username: room.user });
  });


  // leave room on the server side when user leaves room
  socket.on('leave_room', (room) => {
    socket.leave(room.name);
    console.log(`${room.user} left room: ${room.name}`);
    chatApp.to(room.name).emit('user_leave', { username: room.user });
  });


  // listen for chat message from client
  // from the client side we will emit a chatMessage event
  // and find .on('chatMessage') in server.js and execute the function
  socket.on('chatMessage', async (msg) => {
    console.log(msg);
    try{
      const message = new GroupMsg({
        from_user: msg.from_user,
        to_room: msg.room,
        message: msg.message
      });

      const savedMessage = await message.save();

      chatApp.to(msg.room).emit('receive_message', savedMessage);
    }catch(err){
      console.log(err);
    }
  });
  

});

