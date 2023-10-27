import * as tf from '@tensorflow/tfjs-node';

type CellType = 'empty' | 'endpoint' | 'path';

interface Cell {
  type: CellType;
  color: number;
}

export class GeneratorV5 {
  private color: number = 1;

  constructor() {}

  /**
   * Works by splitting the grid into rings, extending endpoints from one ring to another and filling them with paths
   * 
   * @returns a 2-dimensional array of cells
   */
  generate(width: number, height: number): Cell[][] {

    // create grid
    let grid: Cell[][] = Array.from({length: height}, () => Array.from({length: width}, () => ({type: 'empty', color: 0})));

    grid[0][0].color = 1;
    grid[0][0].type = 'endpoint';

    return grid;
  }
}