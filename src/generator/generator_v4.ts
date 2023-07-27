
// 1. a grid must be fully filled
// 2. a path must be at least 3 cells long
// 3. a path may not cross another path
// 4. a cell in a path may not be adjacent to more than 2 other cells in the path


type CellType = 'empty' | 'endpoint' | 'path';

interface Cell {
  type: CellType;
  color: number;
}


export class GeneratorV4 {

  private color = 0;

  constructor() {}

  // check later how the middle will be filled or how to make sure that paths are at least 3 cell long

  // then check how this works for arbitrary grid sizes, for example 6x9, 1x8 etc. or even 3x3 + 1 (I guess the ring will then be what is furthest away from the middle)

  generate(): number[][] {

    const width = 9;
    const height = 9;

    // create grid
    let grid: Cell[][] = Array.from({length: height}, () => Array.from({length: width}, () => ({type: 'empty', color: 0})));
    

    this.fill_ring(grid, 0);
    this.extend_ring(grid, 0);
    this.fill_ring(grid, 1);


    // translate grid to color grid
    const color_grid: number[][] = grid.map(row => row.map(cell => cell.color));

    return color_grid;
  }

  /**
   * fills a ring with random paths
   * @param grid 2-dimensional array of cells
   * @param ring ring index
   */
  fill_ring(grid: Cell[][], ring: number) {

    // convert ring to array of cells
    const cells = this.get_ring_cells(grid, ring);

    // complete any remaining paths in ring
    let remaining_cells: number[] = []; // array of indexes of cells that are endpoints
    cells.forEach((cell, index) => {
      if (this.get_cell(grid, cell).type === 'endpoint') remaining_cells.push(index);
    });

    for (const cell_index of remaining_cells) {
      if (Math.random() < 0.5) continue; // 50% chance to skip this endpoint (to make it more random)

      // check direction to move in
      const left = (cell_index - 1) % cells.length; // MODULO DOES NOT WORK FOR NEGATIVE NUMBERS IN JAVASCRIPT
      const right = (cell_index + 1) % cells.length;

      console.log("cell_index: " + cell_index + ", cells_length: " + cells.length + ", left: " + left + ", right: " + right);
      console.log(cells);

      const neighbours_left = this.get_n_adjacent(grid, cells[left], this.get_cell(grid, cells[cell_index]).color);
      const neighbours_right = this.get_n_adjacent(grid, cells[right], this.get_cell(grid, cells[cell_index]).color);

      let direction = 0;
      if (this.get_cell(grid, cells[left]).type === 'empty' && neighbours_left < 2) direction = -1;
      else if (this.get_cell(grid, cells[right]).type === 'empty' && neighbours_right < 2) direction = 1;

      if (direction !== 0) {
        console.log("direction found");
        const path_length = Math.floor(Math.random() * (cells.length - 1)) + 1; // pick random length

        for (let i = 0; i < path_length; i += direction) {
          const cell = this.get_cell(grid, cells[(cell_index + i) % cells.length]);
          const next_cell_index = (cell_index + direction) % cells.length;
          const next_cell = this.get_cell(grid, cells[next_cell_index]);

          if (cell.type !== 'empty') break;

          // first and last cells are endpoints
          const cell_type = (i === 0 || i === path_length - 1 || next_cell.type !== 'empty') ? 'endpoint' : 'path';

          cell.type = cell_type;
          cell.color = this.get_cell(grid, cells[cell_index]).color;
        }
      }
    }
   

    // fill ring with more paths
    while (cells.some(cell => this.get_cell(grid, cell).type === 'empty')) {
      let path_length = Math.floor(Math.random() * (cells.length - 1)) + 1; // pick random length
      let cell_index = (Math.floor(Math.random() * cells.length));          // pick random cell

      for (let i = 0; i < path_length; i++) {
        const cell = this.get_cell(grid, cells[cell_index]);
        const next_cell_index = (cell_index + 1) % cells.length;
        const next_cell = this.get_cell(grid, cells[next_cell_index]);

        if (cell.type !== 'empty') break;

        if (i === 0) this.color++; // as this is a new path, we get a new color

        // first and last cells are endpoints
        const cell_type = (i === 0 || i === path_length - 1 || next_cell.type !== 'empty') ? 'endpoint' : 'path';

        cell.type = cell_type;
        cell.color = this.color;

        // array is circular
        cell_index++;
        if (cell_index >= cells.length) cell_index = 0;
      }
    }
  }

