const numRows = grid.length;
const numCols = grid[0].length;

const seen = new Array(numRows);
for (let i = 0; i < numRows; i++) {
  seen[i] = new Array(numCols).fill(false);
}

const isValid = function (row, col) {
  return (
    row >= 0 &&
    row < numRows &&
    col >= 0 &&
    col < numCols &&
    grid[row][col] === "1" &&
    seen[row][col] === false
  );
};

const adjCoords = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const exploreIsland = function (currRow, currCol) {
  for (const [rowChange, colChange] of adjCoords) {
    let nextRow = currRow + rowChange;
    let nextCol = currCol + colChange;
    if (isValid(nextRow, nextCol)) {
      seen[nextRow][nextCol] = true;
      exploreIsland(nextRow, nextCol);
    }
  }
};

let islandCount = 0;

for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    if (grid[row][col] === "1" && seen[row][col] === false) {
      seen[row][col] = true;
      islandCount++;
      exploreIsland(row, col);
    }
  }
}

return islandCount;
