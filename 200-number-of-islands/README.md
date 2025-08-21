# Solving a simple graph problem with LeetCode 200 - Number of Islands

Welcome to LeetCode #200! This tutorial demonstrates a typical solution to LeetCode 200, _Number of Islands_, using JavaScript. This tutorial is aimed at developers who are familiar with the basics of JavaScript but less experienced with algorithm problems.

In _Number of Islands_, we are given a 2-dimensional grid where `"1"`s represent land and `"0"`s represent water. When multiple land cells are directly adjacent to each other they are considered part of the same island. The problem asks us to count the number of islands in the graph.

This tutorial will demonstrate how to navigate around a grid programmatically, track visited cells, and maintain a count of islands identified along the way. We will also use a Depth-First Search (DFS) approach to find all the land cells in an island.

## Understand the problem

Number of Islands is often used as an introduction to graph problems, and can feel mind-boggling to the uninitiated. Like many graph problems, it forces you to turn a visual, intuitive task into a step-by-step set of instructions a computer can follow.

For you, a human being, counting islands on a map is trivial - you just look at the map and count. You already have a mental model of how maps work, what islands are (and are not), and can mentally track which islands have already been counted.

In problems like this you need to break down your process into a series of steps, then tackle them one by one. In this problem we need to:

- Check every cell for land
- Find all the land cells in a given island
- Track which cells have already been visited
- Count each island exactly once

## Step 1: Check every cell for land

Let's start with the most basic step: looking at each individual cell.

We can move through the cells one by one using the dimensions of the grid.

We can find those dimensions by looking at the length of the top level array, and then the length of the first row.

```javascript
const numRows = grid.length;
const numCols = grid[0].length;
```

Now we'll write a loop that moves through every cell, row by row.

```javascript
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    // Code for counting islands
  }
}
```

If the cell contains `"0"`, we can ignore it. If the cell contains `"1"`, we know we can proceed.

Note that the grid provides `"0"`s and `"1"`s as strings and not numbers, so our comparison also needs to use a `"1"` instead of just `1`.

```javascript
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    if (grid[row][col] === "1") {
      // Code for counting islands
    }
  }
}
```

## Step 2: Find all the land cells that belong to an island

Once we have identified a land cell, we'll want to look at all the connected cells to see if there are any more land cells that belong to this island.

First, let's separate out this part of the process into a separate function. This helps keep our code clean and will make later steps easier to complete.

```javascript
const exploreIsland = function (currRow, currCol) {
  // Code for identifying an island
};

for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    if (grid[row][col] === "1") {
      exploreIsland(row, col);
      // Code for counting islands
    }
  }
}
```

### Step 2.1: Visit all adjacent cells

We know we need to look at the adjacent cells, but what cells qualify as adjacent?

> An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

Note that we don't need to worry about cells connected diagonally.

We will want to look at each of the four connected cells for land.

We can find each of the cells by making the following changes to our current coordinates:

```javascript
[
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
```

For example, the following diagram shows the four cells we would need to look at if we start from row 1, column 1.

|     | 0   | 1   | 2   |
| --- | --- | --- | --- |
| 0   |     | ◯   |     |
| 1   | ◯   | ◎   | ◯   |
| 2   |     | ◯   |     |

We can reach each of those cells by applying one of the changes from the above array.

- **[1, 0]**: We add 1 to the row to get to (2, 1)
- **[-1, 0]**: We subtract 1 from the row to get to (0, 1)
- **[0, 1]**: We add 1 to the column to get to (1, 2)
- **[0, -1]**: We subtract 1 from the column to get to (1, 0)

With these changes laid out, we can now write a loop that will look at each connected cell for any cell that we visit.

```javascript
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
    // Do something with nextRow, nextCol
  }
};
```

## Step 2.2: Make sure we don't leave the grid

While our loop works for cells in the middle of the grid, this loop presents a problem when we look at cells on the edge of the grid.

Let's bring back the grid from above and show what happens if the current cell is `(0,0)`:

