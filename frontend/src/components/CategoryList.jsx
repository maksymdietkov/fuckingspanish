import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from './HeaderTitle';  // импортируем заголовок

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

  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>Error: {error}</div>;
  if (!categories) return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading categories...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      {/* Кнопка назад */}
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

      {/* Заголовок */}
      <HeaderTitle />

      {/* Список категорий */}
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => navigate(`/play/${cat.id}`)}
          style={{
            width: '100%',
            padding: '15px',
            margin: '10px 0',
            fontSize: '18px',
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',

            whiteSpace: 'nowrap',    // чтобы текст не переносился
            overflow: 'hidden',      // скрываем излишки текста
            textOverflow: 'ellipsis' // добавляем многоточие, если текст не помещается
          }}
          title={cat.name} // чтобы при наведении показывалось полное название
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
