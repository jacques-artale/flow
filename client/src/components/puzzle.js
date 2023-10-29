import React, { useEffect, useState } from 'react';
import Cell from './grid_components/cell';

function Puzzle({ grid_data }) {

  const [current_grid, set_current_grid] = useState([[]]);
  const [active_color, set_active_color] = useState();

  useEffect(() => {
    // wipe out all paths, leaving only endpoints
    const endpoint_grid = grid_data.map(row => row.map(cell => {
      return cell.type === 'path' ? { ...cell, type: 'empty', color: '' } : cell;
    }));
    set_current_grid(endpoint_grid);
  }, [grid_data]);

  function choose_color(cell) {
    if (cell.type !== 'empty') set_active_color(cell.color);
  }
  
  function release_color() {
    set_active_color(null);
  }

  function add_to_path(row_index, col_index) {
    if (active_color === null) return;

    set_current_grid(prev_grid => {
      // Targeted deep copy for optimization
      const new_grid = [...prev_grid];
      new_grid[row_index] = [...new_grid[row_index]];
      new_grid[row_index][col_index] = { ...new_grid[row_index][col_index] };

      if (new_grid[row_index][col_index].type !== 'endpoint') {
        new_grid[row_index][col_index].color = active_color;
        new_grid[row_index][col_index].type = 'path';
      }
      return new_grid;
    });
  }

  return (
    <div onMouseUp={() => release_color()}>
      {current_grid.map((row, row_index) =>
        <div 
          key={`row-${row_index}`} 
          style={{ display: 'flex' }}
        >
          {row.map((cell, col_index) => 
            <div
              key={`square-${row_index}-${col_index}`}
              style={{ width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid gray' }}
            >
              
              <div
                style={{width: '100%', height: '100%'}}
                onDragStart={(event) => event.preventDefault()}
                onMouseDown={() => choose_color(cell)}
                onMouseEnter={() => add_to_path(row_index, col_index)}
              >
                <Cell grid_data={current_grid} cell={cell} row={row_index} col={col_index} color={cell.color} />
              </div>
              
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Puzzle;
