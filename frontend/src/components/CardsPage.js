// CardsPage.jsx
import React, { useEffect, useState } from 'react';

export default function CardsPage() {
  const [cards, setCards] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/cards')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setCards(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div style={{ padding: 20, color: 'red' }}>Error: {error}</div>;
  if (!cards) return <div style={{ padding: 20 }}>Loading cards...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Spanish Flashcards (Test)</h1>
      {cards.map(card => (
        <div key={card.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '10px', backgroundColor: '#f9f9f9' }}>
          <strong>Question:</strong> {card.question}<br />
          <strong>Category:</strong> {card.category?.name || 'No category'}<br />
          <strong>Answers:</strong>
          <ul>
            {card.answerOptions.map(opt => (
              <li key={opt.id}>{opt.text} {opt.correct && '✔️'}</li>
            ))}
          </ul>
        </div>
      ))}
      <div style={{ marginTop: 20 }}>
        <Link to="/" style={{ ...buttonStyle, backgroundColor: '#6c757d' }}>Назад в меню</Link>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';

const buttonStyle = {
  padding: '10px 20px',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
};
