import React, { useEffect, useState } from 'react';
import './App.css';
import color_palette from './colors';
import get_style from './style/style';
import Grid from './components/grid';
import Puzzle from './components/puzzle';
import InfoBar from './components/grid_components/info_bar';

const INITIAL_WIDTH = 10;
const INITIAL_HEIGHT = 10;

function App() {

  const [theme, set_theme] = useState('dark');  // ['light', 'dark']
  const [show_solution, set_show_solution] = useState(false);

  const [grid_data, set_grid_data] = useState([[]]);
  const [width, set_width] = useState(INITIAL_WIDTH);
  const [height, set_height] = useState(INITIAL_HEIGHT);

  const [on_timer, set_on_timer] = useState(false);
  const [solved, set_solved] = useState(false);
  const [solve_time, set_solve_time] = useState(0);

  const style = get_style(theme);

  // Start the timer when a new puzzle is generated
  useEffect(() => {
    let interval;
  
    if (!solved && on_timer) {
      interval = setInterval(() => {
        set_solve_time((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
  
    return () => {
      clearInterval(interval);
    };
  }, [on_timer, solved]);

  function generate_grid() {
    const params = new URLSearchParams({
      width: width,
      height: height,
    });

    fetch(`/generate?${params.toString()}`).then(res => res.json()).then(data => {
      const color_map = color_palette;
      const colored_grid = data.grid.map(row => row.map(cell => {
        return {
          ...cell,
          color: cell.color === 0 ? 'FFFFFF' : color_map[cell.color % color_map.length],
          id: cell.color,
        }
      }));
      set_grid_data(colored_grid);
      set_solved(false);
      set_on_timer(true);
      set_solve_time(0);
    });
  }

  return (
    <div style={style.main}>
      <h1 style={{marginTop: 0}}>Flow Numberlink</h1>

      <button style={style.button} onClick={() => set_theme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
      <button style={style.button} onClick={() => set_show_solution(!show_solution)}>{show_solution ? 'Hide Solution' : 'Show Solution'}</button>
      
      <div style={{display: 'flex'}}>
        <div style={style.settings_container}>
          <h2>Generation</h2>
          Width: <input style={style.input_field} type="number" value={width} onChange={(event) => set_width(event.target.value)}></input>
          Height: <input style={style.input_field} type="number" value={height} onChange={(event) => set_height(event.target.value)}></input>
          <button style={style.generate_button} onClick={generate_grid}>Generate new board</button>
        </div>
        
        <div style={{...style.grid_container, display: show_solution ? '' : 'none'}}>
          <InfoBar solve_time={solve_time}/>
          <Grid grid_data={grid_data}/>
        </div>
        <div style={{...style.grid_container, display: show_solution ? 'none' : ''}}>
          <InfoBar solve_time={solve_time}/>
          <Puzzle grid_data={grid_data} solved={solved} set_solved={set_solved}/>
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

      <div style={{...style.solved_overlay, display: solved ? 'flex' : 'none'}}>
        <h2>Puzzle Solved</h2>
        <p>Time: {solve_time} seconds</p>
      </div>
    </div>
  );
}


export default App;
