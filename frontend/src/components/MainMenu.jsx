import React from 'react';
import { Link } from 'react-router-dom';

const buttonStyle = {
  padding: '15px',
  backgroundColor: '#007bff',
  color: 'white',
  textAlign: 'center',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '18px',
  display: 'block',
  margin: '10px 0',
};

export default function MainMenu() {
  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Link to="/play" style={buttonStyle}>PLAY</Link>
      <Link to="/leaderboard" style={buttonStyle}>LEADERBOARD</Link>
      <Link to="/profile" style={buttonStyle}>PROFILE</Link>
      <Link to="/auth" style={buttonStyle}>LOGIN / LOGOUT</Link>
    </div>
  );
}