  /**
   * takes random endpoints on a ring and extends them 1 cell to the next inner ring
   * @param grid 2-dimensional array of cells
   * @param ring ring which we want to extend
   */
  extend_ring(grid: Cell[][], ring: number) {
    const cells = this.get_ring_cells(grid, ring);
    // for each endpoint in cells
    cells.forEach(cell => {
      if (this.get_cell(grid, cell).type === 'endpoint') {
        const expand = Math.floor(Math.random() * 2); // 0 or 1
        if (expand) {
          const inner_cell = this.get_inner_cell(grid, cell, ring);
          if (inner_cell && this.get_cell(grid, inner_cell).type === 'empty') {
            this.get_cell(grid, inner_cell).type = 'endpoint';
            this.get_cell(grid, inner_cell).color = this.get_cell(grid, cell).color;
      
            this.get_cell(grid, cell).type = 'path';
          }
        }
      }
    });
  }

  /**
   * expands a path inwards of the grid
   * @param grid 2-dimensional array of cells
   * @param cell endpoint cell to expand inwards
   * @param ring current ring of cell
   */
  get_inner_cell(grid: Cell[][], cell: [number, number], ring: number): [number, number] | null {
    let inner_cell: [number, number] | null = null;
    
    if (cell[0] === ring && cell[1] > ring && cell[1] < grid[0].length - 1 - ring) {
      // if cell is on top, move down
      inner_cell = [cell[0] + 1, cell[1]];
    } else if (cell[0] === grid.length - 1 - ring && cell[1] > ring && cell[1] < grid[0].length - 1 - ring) {
      // if cell is on bottom, move up
      inner_cell = [cell[0] - 1, cell[1]];
    } else if (cell[1] === ring && cell[0] > ring && cell[0] < grid.length - 1 - ring) {
      // if cell is on left, move right
      inner_cell = [cell[0], cell[1] + 1];
    } else if (cell[1] === grid[0].length - 1 - ring && cell[0] > ring && cell[0] < grid.length - 1 - ring) {
      // if cell is on right, move left
      inner_cell = [cell[0], cell[1] - 1];
    }

    if (inner_cell) {
      if (this.get_n_adjacent(grid, inner_cell, this.get_cell(grid, cell).color) < 2) return inner_cell;
    }

    return null;
  }

  /**
   * returns cell object from grid
   * @param grid 2-dimensional array of cells
   * @param cell cell position to find
   * @returns Cell object
   */
  get_cell(grid: Cell[][], cell: [number, number]): Cell {
    return grid[cell[0]][cell[1]];
  }

  /**
   * returns all cells in the ring index as a 1-dimensional array
   * @param grid 2-dimensional array of cells
   * @param ring ring index
   */
  get_ring_cells(grid: Cell[][], ring: number): [number, number][] {
    let cells: [number, number][] = [];
    // top
    for (let i = ring; i < grid[0].length - ring; i++) {
      cells.push([ring, i]);
    }
    // right
    for (let i = ring + 1; i < grid.length - ring; i++) {
      cells.push([i, grid[0].length - 1 - ring]);
    }
    // bottom
    if (grid.length - 1 - ring > ring) { // Prevent duplicates if it's the same line
      for (let i = grid[0].length - 2 - ring; i >= ring; i--) {
        cells.push([grid.length - 1 - ring, i]);
      }
    }
    // left
    if (grid[0].length - 1 - ring > ring) { // Prevent duplicates if it's the same column
      for (let i = grid.length - 2 - ring; i > ring; i--) {
        cells.push([i, ring]);
      }
    }
    return cells;
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

}