|     | 0   | 1   | 2   |
| --- | --- | --- | --- |
| 0   | ◎   | ◯   |     |
| 1   | ◯   |     |     |
| 2   |     |     |     |

If we run `(0,0)` through our loop we get two invalid sets of coordinates: `(-1, 0)` and `(0, -1)`.

In order to prevent index-out-of-bounds errors, we can add a check to make sure each value is within the grid before we proceed.

To keep the code clean, I'll create a helper function `isValid`, then use that function within our `exploreIsland` function.

For convenience, I'll also use this function to check if the next cell is a land cell.

```javascript
const isValid = function (row, col) {
  return (
    row >= 0 &&
    row < numRows && // Make sure row exists in grid
    col >= 0 &&
    col < numCols && // Make sure column exists in grid
    grid[row][col] === "1" // Check if the valid cell is a land cell
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
      // Code for exploring islands
    }
  }
};
```

We can now explore every adjacent cell. But what do we do if one of those cells is land?

## Step 2.3: Explore the next land cell

Let's say that we just found a land cell. Islands can consist of any number of land cells, so we now need to check the adjacent cells for this new land cell. We'll want to run all the same code on this newly discovered land cell.

We can do this by calling the `exploreIsland` function again using recursion.

```javascript
const exploreIsland = function (currRow, currCol) {
  for (const [rowChange, colChange] of adjCoords) {
    let nextRow = currRow + rowChange;
    let nextCol = currCol + colChange;
    if (isValid(nextRow, nextCol)) {
      exploreIsland(nextRow, nextCol); // exploreIsland calls itself
    }
  }
};
```

Recursion is the process where a function can call itself. Each call is added to the call stack, which is what we call the computer's list of actions to perform.

Let's walk through what recursion might look like in our `exploreIsland` function.

First, we'll call `exploreIsland(0,0)`. While running this function it finds an adjacent land cell at `(0,1)` and calls `exploreIsland(0,1)` right away.

- exploreIsland(0,0)
  - exploreIsland(0,1)

The second `exploreIsland` is nested inside the top `exploreIsland` - the nested command will completely finish before the top `exploreIsland` proceeds to the next adjacent cell.

Let's say that second `exploreIsland` finds a land cell at `(0,2)` and calls `exploreIsland(0,2)`.

- exploreIsland(0,0)
  - exploreIsland(0,1)
    - exploreIsland(0,2)

The stack continues to grow as long as new land cells are found. Once an individual call has no more neighbors left to explore, it closes and is removed from the stack. The program then continues where it left off in the previous call.

This "going as deep as possible, then backing up" is why it's called a Depth-First Search (DFS).

Recursion is a big topic in algorithmic problems, and this is just a surface-level exploration of a fairly simple use case. You don't have to understand it perfectly right now, but if you're feeling confused it's worth studying this concept more in-depth.

Now, if you've been paying attention, you may have noticed that the code above has a pretty glaring bug. We'll explain that bug, and how to fix it, in the next section.

## Step 3: Visit only unseen cells

If you tried to run our current code you may have discovered that it gives a `Time Exceeded` error.

This is because we don't have any way to track which cells have already been visited.

Let's say you have a grid with exactly two connected cells like this:

|     | 0   | 1   | 2   |
| --- | --- | --- | --- |
| 0   |     |     |     |
| 1   |     | ◎   | ◎   |
| 2   |     |     |     |

First, `exploreIsland` visits `(1, 1)` and finds a land cell at `(1, 2)`.

Then, when `exploreIsland` visits `(1, 2)` it finds the original land cell at `(1, 1)`.

At this point `exploreIsland` will visit `(1, 1)` again, where it finds `(1, 2)`, jumping back and forth in an infinite loop.

To prevent this from happening we need a way of recording which cells have already been visited. That way we can avoid getting trapped in an infinite loop.

### Step 3.1: Create a grid to track seen cells

To record the state of each cell, we will create a copy of the grid and name it `seen`. We will pre-fill every cell with `false`. Then, whenever we visit a land cell in our original grid, we'll change that cell in our `seen` grid to `true`.

The simplest way to do this is by using a for loop to first create the top level array, then create a new nested array filled with `false` for each row.

