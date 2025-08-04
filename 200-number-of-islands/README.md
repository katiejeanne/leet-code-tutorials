_The following tutorial is currently in progress. Come back soon to see the final result._

# An introduction to graph problems with LeetCode 200 - Number of Islands

This tutorial demonstrates a typical solution to LeetCode 200, _Number of Islands_, using JavaScript. This tutorial is aimed at developers who are familiar with the basics of JavaScript but less experienced with algorithm practice problems.

A graph problem looks at a set of nodes and their connections, known as a graph, and analyzes that structure in some way.

In _Number of Islands_, the graph takes the form of a 2-dimensional array where `1`s represent land and `0`s represent water. When multiple land cells are directly adjacent to each other they are considered part of the same island. The problem asks us to count the number of islands in the graph.

This tutorial will demonstrate how to navigate around a grid programmatically, track visited cells, and maintain a count of islands identified along the way. We will also write a Depth-First Search (DFS) function to help us group land cells into islands. In the end, we'll have created a solution that uses DFS to count each island in the provided grid.

## Understand the problem

This is one of the most popular graph problems on LeetCode - and one of the most disorienting the first time you try it. Why? Because it forces you to turn a visual, intuitive task into a step-by-step set of instructions a computer can follow.

For you, a human being, counting islands on a map is trivial - you just look at the map and count. You already have a mental model of how maps work, what islands are (and are not), and what it means to "count."

What you will need to do is take your mental model of that process and figure out how to translate it into a series of steps that can be accomplished with code.

How you break down the steps will vary, but will probably look something like this:

- Look at every cell in the grid
- Recognize land versus water
- Find all the land cells that belong in an island
- Track which cells have already been visited
- Count each island only once

These are the steps we will be following throughout the rest of the tutorial.

## Step one: Look at every cell in the grid

At this point you may not have a clear picture yet of how to accomplish all of these steps. That's fine. For now we'll start with the most basic step: looking at each individual cell.

Writing a loop that looks at every cell is fairly straightforward.

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

Remember, we are counting islands, not land cells. This means we will eventually want to increase our island count only if we know it is an entirely new island and not simply a land cell connected to an existing island.

First, let's separate out this part of the process into a separate function. This will help make the code easier to follow.

```javascript
const identifyIsland = function (currRow, currCol) {
  // Code for identifying an island
};

for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    if (grid[row][col] === 1) {
      identifyIsland(row, col);
      // Code for counting islands
    }
  }
}
```

### Step 3.1: Visit all adjacent cells

At this point we want to look only at the cells that are connected to the current cell. From the problem description we know that that is only the cells to the left, right, above, and below.

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

const identifyIsland = function (currRow, currCol) {
  for (const [rowChange, colChange] of adjCoords) {
    let nextRow = currRow + rowChange;
    let nextCol = currCol + colChange;
    // Code for looking at adjacent cells
  }
};
```

Now we have all the code we need to look at the adjacent cells from our starting cell.

## Step three part two: Continue until all cells are found

Let's say we find that one of the cells
