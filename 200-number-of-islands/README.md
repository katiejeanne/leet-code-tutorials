_The following tutorial is currently in progress. Come back soon to see the final result._

# An introduction to graph problems with LeetCode 200 - Number of Islands

This tutorial will guide you through writing a typical solution to LeetCode 200, _Number of Islands_, using JavaScript. We'll work from the ground up and show how to break down a graph problem into smaller, solvable pieces. This tutorial is aimed at developers who are familiar with the basics of JavaScript but less experienced with algorithm practice problems.

A graph problem is any problem that can be modeled using a set of connected nodes, where the solution involves analyzing or traversing the modeled structure. In _Number of Islands_, the graph takes the form of a grid representing a group of islands separated by water, with `1`s representing land and `0`s representing water. When multiple land cells are adjacent to each other they are considered part of the same island. The problem asks us to count the number of islands present.

This tutorial will demonstrate how to navigate around a grid programmatically, track visited cells, and maintain a count of islands identified during traversal. We will look at both a depth-first search (DFS) and a breadth-first search (BFS) approach and compare the differences. In the end, we'll have two possible solutions—one using DFS and one using BFS.

## Understand the problem

- How do we count all the islands without counting an island more than once?
- How do we move from cell to cell across the graph?
- How do we count a group of connected cells as a single island?
- How do we know when we are encountering a new island?
- How do we count the islands we have found?

## Traveling across the map

## Breadth first or depth first?

### Depth first search

### Breadth first search

## Keeping track of visited islands

## Look at every cell for an unvisited island

## Return the island count
