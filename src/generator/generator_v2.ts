

// 1. a grid must be fully filled
// 2. a path must be at least 3 cells long
// 3. a path may not cross another path
// 4. a cell in a path may not be adjacent to more than 2 other cells in the path

// (MIGHT CREATE SINGLE CELL PATHS)
// chose a random color
//  chose a random cell of that color
//  expand to a random direction from that cell
//  if no direction is found, move on to next color
//  if a direction is found, expand to that direction
//  repeat expansion random number of times (max)
//  if max is reached, move on to next color
// continue until grid is full



// or
// (MIGHT CREATE SINGLE CELL PATHS)
// fill grid with random colors
// pick random color
// pick random endpoint of color
// merge with random adjacent endpoint so long as requirement 4. is met
//  fix endpoints (if either was alone in its path just move on, otherwise set both cells to 'path')
// repeat until rule 4. cannot be met for any color or no adjacent endpoints exist


// check if a set of holes has any contact with any endpoints


type CellType = 'empty' | 'endpoint' | 'path';

interface Cell {
  type: CellType;
  color: number;
}

export class GeneratorV2 {

  constructor() {}

  generate(): number[][] {

    const width = 100;
    const height = 100;
    const min_path_length = 3;
    const max_path_length = 200;

    // create grid
    let grid: Cell[][] = Array.from({length: height}, () => new Array(width).fill({type: 'empty', color: 0}));

    let color = 1;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let cell: [number, number] | undefined = [i, j];

        if (grid[cell[0]][cell[1]].type !== 'empty') continue;

        let expand = Math.floor(Math.random() * (max_path_length - min_path_length + 1)) + min_path_length;
        while (expand) {
          if (cell === undefined) break;
          grid[cell[0]][cell[1]] = {type: 'endpoint', color: color};
          cell = this.get_random_direction(grid, cell);
          expand--;
        }
        color++;
      }
    }

    // translate grid to color grid
    const color_grid: number[][] = grid.map(row => row.map(cell => cell.color));

    return color_grid;
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

      if (new_cell[0] < 0 || new_cell[0] >= grid.length || new_cell[1] < 0 || new_cell[1] >= grid[0].length) continue;

      if (grid[new_cell[0]][new_cell[1]].type === 'empty') {
        if (this.get_n_adjacent(grid, new_cell, grid[cell[0]][cell[1]].color) > 1) continue;
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
   * checks if grid is full
   * @param grid 2-dimensional array of cells
   * @returns boolean
   */
  is_full(grid: Cell[][]): boolean {
    return grid.every(row => row.every(cell => cell.type !== 'empty'));
  }

}
