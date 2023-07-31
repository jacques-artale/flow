import React from 'react';

function Endpoint({ color }) {
  return (
    <div
      style={{ 
        width: '50px', height: '50px',
        backgroundColor: `#${color}`,
        borderRadius: '50%', 
        display: 'flex', alignItems: 'center', justifyContent: 'center' 
      }}
    />
  );
}

function Path({ color }) {
  return (
    <div
      style={{ 
        width: '50px', height: '5px',
        backgroundColor: `#${color}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center' 
      }}
    />
  );
}

function Grid({ gridData }) {
  return (
    <div>
      {gridData.map((row, rowIndex) =>
        <div 
          key={`row-${rowIndex}`} 
          style={{ display: 'flex' }}
        >
          {row.map((cell, colIndex) => 
            <div
              key={`square-${rowIndex}-${colIndex}`}
              style={{ width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid gray' }}
            >
              {cell.type === 'endpoint' ? <Endpoint color={cell.color} /> : <Path color={cell.color} />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Grid;
