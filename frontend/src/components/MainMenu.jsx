import React from 'react';
import { Link } from 'react-router-dom';
import HeaderTitle from './HeaderTitle'; // Заголовок

export default function MainMenu() {
  const animatedButtonStyle = {
    padding: '15px',
    backgroundColor: '#007bff',
    color: 'white',
    textAlign: 'center',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '18px',
    display: 'block',
    margin: '10px 0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
  };

  return (
    <>
      <HeaderTitle />

      <div
        style={{
          padding: '40px',
          maxWidth: '400px',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {['play', 'leaderboard', 'profile', 'auth'].map((route) => (
          <Link
            key={route}
            to={`/${route}`}
            style={animatedButtonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {route.toUpperCase().replace('/', '')}
          </Link>
        ))}
      </div>
    </>
  );
}
