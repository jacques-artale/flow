import React, { useState } from 'react';
import './App.css';
import Grid from './components/grid';

function App() {

  const [grid_data, set_grid_data] = useState([[]]);
  const [width, set_width] = useState(10);
  const [height, set_height] = useState(10);

  function generate_grid() {
    const params = new URLSearchParams({
      width: width,
      height: height,
    });

    fetch(`/generate?${params.toString()}`).then(res => res.json()).then(data => {
      const color_map = generate_color_palette(data.grid.length * data.grid[0].length + 1);
      const colored_grid = data.grid.map(row => row.map(cell => {
        return {
          ...cell,
          color: cell.color === 0 ? 'FFFFFF' : color_map[cell.color % color_map.length]
        }
      }));
      set_grid_data(colored_grid);
    });
  }

  return (
    <div>
      <h1>Flow Numberlink</h1>
      
      <div style={{display: 'flex'}}>
        <div style={style.settings_container}>
          Width: <input style={style.input_field} type="number" value={width} onChange={(event) => set_width(event.target.value)}></input>
          Height: <input style={style.input_field} type="number" value={height} onChange={(event) => set_height(event.target.value)}></input>
          <button style={style.generate_button} onClick={generate_grid}>Generate new board</button>
        </div>
        
        <div style={style.grid_container}>
          <Grid grid_data={grid_data}/>
        </div>
      </div>
    </div>
  );
}

function generate_color_palette(n) {
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
    'FF7F50', // Coral
    'F08080', // Light Coral
    'DC143C', // Crimson
    'B22222', // FireBrick
    '8B0000', // Dark Red
    'FFA07A', // Light Salmon
    'FF8C00', // Dark Orange
    'FFA500', // Orange
    'FFFF00', // Yellow
    'ADFF2F', // Green Yellow
    '7FFF00', // Chartreuse
    '7CFC00', // Lawn Green
    '00FF00', // Lime
    '32CD32', // Lime Green
    '00FA9A', // Medium Spring Green
    '3CB371', // Medium Sea Green
    '2E8B57', // Sea Green
    '228B22', // Forest Green
    '006400', // Dark Green
    '98FB98', // Pale Green
  ];
  /*
  for(let i = 0; i < n; i++) {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    palette.push(randomColor);
  }
  */
  
  return palette;
}

const style = {
  input_field: {
    width: '60px',
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginLeft: '5%',
  },

  settings_container: {
    border: '1px solid black',
    marginLeft: '1%',
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },

  grid_container: {
    marginLeft: '1%',
    border: '1px solid black',
  },

  generate_button: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
    marginBottom: '5%',
  }
};


export default App;
