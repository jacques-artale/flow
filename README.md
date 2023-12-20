# flow
The idea is to create a generator for numberlink puzzles.
In order to be classified as a valid puzzle each board must follow a set of rules:
1. The board must be fully filled by paths
2. Each path must have a single start and a single end
3. Each path must be at least 3 cells long
4. A cell may not be adjacent with more than two cells of the same path
<table>
  <tr>
    <td><img src="images/Numberlink_puzzle.png" alt="Unsolved numberlink puzzle" width="300" height="300"/></td>
    <td><img src="images/Numberlink_puzzle_solution.png" alt="Solved numberlink puzzle" width="300" height="300"/></td>
  </tr>
</table>

Generated examples created with this repo:
<table>
  <tr>
    <td><img src="images/Generated.png" alt="Solved numberlink puzzle" width="300" height="300"/></td>
    <td><img src="images/Generated2.png" alt="Solved numberlink puzzle" width="300" height="300"/></td>
  </tr>
</table>

Live demo (it may be tired, give it a few seconds to wake up): https://numberlink-flow-844375fce804.herokuapp.com/

How to run:
1. `git clone [repo url]`
2. `cd flow && npm install && npm run start`
3. In a second terminal run: `cd flow/client && npm run start`

Alternatively:
1. `git clone [repo url]`
2. `cd flow && npm install && npm run build && npm run start`
