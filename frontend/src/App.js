import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/test')  // поменяй на свой реальный эндпоинт
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error('Error fetching:', err));
  }, []);

  return (
    <div>
      <h1>Test API call</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
}

export default App;
