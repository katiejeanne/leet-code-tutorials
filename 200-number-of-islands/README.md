_The following tutorial is currently in progress. Come back soon to see the final result._

# Solving a simple graph problem with LeetCode 200 - Number of Islands

Welcome to LeetCode #200! This tutorial demonstrates a typical solution to LeetCode 200, _Number of Islands_, using JavaScript. This tutorial is aimed at developers who are familiar with the basics of JavaScript but less experienced with algorithm problems.

In _Number of Islands_, the problem presents a graph in the form of a 2-dimensional array where `1`s represent land and `0`s represent water. When multiple land cells are directly adjacent to each other they are considered part of the same island. The problem asks us to count the number of islands in the graph.

This tutorial will demonstrate how to navigate around a grid programmatically, track visited cells, and maintain a count of islands identified along the way. We will also write a Depth-First Search (DFS) function to help us group land cells into islands. In the end, we'll have created a solution that uses DFS to count each island in the provided grid.

## Understand the problem

This is one of the most popular graph problems on LeetCode - and one of the most disorienting the first time you try it. Why? Because it forces you to turn a visual, intuitive task into a step-by-step set of instructions a computer can follow.

For you, a human being, counting islands on a map is trivial - you just look at the map and count. You already have a mental model of how maps work, what islands are (and are not), and can mentally track which islands have already been counted.

In problems like this you need to break down your process into a series of steps, then tackle them one by one. In this problem we need to:

- Look at every cell in the grid
- Recognize a land cell (versus a water cell)
- Find all the land cells in a given island
- Track which cells have already been visited
- Count each island only once

## Step one: Look at every cell in the grid

Let's start with the most basic step: looking at each individual cell.

We can move through the cells one by one using the dimensions of the grid. We can find its dimensions by looking at the length of the top level array, and then the length of the first row.

```javascript
const numRows = grid.length;
const numCols = grid[0].length;
```

Now we'll write a loop that move through each row, looking at every cell in that row.

```javascript
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    // Code for counting islands
  }
}
```

## Step two: Recognize land versus water

If the cell contains `0`, we can ignore it. If the cell contains `1`, we proceed to the next step.

```javascript
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    if (grid[row][col] === 1) {
      // Code for counting islands
    }
  }
}
```

## Step three: Find all the land cells that belong to an island

Once we have identified a land cell, we'll want to look at all the connected cells to see if there are any additional land cells that should be counted as part of the current island.

First, let's separate out this part of the process into a separate function. This helps clean up our code and will come in handy later.

```javascript
const exploreIsland = function (currRow, currCol) {
  // Code for identifying an island
};

for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    if (grid[row][col] === 1) {
      exploreIsland(row, col);
      // Code for counting islands
    }
  }
}
```

### Step 3.1: Visit all adjacent cells

At this point we want to look only at the cells that are connected to the current cell. The problem defines what cells are connected.

> An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. `

Note that we don't need to worry about cells connected diagonally.

We will want to look at each of the four connected cells and determine if each cell is land or water.

The following diagram shows the four cells we would need to look at if we start from row 1, column 1.

|     | 0   | 1   | 2   |
| --- | --- | --- | --- |
| 0   |     | ◯   |     |
| 1   | ◯   | ◎   | ◯   |
| 2   |     | ◯   |     |

The changes we need to make to our current coordinates to reach each connected cell is as follows:

- We add 1 to the row to get to (2, 1)
- We subtract 1 from the row to get to (0, 1)
- We add 1 to the column to get to (1, 2)
- We subtract 1 from the column to get to (1, 0)

We can represent these changes in an array like so:

```javascript
[
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];
```

With these changes laid out, we can now write a loop that will look at each connected cell for any cell that we visit.

```javascript
const adjCoords = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

const exploreIsland = function (currRow, currCol) {
  for (const [rowChange, colChange] of adjCoords) {
    let nextRow = currRow + rowChange;
    let nextCol = currCol + colChange;
    // Code for looking at adjacent cells
  }
};
```

## Step three part two: Make sure we don't leave the grid

While our loop works for cells in the middle of the grid, this loop does present a problem when we look at cells on the edge of the grid.

Let's bring the grid from above back, but let's look at what happens if the current cell is (0,0):

|     | 0   | 1   | 2   |
| --- | --- | --- | --- |
| 0   | ◎   | ◯   |     |
| 1   | ◯   |     |     |
| 2   |     |     |     |

If we run (0,0) through our loop we get two invalid set of coordinates: (-1, 0) and (0, -1).

In order to prevent errors from trying to look at cells outside the grid, we can add a check to make sure each value is within the grid.

I'll create a helper function `isValid` then use it within the loop.

For convenience, I'll also use this function to check if the next cell is a land cell instead of a water cell.

```javascript
const isValid = function (row, col) {
  return (
    row >= 0 &&
    row < numRows &&
    col >= 0 &&
    col < numCols &&
    grid[row][col] === 1
  );
};

const adjCoords = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

