import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../socket.config';
import axios from 'axios';
import { Link } from 'react-router-dom';


const RoomChat = () => {
    const {room,user} = useParams();
    
    const [inputMsg, setInputMsg] = useState(''); // input message for the chat
    const [msgList, setMsgList] = useState([]); // list of messages in the room
    const [users, setUsers] = useState([]); // list of users in the room
    
    useEffect(() => {
        const fetchMessages = async () => {
            try{
                const prevMessages = await axios.get(`http://localhost:3001/v1/room/${room}/messages`);
                // console.log(prevMessages.data);
                setMsgList(prevMessages.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchMessages(); // fetch  previous messages from server

        //call back function to handle new messages
        const handleNewMessage = (newMsg) => {
            setMsgList(currentMsgList => [...currentMsgList, newMsg]); // add new message to the list
        };

        // Handle new user joining the room and leaving the room
        const handleJoin = (newUser) => {
            setUsers(currentUsers => [...currentUsers, newUser.username]); // add user to the list
        };

        const handleLeave = (leftUser) => {
            setUsers(currentUsers => currentUsers.filter(user => user !== leftUser.username)); // remove user from the list
        }

        // join room on the server side when user joins room
        socket.emit('join_room', {name:room, user:user});
       
        // listen for messages from server
        socket.on('receive_message', handleNewMessage);

        // listen for new user joining the room
        socket.on('user_join', handleJoin);

        // listen for user leaving the room
        socket.on('user_leave', handleLeave);

        // clean up remove event listeners when component unmounts
        return () => {

            // leave room on the server side when user leaves room
            socket.emit('leave_room', { name: room, user: user });
            socket.off('receive_message', handleNewMessage);
            socket.off('user_joined', handleJoin);
        }


    },[room,user]); // run when room or msgList changes
 
    const sendMessage = (e) => {
        e.preventDefault();

        // send message to the socket io server
        socket.emit('chatMessage', {
            message: inputMsg, 
            from_user: user, 
            room: room
        }); // will find .on('chatMessage') in server.js and execute the function
        setInputMsg(''); // clear input field
    };


    return (
        <div className="flex min-h-full">
            <aside className="w-1/4 dark:bg-gray-800 p-4">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Room Name:   {room}</h2>
                <h3 className="text-lg font-bold mb-2 dark:text-white">Users:</h3>
                <ul>
                    {users.map((username) => (
                        <li key={username} className="dark:text-white">{username}</li>
                    ))}
                </ul>
                <Link to="/rooms" className="block mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors">Leave Room</Link>
            </aside>
            <div className="flex-1">
                {/* Your existing chat UI goes here */}
                <div className="messages-container max-h-96 overflow-auto p-4 space-y-2">
                <ul className="flex flex-col gap-2">
                    {msgList.map(prevMsg => (
                    <li key={prevMsg._id} className="break-words p-3 rounded shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                        <span className="font-semibold">{prevMsg.from_user}:</span> {prevMsg.message}
                    </li>
                    ))}
                </ul>
            </div>


            <br/>

            <form onSubmit={sendMessage} className="flex items-center justify-between p-4">
                <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type a message..."
                required
                className="flex-grow mr-4 p-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
                />
                <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Send
                </button>
            </form>
            </div>
        </div>
    );

}
 
export default RoomChat;