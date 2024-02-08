// npm install socket.io-client -> install socket.io on client side
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // connect to server socket on port 3001

export default socket;