_The following tutorial is currently in progress. Come back soon to see the final result._

# An introduction to graph problems with LeetCode 200 - Number of Islands

This tutorial demonstrates a typical solution to LeetCode 200, _Number of Islands_, using JavaScript. We'll work from the ground up and show how to break down a graph problem into smaller, solvable pieces. This tutorial is aimed at developers who are familiar with the basics of JavaScript but less experienced with algorithm practice problems.

A graph problem looks at a set of nodes and their connections, known as a graph, and analyzes that structure in some way. In _Number of Islands_, the graph takes the form of a 2-dimensional array where `1`s represent land and `0`s represent water. When multiple land cells are directly adjacent to each other they are considered part of the same island. The problem asks us to count the number of islands in the graph.

This tutorial will demonstrate how to navigate around a grid programmatically, track visited cells, and maintain a count of islands identified along the way. We will look at both a depth-first search (DFS) and a breadth-first search (BFS) approach and compare the differences. In the end, we'll have two possible solutions—one using DFS and one using BFS.

## Understand the problem

This section breaks down the problem into smaller pieces and teaches how to approach each piece. If you've already worked through some graph problems before this may feel overly simple to you. Feel free to skim or skip this section if you don't think you need it - we won't start building the actual solution until the next section. If you are new to graph problems, however, hopefully this gives you an understanding of how to get started.

For you, a human, counting the islands on a map is most likely very simple - you just look at the map and count. This is because you already understand what an island is, the difference between how land and water appear on a map, and you know how to count. You might need to set down some ground rules about what counts as an island, but once you have that down the task is most likely trivial. If there are more islands to count than you can keep easily in your head you probably have some trick for keeping track of which islands you have already counted.

A computer, however, doesn't know any of this. It can count, but it doesn't know what to count or when to stop, and it doesn't have a sense of what is has already counted. Part of what makes graph problems so challenging is you are taking information that you already know, such as the concept of an island, and figuring out how to represent it in code.

In the remainder of this section we'll look at a series of questions that should help you understand how to communicate the necessary information in code.

- How do we tell if two land cells are next to each other?
- How do we know if we have already looked at a particular cell?
- How do we count a group of connected cells as a single island?
- How do we count all the islands without counting an island more than once?
- How do we know when we are encountering a new island?
- How do we count the islands we have found?

## Traveling across the map

## Breadth first or depth first?

### Depth first search

### Breadth first search

## Keeping track of visited islands

## Look at every cell for an unvisited island

## Return the island count
