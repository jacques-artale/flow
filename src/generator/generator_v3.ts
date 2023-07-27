

// 1. a grid must be fully filled
// 2. a path must be at least 3 cells long
// 3. a path may not cross another path
// 4. a cell in a path may not be adjacent to more than 2 other cells in the path


// (might lead to infinite loop?)
// check if an expansion will leave a hole in the grid of smaller than 3 cells
// if so, expand in a different direction

// grow and shrink the paths (rearranging)

type CellType = 'empty' | 'endpoint' | 'path';

interface Cell {
  type: CellType;
  color: number;
}

export class GeneratorV3 {
  constructor() {}

  generate(): number[][] {
    const width = 10;
    const height = 10;

    // create grid
    let grid: Cell[][] = Array.from({length: height}, () => new Array(width).fill({type: 'empty', color: 0}));

    // initialize grid
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const cell_type = j === 0 || j === width - 1 ? 'endpoint' : 'path';
        grid[i][j] = {type: cell_type, color: i+1};
      }
    }
    
    this.shrink_path(grid, [0, 0]);
    this.grow_path(grid, [1, 0]);
    this.shrink_path(grid, [0, 1]);
    this.grow_path(grid, [0, 0]);

/*
    // randomly grow and shrink paths
    for (let i = 0; i < 100; i++) {
      
    }
*/

    // translate grid to color grid
    const color_grid: number[][] = grid.map(row => row.map(cell => cell.color));

    return color_grid;
  }

  /**
   * shrinks a path by one cell
   * @param grid 2-dimensional array of cells
   * @param cell endpoint of path to shrink
   */
  shrink_path(grid: Cell[][], cell: [number, number]) {
    if (grid[cell[0]][cell[1]].type !== 'endpoint') return;

    // find path direction
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    for (const direction of directions) {
      // get cell in direction
      const new_cell: [number, number] = [cell[0] + direction[0], cell[1] + direction[1]];
      if (new_cell[0] < 0 || new_cell[0] >= grid.length || new_cell[1] < 0 || new_cell[1] >= grid[0].length) continue;
      // make sure we can shrink path without making it less than 3 cells long
      if (this.count_path_length(grid, cell) < 4) continue;
      // if cell is in path, shrink path
      if (grid[new_cell[0]][new_cell[1]].color === grid[cell[0]][cell[1]].color) {
        grid[cell[0]][cell[1]] = {type: 'empty', color: 0};
        grid[new_cell[0]][new_cell[1]] = {...grid[new_cell[0]][new_cell[1]], type: 'endpoint'};
        break;
      }
    }
  }


  /**
   * expands a path by one cell
   * @param grid 2-dimensional array of cells
   * @param cell endpoint of path to grow
   */
  grow_path(grid: Cell[][], cell: [number, number]) {
    const new_cell = this.get_random_direction(grid, cell);
    if (new_cell === undefined) return;
    grid[new_cell[0]][new_cell[1]] = {type: 'endpoint', color: grid[cell[0]][cell[1]].color};
    grid[cell[0]][cell[1]] = {...grid[cell[0]][cell[1]], type: 'path'};
  }

  /**
   * finds new empty cell in random direction
   * if no empty cell is found, returns undefined
   * @param grid 2-dimensional array of cells
   * @param cell cell to find random direction of
   * @returns touple representing row and column of new cell or undefined
   */
  get_random_direction(grid: Cell[][], cell: [number, number]): [number, number] | undefined {
    const directions: [number, number][] = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const shuffled_directions = directions.sort(() => Math.random() - 0.5);

    for (const direction of shuffled_directions) {
      const new_cell: [number, number] = [cell[0] + direction[0], cell[1] + direction[1]];

      // check if cell in chosen direction is out of bounds
      if (new_cell[0] < 0 || new_cell[0] >= grid.length || new_cell[1] < 0 || new_cell[1] >= grid[0].length) continue;

      // check if cell in chosen direction is empty
      if (grid[new_cell[0]][new_cell[1]].type === 'empty') {
        // check if an expansion would break rule 4
        //if (this.get_n_adjacent(grid, new_cell, grid[cell[0]][cell[1]].color) > 1) continue;

        return new_cell;
      }
    }

    return undefined;
  }

  /**
   * counts the number of adjacent cells of the same color
   * @param grid 2-dimensional array of cells
   * @param cell cell to count adjacent cells of
   * @param color color of adjacent cells to check for
   * @returns number of adjacent cells of the same color
   */
  get_n_adjacent(grid: Cell[][], cell: [number, number], color: number): number {
    const directions: [number, number][] = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let n_adjacent = 0;

    for (const direction of directions) {
      const new_cell: [number, number] = [cell[0] + direction[0], cell[1] + direction[1]];
      if (new_cell[0] < 0 || new_cell[0] >= grid.length || new_cell[1] < 0 || new_cell[1] >= grid[0].length) continue;
      if (grid[new_cell[0]][new_cell[1]].color === color) {
        n_adjacent++;
      }
    }

    return n_adjacent;
  }


  /**
  * Counts the length of a path
  * @param grid 2-dimensional array of cells
  * @param current_cell Current cell of path
  * @param last_cell Last cell of path
  */
  count_path_length(grid: Cell[][], current_cell: [number, number], last_cell: [number, number] | null = null): number {
    if (grid[current_cell[0]][current_cell[1]].type === 'empty') return 0;

    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    let path_length = 0;
  
    while(current_cell) {
      path_length++;

      // If current cell is an endpoint, return the path length
      if (last_cell !== null && grid[current_cell[0]][current_cell[1]].type === 'endpoint') {
        return path_length;
      }

      let next_cell = null;
      for (const direction of directions) {
        const new_cell: [number, number] = [current_cell[0] + direction[0], current_cell[1] + direction[1]];

        // Check if new cell is within grid, is not the last cell we visited, and is part of the path
        if (new_cell[0] < 0 || new_cell[0] >= grid.length || new_cell[1] < 0 || new_cell[1] >= grid[0].length) continue;
        if (last_cell !== null && (new_cell[0] === last_cell[0] && new_cell[1] === last_cell[1])) continue;
        if (grid[new_cell[0]][new_cell[1]].color !== grid[current_cell[0]][current_cell[1]].color) continue;

        next_cell = new_cell;
        break;
      }

      if (next_cell) {
        last_cell = current_cell;
        current_cell = next_cell;
      } else {
        break;
      }
    }

    return path_length;
  }

}
