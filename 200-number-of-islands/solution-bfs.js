const numRows = grid.length;
const numCols = grid[0].length;

// Helpers for 4 way travel
const adjCoords = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const isLand = function (row, col) {
  return (
    row >= 0 &&
    row < numRows &&
    col >= 0 &&
    col < numCols &&
    grid[row][col] === "1"
  );
};

// Grid for tracking seen cells
const seen = new Array(numRows);
for (let i = 0; i < numRows; i++) {
  seen[i] = new Array(numCols).fill(false);
}
console.log(seen);

// DFS helper for visiting all connected squares
const dfs = function (row, col) {
  for (const [drow, dcol] of adjCoords) {
    let nextRow = row + drow;
    let nextCol = col + dcol;
    if (isLand(nextRow, nextCol) && !seen[nextRow][nextCol]) {
      seen[nextRow][nextCol] = true;
      dfs(nextRow, nextCol);
    }
  }
};

// Iterate through all cells, counting unseen land cells
let numIslands = 0;
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    if (grid[row][col] === "1" && !seen[row][col]) {
      numIslands++;
      seen[row][col] = true;
      dfs(row, col);
    }
  }
}

return numIslands;
