import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => {
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
      }}
      className="centered-content"
    >
      <h1 
        className="bounce" 
        style={{ 
          fontSize: '2.5em', 
          fontFamily: 'Arial, sans-serif', 
          marginBottom: '20px',
          color: 'black',
        }}
      >
        Welcome to my tasklist
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
