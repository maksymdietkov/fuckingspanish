import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainMenu from './components/MainMenu';
import CategoryList from './components/CategoryList';
import GamePage from './components/GamePage';



function Leaderboard() {
  return <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Under construction...</h2>;
}

function Profile() {
  return <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Under construction...</h2>;
}

function Auth() {
  return <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Under construction...</h2>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/play" element={<CategoryList />} />
        <Route path="/play/:categoryId" element={<GamePage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}
