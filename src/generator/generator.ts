

/**
 * Generator:
 * This algorithm is flawed as it allows for an empty cell to be surrounded by
 * path cells which cannot expand to any new directions.
 */


type CellType = 'empty' | 'endpoint' | 'path';

interface Cell {
  type: CellType;
  color: number;
}

export class Generator {

  constructor() {}

  generate(): number[][] {

    const width = 4;
    const height = 4;
    const n_colors = 4;

    // create grid
    let grid: Cell[][] = Array.from({length: height}, () => new Array(width).fill({type: 'empty', color: 0}));
 
    // place colors in random start cells
    for (let i = 1; i <= n_colors; i++) {
      const pos = this.get_empty_cell(grid);
      grid[pos[0]][pos[1]] = {type: 'endpoint', color: i};
    }
 
    // continue until grid is filled
    while (!this.is_full(grid)) {
      // randomly select a color
      const color = Math.floor(Math.random() * n_colors) + 1;
      // randomly select one end of the colors
      const cell = this.get_cell_of(grid, color);
      // expand to one random direction
      const expand = this.get_random_direction(grid, cell);
      // if no direction is found, continue
      if (expand === undefined) continue;
 
      if (this.get_number_of_color(grid, color) > 1) {
        // set old cell to path
        grid[cell[0]][cell[1]] = {type: 'path', color: color};
      }

      grid[expand[0]][expand[1]] = {type: 'endpoint', color: color};
    }

    // translate grid to color grid
    const color_grid: number[][] = grid.map(row => row.map(cell => cell.color));

    return color_grid;
  }

  /**
   * checks if grid is full
   * @param grid 2-dimensional array of cells
   * @returns boolean
   */
  is_full(grid: Cell[][]): boolean {
    return grid.every(row => row.every(cell => cell.type !== 'empty'));
  }

  /**
   * returns random empty cell provided that there is at least one empty cell
   * @param grid 2-dimensional array of cells
   * @returns touple representing row and column of empty cell
   */
  get_empty_cell(grid: Cell[][]): [number, number] {
    if (this.is_full(grid)) {
      throw new Error('Grid is full');
    }
    if (grid.length === 0) {
      throw new Error('Grid is empty');
    }

    let row: number;
    let col: number;

    do {
      row = Math.floor(Math.random() * grid.length);
      col = Math.floor(Math.random() * grid[0].length);
    } while (grid[row][col].type !== 'empty');

    return [row, col];
  }

  /**
   * finds random end-point of color
   * @param grid 2-dimensional array of cells
   * @param color color to find end cell of
   * @returns touple representing row and column of end cell
   */
  get_cell_of(grid: Cell[][], color: number): [number, number] {
    let endpoints: [number, number][] = [];

    // find start and end cell
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j].color === color) {
          if (grid[i][j].type === 'endpoint') {
            endpoints.push([i, j]);
          }
          if (endpoints.length > 1) break;
        }
      }
      if (endpoints.length > 1) break;
    }
    
    // return either start or end cell
    if (Math.random() < 0.5 && endpoints.length > 1) return endpoints[1];
    return endpoints[0];
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
        return new_cell;
      }
    }

    return undefined;
  }

  /**
   * counts the number of cells of a color
   * @param grid 2-dimensional array of cells
   * @param color color to count
   * @returns number of cells of color
   */
  get_number_of_color(grid: Cell[][], color: number): number {
    let count = 0;
    for (const row of grid) {
      for (const cell of row) {
        if (cell.color === color) count++;
      }
    }
    return count;
  }

}
