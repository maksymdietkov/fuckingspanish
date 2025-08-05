import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from './HeaderTitle';

export default function CategoryList() {
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/categories')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch categories');
        return res.json();
      })
      .then(data => setCategories(data))
      .catch(err => setError(err.message));
  }, []);

  const buttonBaseStyle = {
    width: '100%',
    padding: '15px',
    margin: '10px 0',
    fontSize: '18px',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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

  if (error)
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>Error: {error}</div>;

  if (!categories)
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading categories...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          marginBottom: '20px',
          padding: '10px 15px',
          borderRadius: '6px',
          backgroundColor: '#888',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Back to Main Menu
      </button>

      <HeaderTitle />

      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => navigate(`/play/${cat.id}`)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ ...buttonBaseStyle }}
          title={cat.name}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
