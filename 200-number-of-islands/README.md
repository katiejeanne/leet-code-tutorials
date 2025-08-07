_The following tutorial is currently in progress. Come back soon to see the final result._

# An introduction to graph problems with LeetCode 200 - Number of Islands

This tutorial demonstrates a typical solution to LeetCode 200, _Number of Islands_, using JavaScript. This tutorial is aimed at developers who are familiar with the basics of JavaScript but less experienced with LeetCode style problems.

A graph problem looks at a set of nodes and their connections, known as a graph, and analyzes that structure to answer the given question.

In _Number of Islands_, the graph takes the form of a 2-dimensional array where `1`s represent land and `0`s represent water. When multiple land cells are directly adjacent to each other they are considered part of the same island. The problem asks us to count the number of islands in the graph.

This tutorial will demonstrate how to navigate around a grid programmatically, track visited cells, and maintain a count of islands identified along the way. We will also write a Depth-First Search (DFS) function to help us group land cells into islands. In the end, we'll have created a solution that uses DFS to count each island in the provided grid.

## Understand the problem

This is one of the most popular graph problems on LeetCode - and one of the most disorienting the first time you try it. Why? Because it forces you to turn a visual, intuitive task into a step-by-step set of instructions a computer can follow.

For you, a human being, counting islands on a map is trivial - you just look at the map and count. You already have a mental model of how maps work, what islands are (and are not), and can mentally track which islands have already been counted.

In problems like this you need to break down your process into a series of steps, then tackle them one by one. In this problem we need to:

- Look at every cell in the grid
- Recognize a land cell (versus a water cell)
- Find all the land cells that belong in an island
- Track which cells have already been visited
- Count each island only once

## Step one: Look at every cell in the grid

At this point you may not have a clear picture yet of how to accomplish all of these steps. That's fine. For now we'll start with the most basic step: looking at each individual cell.

Writing a loop that looks at every cell is fairly straightforward. Once we have the dimensions of the grid we can use that information to write a for loop that will look at each cell.

The input we receive is a 2-dimensional array, or an array of arrays. We can find its dimensions by looking at the length of the top level array, and the length of the first row.

```javascript
const numRows = grid.length;
const numCols = grid[0].length;
```

We can then use the dimensions of the grid to write a loop that looks at each individual cell.

```javascript
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    // Code for counting islands
  }
}
```

## Step two: Recognize land versus water

A simple check of the cell's contents will help us identify land cells for further processing. If the cell contains `0`, we can ignore it. If the cell contains `1`, we proceed to the next step.

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

Once we have identified a land cell, we'll want to look at all the connected cells to see if they are part of the current island.

Remember, we are counting islands, not land cells. This means we will eventually want to increase our island count only if we know that the current land cell is an entirely new island and not simply a land cell connected to an existing island.

First, let's separate out this part of the process into a separate function. This will help make the code easier to follow.

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

At this point we want to look only at the cells that are connected to the current cell. From the problem description we know that we only need to look at the cells to the left and to the right, as well as the cells above and below.

> An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. `

Note that we don't need to worry about cells connected diagonally.

The following diagram shows the four cells we would need to look at if we start from row 1, column 1.

|     | 0   | 1   | 2   |
| --- | --- | --- | --- |
| 0   |     | ◯   |     |
| 1   | ◯   | ◎   | ◯   |
| 2   |     | ◯   |     |

What we need is a pattern we can use to find the adjacent coordinates for _any_ cell we visit.

To do this, let's look at the changes we need to make to the above starting coordinates to find the adjacent cells of (1, 1).

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

Now we can write a loop that will look at each of the adjacent cells:

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

Now we have all the code we need to look at the adjacent cells from our starting cell.

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

For convenience, I'll also check to make sure the next cell is a land cell instead of a water cell.

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

At this point let's say we have looked at the adjacent cells and found that one is a valid land cell. What do we next?

We want to find all the connected land cells, so we need to keep going until we have found every cell, which means repeating the whole process with the next cell.

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

Now exploreIsland will continue to call itself on each new land cell until it runs out of land cells.

// Determine how in depth to explain recursion, and to what degree to lead into next step.

## Step four: Track visited cells

If you tried to run the exploreIsland function after our last step you may have discovered that it gives a Time Exceeded error.

The issue with the above code is that the loop continually explores all the land cells connected to the current cell, without regard to what cells have already been visited.

Let's say you have an island with exactly two connected cells. The exploreIsland function will continually jump back and forth between the two cells forever because there is nothing to tell the loop when to stop.

At this point we will want to create a separate grid that will allow us to track which cells have already been visited. We'll make a copy of the grid and set the value of each cell to `false` initially.

```javascript
const seen = new Array(numRows);
for (let i = 0; i < numRows; i++) {
  seen[i] = new Array(numCols).fill(false);
}
```

You may be tempted to use .fill() on the top level with the new Array syntax to represent columns. The problem with this is only one new Array is created, and every row of the seen grid is a reference to the single new array. This can be a particularly annoying bug to figure out, but it's easy to avoid by creating a new array for each row.

```javascript
const seen = new Array(numRows).fill(new Array(numCols).fill(false)); // Don't do this
```

With our seen grid created we can now add a check to the isValid helper function.

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

Now each time we visit a new cell we'll mark it as seen. We'll do this both in our core loop and in our exploreIsland function.

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
    if (grid[row][col] === 1) {
      seen[row][col] = true;
      exploreIsland(row, col);
      // Code for counting islands
    }
  }
}
```