```javascript
const seen = new Array(numRows);
for (let i = 0; i < numRows; i++) {
  seen[i] = new Array(numCols).fill(false); // This creates a new array for each row
}
```

---

#### Important: Make sure you create a separate array for each row

I need to stop here and give you a warning specific to JavaScript. When you create your grid you may feel tempted to use the following syntax:

```javascript
const seen = new Array(numRows).fill(new Array(numCols).fill(false));
// Don't do this!!!
```

When you try to fill the top array using `.fill(newArray(...))` it only creates a single new array. Each row becomes a repeated reference back to this single new array.

Imagine a scoreboard where the score for each quarter just references a single variable. It would look like every quarter has the same score, when in reality you are only keeping score for the current quarter and repeating it on the scoreboard four times.

This can create some tricky bugs, but it's easily avoided by creating a separate new array for each row, like we do in the syntax above.

Now back to our tutorial!

---

### Step 3.2: Check for and update seen cells

With our seen grid created, we can now check if a cell has already been seen. If it's unseen, we'll mark it as seen as we visit it.

We do that at two points: In our core loop that looks at every cell and in our `exploreIsland` function that explores adjacent cells.

In the core loop we can add a seen check right after we check for land. Then, we'll mark the land cells we visit as seen.

```javascript
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    if (
      grid[row][col] === "1" && // Check for land
      seen[row][col] === false // Check if seen
    ) {
      seen[row][col] = true; // Mark as seen
      exploreIsland(row, col);
    }
  }
}
```

For the `exploreIsland` function, we can add our seen check to the isValid function. This helps keep `exploreIsland` clean and focused.

```javascript
const isValid = function (row, col) {
  return (
    row >= 0 &&
    row < numRows && // Check if row exists
    col >= 0 &&
    col < numCols && // Check if column exists
    grid[row][col] === "1" && // Check for land
    seen[row][col] === false // Check seen
  );
};
```

And now in `exploreIsland` we'll mark valid cells before visiting them.

```javascript
const exploreIsland = function (currRow, currCol) {
  for (const [rowChange, colChange] of adjCoords) {
    let nextRow = currRow + rowChange;
    let nextCol = currCol + colChange;
    if (isValid(nextRow, nextCol)) {
      seen[nextRow][nextCol] = true; // Mark the new valid cell as seen
      exploreIsland(nextRow, nextCol);
    }
  }
};
```

With seen cells being tracked, our recursive function will now naturally stop once it has visited all the connected land cells.

## Step 4: Count each island only once

At this point we have done a lot. We have:

- Written a loop that will look at every cell one by one
- Written a DFS function that will find every cell in an island
- Created a seen grid that tracks cells that have been visited.

The last step that remains is counting each island exactly once.

With seen in place, this becomes simple. With our for loop we are already visiting every cell sequentially. When we find a land cell our `exploreIsland` function marks every connected land cell as seen.

Therefore, all we need to do is count how many _unseen_ land cells our for loop discovers. If we find an unseen land cell, we know it must be a new island since all the land cells in our discovered islands have already been visited.

Let's add the count to our original loop.

```javascript
let islandCount = 0;

for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    if (grid[row][col] === "1" && seen[row][col] === false) {
      seen[row][col] = true;
      islandCount++; // Count unseen land cells
      exploreIsland(row, col);
    }
  }
}
```

And, last but not least, we'll return that count as our answer.

```javascript
return islandCount;
```

And that's it! We have counted all the islands. We analyzed the problem, broke it down into smaller manageable steps, then wrote code to accomplish each step.

As a recap, we wrote code to:

1. Check every cell in the grid for land
2. Find all connected cells that make up an island
3. Track which cells have already been seen
4. Count the number of distinct islands

Our solution is now ready for submission.

## Complete Solution

Here's the entire solution, including code from all of our steps:

```javascript
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
```

Thanks so much for working through this tutorial with me! Hopefully you now have a better sense of how to approach a simple graph problem like this one.

If there's another problem you'd like to see me write up, leave a comment and let me know.
