import { Link } from "react-router-dom";


const JoinRoom = ({onLogout}) => {
  const rooms = ['devops', 'cloud computing', 'covid19', 'sports', 'nodeJS'];
  const username = localStorage.getItem('username');

  return (
    <>
      <nav className="navbar bg-gray-800 p-4 text-white">
        <h1 className="text-lg font-bold">Chat App - Lab Test - 101367043</h1>
        <div className="links flex text-center space-x-4 mt-2">
          <Link to="/" onClick={onLogout} className="px-3 py-1 bg-transparent text-white border border-white hover:bg-gray-700 rounded">Logout</Link>
        </div>
      </nav>
      <h1 className="text-2xl font-bold text-center my-4">Choose a room to join</h1>
      <ul className="flex flex-wrap justify-center gap-4">
        {rooms.map(room => (
          <li key={room} className="list-none">
            <Link to={`/chat/${username}/${room}`} className="inline-block bg-indigo-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2 transition-colors">
              {room}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
 
export default JoinRoom;