import React from 'react';
import { useState } from 'react';

import Cell from './grid_components/cell';


function Puzzle({ grid_data }) {

  const [active_color, set_active_color] = useState();

  function choose_color(color) {
    set_active_color(color);
    console.log("chose endpoint: " + active_color);
  }
  
  function release_color() {
    console.log("released endpoint: " + active_color);
    set_active_color();
  }

  function add_to_path() {
    console.log("added to path: " + active_color);
  }

  return (
    <div onMouseUp={() => release_color()}>
      {grid_data.map((row, row_index) =>
        <div 
          key={`row-${row_index}`} 
          style={{ display: 'flex' }}
        >
          {row.map((cell, col_index) => 
            <div
              key={`square-${row_index}-${col_index}`}
              style={{ width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid gray' }}
            >
              
              {
                cell.type === 'endpoint' ?
                <div onMouseDown={() => choose_color(cell.color)}>
                  <Cell grid_data={grid_data} cell={cell} row={row_index} col={col_index} color={cell.color} />
                </div>
                :
                <div onMouseEnter={() => add_to_path()} style={{width: '100%', height: '100%'}}>
                  
                </div>
              }
              
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Puzzle;
