
// IMPORTANT NOTE: This validator will only check for the following:
// - There are no empty cells in the grid
// - Each path length is greater than 2
// - Each path is not adjacent to itself
// - Each path is connected to two, and only two, endpoints

type CellType = 'empty' | 'endpoint' | 'path';

interface Cell {
  type: CellType;
  color: number;
}

const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

function Validate(grid: Cell[][]): boolean {

  const visited: boolean[][] = Array.from({ length: grid.length }, () => Array.from({ length: grid[0].length }, () => false));

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      // Check for empty cells
      if (grid[i][j].type === 'empty') return false;
      // Check for s patterns (adjacent paths)
      if (!validate_adjacent(grid, i, j)) return false;

      // Check length of paths
      if (visited[i][j]) continue;
      if (!validate_path(grid, visited, i, j)) return false;
    }
  }

  return true;
}

function validate_path(grid: Cell[][], visited: boolean[][], row: number, col: number): boolean {
  let path_length = 1;
  const color = grid[row][col].color;

  // breadth first search to find path length
  const queue = [[row, col]];
  visited[row][col] = true;

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;

    let found_next = false;
    for (let i = 0; i < directions.length; i++) {
      const new_row: number = r + directions[i][0];
      const new_col: number = c + directions[i][1];

      if (new_row < 0 || new_row >= grid.length || new_col < 0 || new_col >= grid[0].length) continue;
      if (grid[new_row][new_col].color !== color) continue;
      if (visited[new_row][new_col]) continue;

      queue.push([new_row, new_col]);
      
      visited[new_row][new_col] = true;
      found_next = true;
      path_length++;
    }

    // if a search ends without reaching a path endpoint, return false
    if (!found_next && grid[r][c].type !== 'endpoint') return false;
  }

  return path_length > 2;
}

function validate_adjacent(grid: Cell[][], row: number, col: number): boolean {
  let adjacent = 0;
  const color = grid[row][col].color;

  for (let i = 0; i < directions.length; i++) {
    const new_row: number = row + directions[i][0];
    const new_col: number = col + directions[i][1];

    if (new_row < 0 || new_row >= grid.length || new_col < 0 || new_col >= grid[0].length) continue;
    if (grid[new_row][new_col].color === color) adjacent++;
  }

  if (grid[row][col].type === 'endpoint') return adjacent === 1; // endpoints can only be adjacent to one path
  return adjacent === 2; // paths can only be adjacent to two paths
}

export default Validate;
