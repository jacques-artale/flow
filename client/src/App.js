import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [data, setData] = useState({});

  useEffect(() => {
    fetch('/train').then(res => res.json()).then(data => setData(data));
  }, []);

  return (
    <div>
      <p>{data.msg}</p>
    </div>
  );
}

export default App;
