import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState,useEffect } from 'react';


import JoinRoom from './components/JoinRoom';
import RoomChat from './components/RoomChat';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  const [user, setUser] = useState(localStorage.getItem('username'));
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setLoggedIn(status);
  }

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('username');
  }

  useEffect(() => {
    if(user){
      setLoggedIn(true);
    }
  },[]);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {
            !loggedIn ?( 
              <>
                <Route path="/" element={<Login onLogin={handleLogin}/>} />
                <Route path="/register" element={<Register />} />
              </>
            ) : (
              <>
                <Route path="/rooms" element={<JoinRoom onLogout={handleLogout}/>} />
                <Route path="/chat/:user/:room" element={<RoomChat />}/>
              </>
            )
          }

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
