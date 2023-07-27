import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from './components/grid';

function App() {

  const [gridData, setGridData] = useState([[]]);

  useEffect(() => {
    fetch('/generate').then(res => res.json()).then(data => {
      const colorMap = generateColorPalette(data.grid.length * data.grid[0].length + 1);
      const colored_grid = data.grid.map(row => row.map(cell => cell === 0 ? 'black' : colorMap[cell]));
      setGridData(colored_grid);

      data.grid.forEach(row => {
        console.log(row);
      });
    });
  }, []);

  return (
    <div>
      <Grid gridData={gridData}/>
    </div>
  );
}

function generateColorPalette(n) {
  let palette = [
    '808080', // Gray
    '800000', // Maroon
    '808000', // Olive
    '00FFFF', // Aqua
    '008080', // Teal
    '000080', // Navy
    'FF00FF', // Fuchsia
    '800080', // Purple
    'FA8072', // Salmon
    'FFD700', // Gold
    'BDB76B', // Dark Khaki
    'ADD8E6', // Light Blue
    '87CEFA', // Light Sky Blue
    '6495ED', // Cornflower Blue
    '4682B4', // Steel Blue
    'D2B48C', // Tan
    'BC8F8F', // Rosy Brown
    'F4A460', // Sandy Brown
    '8B4513', // Saddle Brown
    '90EE90', // Light Green
    '32CD32', // Lime Green
    '6B8E23', // Olive Drab
    '556B2F', // Dark Olive Green
    'FAFAD2', // Light Goldenrod Yellow
    'EEE8AA', // Pale Goldenrod
    'B8860B', // Dark Goldenrod
    'FF6347', // Tomato
    'FF4500', // Orange Red
    'D2691E', // Chocolate
    'CD853F', // Peru
  ];
  /*
  for(let i = 0; i < n; i++) {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    palette.push(randomColor);
  }
  */
  
  return palette;
}


export default App;
