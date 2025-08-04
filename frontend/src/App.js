// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CardsPage from './components/CardsPage';

function MainMenu() {
  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Link to="/play" style={buttonStyle}>PLAY</Link>
      <Link to="/leaderboard" style={buttonStyle}>LEADERBOARD</Link>
      <Link to="/profile" style={buttonStyle}>PROFILE</Link>
      <Link to="/auth" style={buttonStyle}>LOGIN / LOGOUT</Link>
    </div>
  );
}

const buttonStyle = {
  padding: '15px',
  backgroundColor: '#007bff',
  color: 'white',
  textAlign: 'center',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '18px',
};

function Leaderboard() {
  return <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Leaderboard is under construction...</h2>;
}

function Profile() {
  return <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Profile is under construction...</h2>;
}

function Auth() {
  return <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Authentication is under construction...</h2>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/play" element={<CardsPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}
