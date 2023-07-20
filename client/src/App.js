import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from './components/grid';

function App() {

  const [gridData, setGridData] = useState([[]]);

  useEffect(() => {
    fetch('/generate').then(res => res.json()).then(data => setGridData(data.grid));
  }, []);

  return (
    <div>
      <Grid gridData={gridData}/>
    </div>
  );
}

export default App;