const exploreIsland = function (currRow, currCol) {
  for (const [rowChange, colChange] of adjCoords) {
    let nextRow = currRow + rowChange;
    let nextCol = currCol + colChange;
    if (isValid(nextRow, nextCol)) {
      // Code for exploring islands
    }
  }
};
```

## Step Three Part Three: Explore the next land cell

At this point let's say we have looked at the adjacent cells and found that one is a valid land cell. What do we do next?

There may be additional land cells connected to this new cell. This means we'll want to run all the same tests on this new land cell just like we did with the current one.

We can do that by calling the exploreIsland function again using recursion.

```javascript
const exploreIsland = function (currRow, currCol) {
  for (const [rowChange, colChange] of adjCoords) {
    let nextRow = currRow + rowChange;
    let nextCol = currCol + colChange;
    if (isValid(nextRow, nextCol)) {
      exploreIsland(nextRow, nextCol);
    }
  }
};
```

// Do I need to go more into depth on recursion?

Now exploreIsland will continue to call itself on each new land cell until it runs out of land cells... or will it?

## Step four: Track visited cells

If you tried to run the exploreIsland function after our last step you may have discovered that it gives a `Time Exceeded` error.

This is because we don't have any way to track which cells have already been visited.

Let's say you have an island with exactly two connected cells like this:

|     | 0   | 1   | 2   |
| --- | --- | --- | --- |
| 0   |     |     |     |
| 1   |     | ◎   | ◎   |
| 2   |     |     |     |

First, exploreIslands() visits (1, 1) and finds a land cell at (1, 2). Then, when exploreIslands() visits (1, 2) it finds the original land cell at (1, 1). The exploreIsland function will continually jump back and forth between the two cells forever because there is nothing to tell the loop that we already found the other cell.

To record the state of each cell--whether it has been seen or unseen--we will create a copy of the grid using a second 2-dimensional array. Cells that we haven't seen yet will be labeled as false. When we visit a land cell we'll mark the corresponding cell in our seen grid as `true`.

When you create your grid you may feel tempted to use the following syntax:

```javascript
const seen = new Array(numRows).fill(new Array(numCols).fill(false));
// Don't do this!!!
```

When you try to fill our top array using `.fill(newArray(...))` it only creates a single new array. Each row becomes a repeated reference back to this single new array, giving you x references back to a single array instead of x arrays. This can create some tricky bugs, but it's easily avoided by creating a separate new array for each row.

The simplest way to do this is by using a for loop instead of the .fill() command.

```javascript
const seen = new Array(numRows);
for (let i = 0; i < numRows; i++) {
  seen[i] = new Array(numCols).fill(false); // This creates a new array for each row
}
```

With our seen grid created we can now add a check to the isValid helper function to make sure the next cell hasn't already been seen.

```javascript
const isValid = function (row, col) {
  return (
    row >= 0 &&
    row < numRows &&
    col >= 0 &&
    col < numCols &&
    grid[row][col] === 1 &&
    seen[row][col] === false
  );
};
```

Now that we can track the state of each cell, each time we visit one we need to mark it as seen. We'll do this both in our core loop and in our exploreIsland function.

In the core loop we'll check first if a cell is seen. If it isn't seen, we'll mark it as seen before we call exploreIsland.

```javascript
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    if (grid[row][col] === 1 && seen[row][col] === false) {
      seen[row][col] = true;
      exploreIsland(row, col);
      // Code for counting islands
    }
  }
}
```

In the exploreIsland function we already check inside the isValid function if the next cell is seen, so we only need to add a command to mark the next cell as seen.

```javascript
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
```

With seen cells being tracked, our recursive function will now naturally stop once it has visited all the connected land cells.

Let's review all the code we have up to this point:

```javascript
const isValid = function (row, col) {
  return (
    row >= 0 &&
    row < numRows &&
    col >= 0 &&
    col < numCols &&
    grid[row][col] === 1 &&
    seen[row][col] === false
  );
};

const adjCoords = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
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

for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    if (grid[row][col] === 1 && seen[row][col] === false) {
      seen[row][col] = true;
      exploreIsland(row, col);
      // Code for counting islands
    }
  }
}
```

Step Five: Count each island only once

At this point we have done a lot. We have:

- Written a loop that will look at every cell one by one
- Written a DFS function that will find every cell in an island
- Created a seen grid that tracks cells that have been visited.

The last step that remains is counting each island only once.

Back in our original loop we are already looking at each cell, checking if it has been seen, then exploring the entire island when a new land cell is found. Each time we visit an island we are marking every land cell in that island as seen.

Therefore, when our original loop finds a new unseen land cell, we can increase our island count by 1. The exploreIsland function will then go and mark every land cell in the island as seen without affecting our island count.

Let's add the count to our original loop.

```javascript
let numIslands = 0;

for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    if (grid[row][col] === 1 && seen[row][col] === false) {
      seen[row][col] = true;
      numIslands++;
      exploreIsland(row, col);
    }
  }
}
```

Step Six: Return the result

That's it! We have successfully counted every island present in the graph. The last step, and, if you're like me, the easiest to forget, is returning the result.

Here's the entire solution, including the return at the end.

```javascript
const isValid = function (row, col) {
  return (
    row >= 0 &&
    row < numRows &&
    col >= 0 &&
    col < numCols &&
    grid[row][col] === 1 &&
    seen[row][col] === false
  );
};

const adjCoords = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
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

let numIslands = 0;

for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    if (grid[row][col] === 1 && seen[row][col] === false) {
      seen[row][col] = true;
      numIslands++;
      exploreIsland(row, col);
    }
  }
}

return numIslands;
```

Thanks so much for working through this tutorial with me. Hopefully now you have a better sense of how to approach a simple graph problem like this one.

If there's another problem you'd like to see me write up, possibly a more advanced graph problem, leave it in the comments.
