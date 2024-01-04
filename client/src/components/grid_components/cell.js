import React from 'react';

function get_neighbours({ grid_data, row, col }) {
  const neighbors = [];

  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  for (const direction of directions) {
    const new_cell = [row + direction[0], col + direction[1]];
    if (new_cell[0] < 0 || new_cell[0] >= grid_data.length || new_cell[1] < 0 || new_cell[1] >= grid_data[0].length) continue;

    if (grid_data[new_cell[0]][new_cell[1]].id === grid_data[row][col].id) {
      if (direction[0] === -1 && direction[1] === 0) neighbors.push(1);
      if (direction[0] === 1 && direction[1] === 0) neighbors.push(2);
      if (direction[0] === 0 && direction[1] === -1) neighbors.push(3);
      if (direction[0] === 0 && direction[1] === 1) neighbors.push(4);
    }
  }

  return neighbors;
}


const Cell = React.memo(({ grid_data, cell, row, col, color }) => {
  if (cell.type === 'endpoint') return <Endpoint color={color} />;
  if (cell.type === 'path') return <Path grid_data={grid_data} row={row} col={col} color={color} />;
  else return <div></div>;
});

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

function Path({ grid_data, row, col, color }) {

  const style = {
    container: {
      position: 'relative',
      width: '50px',
      height: '50px',
    },
    left: {
      position: 'absolute',
      top: '50%',
      left: '-20%',
      width: '80%',
      height: '10px',
      borderRadius: '5px',
      transform: 'translateY(-50%)',
    },
    top: {
      position: 'absolute',
      top: '-20%',
      left: '50%',
      height: '80%',
      width: '10px',
      borderRadius: '5px',
      transform: 'translateX(-50%)',
    },
    right: {
      position: 'absolute',
      top: '50%',
      left: '40%',
      width: '80%',
      height: '10px',
      borderRadius: '5px',
      transform: 'translateY(-50%)',
    },
    bottom: {
      position: 'absolute',
      top: '40%',
      left: '50%',
      height: '80%',
      width: '10px',
      borderRadius: '5px',
      transform: 'translateX(-50%)',
    },
    circle: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
    }
  };

  const neighbours = get_neighbours({ grid_data, row, col });

  return (
    <div style={style.container}>
      { neighbours.includes(1) && <div style={{...style.top, backgroundColor: `#${color}`}} /> }
      { neighbours.includes(2) && <div style={{...style.bottom, backgroundColor: `#${color}`}} /> }
      { neighbours.includes(3) && <div style={{...style.left, backgroundColor: `#${color}`}} /> }
      { neighbours.includes(4) && <div style={{...style.right, backgroundColor: `#${color}`}} /> }
      { neighbours.length === 1 && <div style={{...style.circle, backgroundColor: `#${color}`}} /> }
    </div>
  );
}

export default Cell;