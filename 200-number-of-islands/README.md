_The following tutorial is currently in progress. Come back soon to see the final result._

# An introduction to graph problems with LeetCode 200 - Number of Islands

This tutorial demonstrates a typical solution to LeetCode 200, _Number of Islands_, using JavaScript. We'll work from the ground up and show how to break down a graph problem into smaller, solvable pieces. This tutorial is aimed at developers who are familiar with the basics of JavaScript but less experienced with algorithm practice problems.

A graph problem looks at a set of nodes and their connections, known as a graph, and analyzes that structure in some way. In _Number of Islands_, the graph takes the form of a 2-dimensional array where `1`s represent land and `0`s represent water. When multiple land cells are directly adjacent to each other they are considered part of the same island. The problem asks us to count the number of islands in the graph.

This tutorial will demonstrate how to navigate around a grid programmatically, track visited cells, and maintain a count of islands identified along the way. We will look at both a depth-first search (DFS) and a breadth-first search (BFS) approach and compare the differences. In the end, we'll have two possible solutions—one using DFS and one using BFS.

## Understand the problem

This is one of the most popular graph problems on LeetCode - and one of the most disorienting the first time you try it. Why? Because it forces you to turn a visual, intuitive task into a step-by-step set of instructions a computer can follow.

For you, a human being, counting islands on a map is trivial - you just look at the map and count. You already have a mental model of how maps work, what islands are (and are not), and what it means to "count."

Your program knows none of that. In order to count the islands on this map you'll have to figure out how to get your program to do all of the following:

- Move through the grid in a logical way
- Distinguish between land, water, and the edge of the map.
- Track which cells have already been analyzed.
- Identify land cells that are connected to each other.
- Identify land cells that make a distinct island.
- Count all the islands without any repeats.

Possible edit:
Scan every cell in the grid.
Systematically check each cell to find potential new islands.

Recognize land vs. water.
Only land (1) is part of an island—everything else is water (0).

When land is found, traverse outward to explore the full island.
Use a graph traversal strategy (DFS or BFS) to move from cell to cell.

Handle movement carefully—don’t go off the map.
During traversal, avoid checking out-of-bounds neighbors.

Track which cells have already been visited.
Prevent revisiting cells so you don’t double-count or enter infinite loops.

Count each island only once.
After fully exploring one island, increase the island count.

Below you can find a grid that represents a typical input for the _Number of Islands_ problem.

| 0   |     | 0   |     | 0   |
| --- | --- | --- | --- | --- |
| 0   |     |     |     |     |

|

The obvious way of moving cell to cell is to look at each cell in order.

## Traveling across the map

## Breadth first or depth first?

### Depth first search

### Breadth first search

## Keeping track of visited islands

## Look at every cell for an unvisited island

## Return the island count
