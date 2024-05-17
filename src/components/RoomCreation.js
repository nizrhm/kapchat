import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../utils/roomService';
import Cookies from 'js-cookie';
import '../styles/RoomCreation.css';
import logo from '../components/logo.png'; // Import your logo image

function RoomCreation() {
  const [roomName, setRoomName] = useState('');
  const [isBodyWhite, setIsBodyWhite] = useState(false); // State to track body background color
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Kap-chat`;
  }, []);

  const generateRandomRoomId = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString(); // Generate an 8-digit random number
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomId = generateRandomRoomId();
    const created = await createRoom(roomId, Cookies.get('userId'));
    if (created) {
      navigate(`/room/${roomId}`);
    } else {
      console.error("Failed to create room.");
    }
  };

  const toggleBodyColor = () => {
    setIsBodyWhite((prev) => !prev);
  };

  return (
    <div className={`roomCreationContainer ${isBodyWhite ? 'whiteBody' : ''}`}>
      <nav className="navbar">
        <div className="logoContainer">
          <img
            src={logo}
            alt="Logo"
            className="logo"
            onClick={toggleBodyColor} // Toggle body color on logo click
          />
        </div>
        {/* You can add other navigation items here */}
      </nav>
      <div className='roomCreationSubContainer'>
        <p className="creationTitle">Kap-Chat</p>
        <p className="creationOverview">Start your Temporary Chat</p>
        <form onSubmit={handleSubmit} className="creationForm">
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Room Name"
            className="roomInput"
            readOnly 
          />
          <button type="submit" className="createRoomButton">Create</button>
        </form>
      </div>
      <footer className="footer">
        <p className="footerText">🔒 Your anonymity is upmost</p>
      </footer>
    </div>
  );
};

export default RoomCreation;