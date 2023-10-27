import React from 'react';
import Cell from './grid_components/cell';

function Grid({ grid_data }) {
  return (
    <div>
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
              <Cell grid_data={grid_data} cell={cell} row={row_index} col={col_index} color={cell.color} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Grid;
