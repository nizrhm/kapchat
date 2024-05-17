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

  const generateRandomName = () => {
    const adjectives = ['1234', '234', '1234', '6789', '123456', '9879'];
    const nouns = ['99847', '8988989', '65665', '334657', '122134', '77645'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective}-${randomNoun}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const randomRoomName = generateRandomName();
    const roomId = await createRoom(randomRoomName, Cookies.get('userId'));
    if (roomId) {
      navigate(`/room/${roomId}`);
    } else {
      console.error("Failed to create id.");
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
            value={roomName || generateRandomName()} // Set value to roomName if available
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
