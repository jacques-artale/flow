import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from './components/grid';

function App() {

  const [data, setData] = useState({});

  const [gridData, setGridData] = useState([
    ['red', '', 'green', ''],
    ['', '', '', ''],
    ['', 'blue', '', ''],
    ['', '', '', ''],
  ]);

  useEffect(() => {
    fetch('/predict').then(res => res.json()).then(data => setData(data));
  }, []);

  return (
    <div>
      <Grid gridData={gridData}/>
    </div>
  );
}

export default App;
