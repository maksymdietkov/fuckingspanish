import React from 'react';

export default function HeaderTitle() {
  return (
    <div className="header" style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1
        className="game-title"
        style={{
          fontSize: 'clamp(2rem, 5vw, 4rem)', // минимум 2rem, максимум 4rem, плавно меняется с шириной окна
          margin: 0,
          color: 'rgb(180, 30, 30)', // красный, но не слишком яркий
        }}
      >
        Fucking Spanish
      </h1>
      <p
        className="subtitle"
        style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', // тоже адаптивный размер
          color: '#666',
          marginTop: '8px',
        }}
      >
        Learn like a badass. Curse like a native.
      </p>
    </div>
  );
}
