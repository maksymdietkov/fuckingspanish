import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function GamePage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCards([]);          // очистить карточки сразу при смене категории
    setLoading(true);
    setError(null);
    console.log('Fetching cards for categoryId:', categoryId);

    fetch(`http://localhost:8080/api/cards/category/${categoryId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch cards');
        return res.json();
      })
      .then(data => {
        setCards(data);
        setCurrentIndex(0);
        setScore(0);
        setSelectedAnswerId(null);
        setShowResult(false);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: 20 }}>Loading cards...</div>;
  }

  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
        Error: {error}
        <br />
        <button
          onClick={() => navigate('/play')}
          style={{ marginTop: 20, padding: '10px 20px', cursor: 'pointer' }}
        >
          Back to categories
        </button>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        No cards available in this category.
        <br />
        <button
          onClick={() => navigate('/play')}
          style={{ marginTop: 20, padding: '10px 20px', cursor: 'pointer' }}
        >
          Back to categories
        </button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  if (!currentCard) {
    return <div style={{ textAlign: 'center', marginTop: 20 }}>No card to display.</div>;
  }

  function handleAnswerClick(answer) {
    if (selectedAnswerId !== null) return; // запрет на смену ответа после выбора

    setSelectedAnswerId(answer.id);
    setShowResult(true);

    if (answer.correct) {
      setScore(prev => prev + 10);
    }
  }

  function handleNext() {
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswerId(null);
      setShowResult(false);
    } else {
      alert(`Level complete! Your score: ${score}`);
      navigate('/play');
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <button
        onClick={() => navigate('/play')}
        style={{
          marginBottom: 20,
          padding: '10px 20px',
          fontSize: '14px',
          borderRadius: '6px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Back to categories
      </button>

      <h2>Category ID: {categoryId}</h2>
      <div style={{ marginBottom: 20 }}>
        <strong>Question:</strong> {currentCard.question}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {currentCard.answerOptions.map((answer) => {
          const isSelected = selectedAnswerId === answer.id;
          const isCorrect = answer.correct;
          let backgroundColor = '#eee';

          if (showResult) {
            if (isSelected) {
              backgroundColor = isCorrect ? '#c8e6c9' : '#ffcdd2';
            } else if (isCorrect) {
              backgroundColor = '#c8e6c9';
            }
          }

          return (
            <button
              key={answer.id}
              onClick={() => handleAnswerClick(answer)}
              disabled={showResult}
              style={{
                padding: '10px',
                fontSize: '16px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                backgroundColor,
                cursor: showResult ? 'default' : 'pointer',
                textAlign: 'left',
              }}
            >
              {answer.text}
            </button>
          );
        })}
      </div>

      {showResult && (
        <button
          onClick={handleNext}
          style={{
            marginTop: 20,
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '6px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Next
        </button>
      )}

      <div style={{ marginTop: 20 }}>
        <strong>Score:</strong> {score}
      </div>
      <div>
        <strong>Question:</strong> {currentIndex + 1} / {cards.length}
      </div>
    </div>
  );
}
