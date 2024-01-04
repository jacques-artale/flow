import React, { useEffect, useState } from 'react';
import './App.css';
import color_palette from './colors';
import get_style from './style/style';
import Grid from './components/grid';
import Puzzle from './components/puzzle';
import InfoBar from './components/grid_components/info_bar';
import SolvedPopup from './components/solved_popup';

const INITIAL_WIDTH = 10;
const INITIAL_HEIGHT = 10;

function App() {

  const [show_solution, set_show_solution] = useState(false);

  const [grid_data, set_grid_data] = useState([[]]);
  const [width, set_width] = useState(INITIAL_WIDTH);
  const [height, set_height] = useState(INITIAL_HEIGHT);

  const [unsolved_grid, set_unsolved_grid] = useState([[]]);
  const [current_grid, set_current_grid] = useState([[]]);

  const [on_timer, set_on_timer] = useState(false);
  const [solved, set_solved] = useState(false);
  const [solve_time, set_solve_time] = useState(0);
  const [moves, set_moves] = useState(0);

  const [generating, set_generating] = useState(false);

  const style = get_style();

  // Reset the puzzle when the grid data changes
  useEffect(() => {
    const endpoint_grid = grid_data.map(row => row.map(cell => {
      return cell.type === 'path' ? { ...cell, type: 'empty', color: '', id: '' } : cell;
    }));
    set_current_grid(endpoint_grid);
    set_unsolved_grid(endpoint_grid);
  }, [grid_data]);

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
    return () => clearInterval(interval);
  }, [on_timer, solved]);

  // Check if the puzzle has been solved when the current grid changes
  useEffect(() => {
    if (current_grid.length === 0 || current_grid[0].length === 0) return;
    for (let i = 0; i < current_grid.length; i++) {
      for (let j = 0; j < current_grid[0].length; j++) {
        const cell = current_grid[i][j];
        const target_cell = grid_data[i][j];

        if (cell.type !== target_cell.type || cell.color !== target_cell.color || cell.id !== target_cell.id) {
          return;
        }
      }
    }
    set_solved(true);
  }, [current_grid]);

  function generate_grid() {
    if (generating) return;
    if (width < 3 || height < 3) {
      alert('Grid must be at least 3x3');
      return;
    }
    if (width > 200 || height > 200) {
      alert('Grid can be at most 200x200');
      return;
    }

    set_generating(true);

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

      set_generating(false);
    });
  }

  function resetBoard() {
    set_solved(false);
    set_moves(0);
    set_current_grid(unsolved_grid);
  }

  return (
    <div style={style.main}>
      <h1 style={{marginTop: 0}}>Flow Numberlink</h1>

      <button style={style.button} onClick={() => set_show_solution(!show_solution)}>{show_solution ? 'Hide Solution' : 'Show Solution'}</button>
      <button style={style.button} onClick={() => resetBoard()}>Reset Board</button>
      
      <div style={{display: 'flex'}}>
        <div style={style.settings_container}>
          <h2>Generation</h2>
          Width: <input style={style.input_field} type="number" value={width} min="3" max="200" onChange={(event) => set_width(event.target.value)}></input>
          Height: <input style={style.input_field} type="number" value={height} min="3" max="200" onChange={(event) => set_height(event.target.value)}></input>
          <button style={generating ? style.disabled_generate_button : style.generate_button} onClick={generate_grid} disabled={generating} >Generate new board</button>

          <p>Not recommended to generate boards larger than 50x50</p>
        </div>
        
        <div style={{...style.grid_container, display: show_solution ? '' : 'none'}}>
          <InfoBar solve_time={solve_time} moves={moves}/>
          <Grid grid_data={grid_data}/>
        </div>
        <div style={{...style.grid_container, display: show_solution ? 'none' : ''}}>
          <InfoBar solve_time={solve_time} moves={moves}/>
          <Puzzle current_grid={current_grid} set_current_grid={set_current_grid} solved={solved} set_moves={set_moves}/>
        </div>

        <div style={style.info_container}>
          <h2>Rules</h2>
          <ol style={style.list}>
            <li>Connect each pair of dots with a path</li>
            <li>A path may not cross another path</li>
            <li>The grid must be fully filled with no gaps</li>
          </ol>
          <h2>How to play</h2>
          <ol style={style.list}>
            <li>Generate a new board</li>
            <li>Click on a dot and drag the path to its pair</li>
            <li>To clear a path press on its connecting dot</li>
            <li>Once the board follows all rules it is solved!</li>
          </ol>
        </div>
      </div>

      <SolvedPopup solved={solved} solve_time={solve_time}/>
    </div>
  );
}


export default App;
