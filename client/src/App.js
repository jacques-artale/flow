import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from './components/grid';

function App() {

  const [gridData, setGridData] = useState([[]]);

  useEffect(() => {
    fetch('/generate').then(res => res.json()).then(data => {
      const colorMap = generateColorPalette(data.grid.length * data.grid[0].length + 1);
      const colored_grid = data.grid.map(row => row.map(cell => cell === 0 ? 'white' : colorMap[cell]));
      setGridData(colored_grid);
    });
  }, []);

  return (
    <div>
      <Grid gridData={gridData}/>
    </div>
  );
}

function generateColorPalette(n) {
  let palette = [];
  for(let i = 0; i < n; i++) {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    palette.push(randomColor);
  }
  return palette;
}


export default App;
