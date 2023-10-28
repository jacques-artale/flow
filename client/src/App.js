import React, { useState } from 'react';
import './App.css';
import Grid from './components/grid';
import Puzzle from './components/puzzle';
import color_palette from './colors';

const INITIAL_WIDTH = 10;
const INITIAL_HEIGHT = 10;

function App() {

  const [grid_data, set_grid_data] = useState([[]]);
  const [width, set_width] = useState(INITIAL_WIDTH);
  const [height, set_height] = useState(INITIAL_HEIGHT);

  function generate_grid() {
    const params = new URLSearchParams({
      width: width,
      height: height,
    });

    fetch(`/generate?${params.toString()}`).then(res => res.json()).then(data => {
      console.log(data.grid);
      const color_map = color_palette;
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
          <h2>Generation</h2>
          Width: <input style={style.input_field} type="number" value={width} onChange={(event) => set_width(event.target.value)}></input>
          Height: <input style={style.input_field} type="number" value={height} onChange={(event) => set_height(event.target.value)}></input>
          <button style={style.generate_button} onClick={generate_grid}>Generate new board</button>
        </div>
        
        <div style={style.grid_container}>
          <Grid grid_data={grid_data}/>
        </div>

        <div style={style.grid_container}>
          <Puzzle grid_data={grid_data}/>
        </div>

        <div style={style.info_container}>
          <h2>Rules</h2>
          <ol style={style.list}>
            <li>Connect each pair of dots with a path</li>
            <li>A path may not cross another path</li>
            <li>The grid must be fully filled in the end</li>
          </ol>
        </div>
      </div>
    </div>
  );
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
    borderRadius: '4px',
    marginLeft: '1%',
    paddingLeft: '0.5%',
    paddingRight: '0.5%',
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    backgroundColor: '#f2f2f2',
  },

  grid_container: {
    marginLeft: '1%',
    border: '3px solid black',
    backgroundColor: '#f2f2f2',
  },

  info_container: {
    marginLeft: '1%',
    borderRadius: '4px',
    width: '20%',
    backgroundColor: '#f2f2f2',
    paddingLeft: '0.5%',
    paddingRight: '0.5%'
  },

  generate_button: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
    marginBottom: '5%',
    backgroundColor: '#4CAF50',
  },

  list: {
    fontSize: '18px',
  }
};


export default App;
