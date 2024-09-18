import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowAnimation(true);

    // Delay navigation to allow animation to complete
    setTimeout(() => {
      navigate('/tasklist');
    }, 1000); // Adjust duration to match animation
  };

  return (
    <div 
      style={{
        backgroundImage: 'url(/img.webp)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        position: 'relative', // Ensure positioning context for animation
      }}
      className={`centered-content ${showAnimation ? 'rocket-launch' : ''}`}
    >
      
        <img 
          src="/mini.png" // Path to your icon image in the public folder
          alt="Bouncing Icon" 
          className="bounce" // Apply bounce class here
          style={{ width: '100px', height: '100px' }} // Adjust size as needed
        />

        <h1 
          className="bounce" 
          style={{ 
            fontSize: '2.5em', 
            fontFamily: 'Arial, sans-serif', 
            marginBottom: '20px',
            color: 'black',
          }}
        >
          Welcome Fellow Minions
        </h1>
        <Link 
          to="/tasklist" 
          className="bounce"
          style={{ 
            textDecoration: 'none', 
            color: 'darkblue', 
            fontSize: '1.2em', 
            fontWeight: 'bold', 
            padding: '10px 20px', 
            border: '2px solid darkred', 
            borderRadius: '5px', 
            transition: 'background-color 0.3s, color 0.3s'
          }}
          onClick={handleClick} // Trigger animation and navigation
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'lightpink';
            e.target.style.color = 'darkgreen';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'darkbrown';
            e.target.style.color = 'darkblue';
          }}
        >
          Go to Task List
        </Link>
      
    </div>
  );
};

export default Home;
