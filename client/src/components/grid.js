import React from 'react';

function Grid({ gridData }) {

  return (
    <div>
      {gridData.map((row, rowIndex) =>
        <div 
          key={`row-${rowIndex}`} 
          style={{ display: 'flex', marginBottom: '10px' }}
        >
          {row.map((cell, colIndex) =>
            <div
              key={`cell-${rowIndex}-${colIndex}`}
              style={{ width: '50px', height: '50px', backgroundColor: `#${cell}`, margin: '0 5px', border: '4px solid black' }}
            ></div>
          )}
        </div>
      )}
    </div>
  );

}

export default Grid;
