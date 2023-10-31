import React, { useEffect, useState } from 'react';
import Cell from './grid_components/cell';

function Puzzle({ grid_data, solved, set_solved }) {

  const [current_grid, set_current_grid] = useState([[]]);
  const [active_endpoint, set_active_endpoint] = useState();

  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

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

  // Reset the puzzle when the grid data changes
  useEffect(() => {
    const endpoint_grid = grid_data.map(row => row.map(cell => {
      return cell.type === 'path' ? { ...cell, type: 'empty', color: '', id: '' } : cell;
    }));
    set_current_grid(endpoint_grid);
  }, [grid_data]);

  useEffect(() => {
    // Attach mouseup event listener to window
    window.addEventListener('mouseup', release_color);
    // Clean up - remove the event listener
    return () => {
      window.removeEventListener('mouseup', release_color);
    };
  }, []);

  /**
   * Sets the cell which was clicked on as the active endpoint
   * @param {number} row_index 
   * @param {number} col_index 
   */
  function choose_color(row_index, col_index) {
    if (solved) return;
    const cell = current_grid[row_index][col_index];
    if (cell.type !== 'empty') set_active_endpoint(cell);
    if (cell.type !== 'empty') clear_path(row_index, col_index);
  }
  
  /**
   * Sets the active endpoint to null, which means that the user is no longer drawing a path.
   */
  function release_color() {
    set_active_endpoint(null);
  }

  /**
   * Adds a cell to the path if it is empty will be connected to the path.
   * @param {number} row_index
   * @param {number} col_index
   */
  function add_to_path(row_index, col_index) {
    if (solved) return;
    if (active_endpoint === null) return;

    // make sure that new cell is adjacent to a cell of the same path
    // (to avoid adding path cells without being connected to the endpoint)
    let adjacent_cells = 0;
    for (const direction of directions) {
      let new_row = row_index + direction[0];
      let new_col = col_index + direction[1];

      if (new_row < 0 || new_row >= current_grid.length || new_col < 0 || new_col >= current_grid[0].length) continue;
      if (current_grid[new_row][new_col].id === active_endpoint.id) adjacent_cells++;
    }
    if (adjacent_cells === 0) return;

    set_current_grid(prev_grid => {
      // Targeted deep copy for optimization
      const new_grid = [...prev_grid];
      new_grid[row_index] = [...new_grid[row_index]];
    
      if (new_grid[row_index][col_index].type === 'empty') {
        new_grid[row_index][col_index] = { ...active_endpoint, type: 'path' };
      }
      return new_grid;
    });
  }

  /**
   * Clears the entire path from the board.
   * @param {number} row_index
   * @param {number} col_index
   */
  function clear_path(row_index, col_index) {
    // breadth first search to find all cells in the path
    const new_grid = JSON.parse(JSON.stringify(current_grid));
    const target_id = new_grid[row_index][col_index].id;

    const type = new_grid[row_index][col_index].type;
    
    if (type === 'path') return; // TODO: Implement clearing of path cells from this point forward

    const queue = [[row_index, col_index]];

    while (queue.length > 0) {
      const [row, col] = queue.shift();
      if (new_grid[row][col].type === 'path') {
        new_grid[row][col] = { ...new_grid[row][col], type: 'empty', color: '', id: '' };
      }
      
      for (const direction of directions) {
        let new_row = row + direction[0];
        let new_col = col + direction[1];

        if (new_row < 0 || new_row >= new_grid.length || new_col < 0 || new_col >= new_grid[0].length) continue;
        if (new_grid[new_row][new_col].id !== target_id) continue;
        if (new_grid[new_row][new_col].type === 'path') {
          queue.push([new_row, new_col]);
        }
      }
    }

    set_current_grid(new_grid);
  }

  return (
    <div>
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
                style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}
                onDragStart={(event) => event.preventDefault()}
                onMouseDown={() => choose_color(row_index, col_index)}
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
