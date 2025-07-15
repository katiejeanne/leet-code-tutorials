# Using two pointers and a rolling sum to find K radius subarray averages

_Using JavaScript to solve [LeetCode #2090](https://leetcode.com/problems/k-radius-subarray-averages/)_

Also published on [Medium](https://medium.com/@kjeanne_32239/interview-prep-using-two-pointers-and-a-rolling-sum-to-find-k-radius-subarray-averages-a9154d2aa113)

This tutorial will guide you through how to solve LeetCode problem 2090 using JavaScript. It's aimed at developers who are familiar with JavaScript basics but new to algorithm practice problems.

This solution uses a two-pointer sliding window approach combined with a rolling sum, which is a memory-efficient variation of the prefix sum technique. This combination of strategies is often used with problems that involve rolling calculations over a set of values.

Careful index management is also essential, since we will need to track the leftmost, rightmost, and center index of each subarray.

## Understanding the problem

From [LeetCode](https://leetcode.com/problems/k-radius-subarray-averages/):

> Build and return an array avgs of length n where avgs[i] is the k-radius average for the subarray centered at index i.

For each position in the array we will see if we can create a subarray with a radius of k. If we can't, the result at that position will be -1. If we can, we will return the average of the subarray we created.

Before we move on to the solution, let's look at what it means to have a k-radius subarray. We'll also look closer at how this problem wants us to calculate averages.

### K-radius subarray

A k-radius subarray is an array that extends for k positions to both the left and the right of a given index.

Let's look at the example array [7, 4, 3, 9, 1, 8, 5, 2, 6], shown below. A subarray **centered on index 2 with a k-radius of 1** would comprise index 1 through index 3:

| Values | 7   | [ _4_ | _3_ | _9_ ] | 1   | 8   |
| ------ | --- | ----- | --- | ----- | --- | --- |
| Index  | 0   | [ _1_ | _2_ | _3_ ] | 4   | 5   |
|        |     | ↑     | ◉   | ↑     |

Similarly, a **subarray centered on index 2 with k-radius of 2** would comprise index 0 through index 4.

| Values | [ _7_ | _4_ | _3_ | _9_ | _1_ ] | 8   |
| ------ | ----- | --- | --- | --- | ----- | --- |
| Index  | [ _0_ | _1_ | _2_ | _3_ | _4_ ] | 5   |
|        | ↑     | ↑   | ◉   | ↑   | ↑     |

However, there are many positions where a valid subarray cannot be created. When this happens, we'll return a -1 instead of an average.

For example, with a k of 2, we could not create a valid subarray centered on index 0. There is no room to extend k values to the left of 0.

| Values | --  | --  | _7_ | _4_ | _3_ | _9_ | 1   | 8   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| Index  | --  | --  | _0_ | _1_ | _2_ | _3_ | 4   | 5   |
|        | ↑   | ↑   | ◉   | ↑   | ↑   |

Only valid subarrays, where we can extend k values to both the left and right, should return an average.

### Average with Integer Division

The problem asks us to find the average using integer division.

From [LeetCode](https://leetcode.com/problems/k-radius-subarray-averages/):

> The average of x elements is the sum of the x elements divided by x, using integer division. The integer division truncates toward zero, which means losing its fractional part.

While some languages like Python and Java have a version of integer division built in, to find the same result in JavaScript we'll need to use either `Math.trunc` or `Math.floor`.

- **`Math.trunc`** discards any fractional part of a number, moving the value closer to 0. For a negative number like -4.2, `Math.trunc` will return -4. This matches integer division behavior in most languages, such as Java, C++, and Go.

- **`Math.floor`** rounds the number down to the next smaller integer. For a negative number like -4.2, `Math.floor` will return -5. This matches how Python's `//` operator works.

Here, the problem states that we should truncate towards 0, which means `Math.trunc` is the more accurate choice.

However, the difference between the two _only appears when dealing with negative numbers_. You can see in the constraints for this problem that all values are guaranteed to be positive.

> Constraints:
>
> n == nums.length  
> 1 <= n <= 105  
> **0 <= nums[i]**, k <= 105

For this problem, either `Math.trunc` or `Math.floor` will give us the average we need to assemble a passing solution. That said, we'll use `Math.trunc` for this tutorial since it more closely matches the problem description.

## The Solution

Now that we've explored the problem in depth, we can start coding our solution.

### Step one: Set up a result array

Before we start calculating results we will need a place to store what we find, so we'll start by creating an array and naming it `result`.

```javascript
const result = new Array();
```

We know that we need to return a value for every position in the input array, so we'll make our result array the same size as the input array.

```javascript
const result = new Array(nums.length);
```

It's simple to get the size of any array using `.length`, but we will be using the size of `nums` multiple times throughout our code, so let's go ahead and store that number in the variable `n` to make it easier to reference later. This also matches the problem description's use of the variable `n`.

```javascript
const n = nums.length;
const result = new Array(n);
```

### Step two: Consider only valid subarrays

We could start by looking at each element in the input array, which would look something like this:

```javascript
let left = 0 - k;
let right = 0 + k;

for (let center = 0; center < n; center++) {
  // Code for determining if array is valid
  // Code for calculating and storing the current average
  left++;
  right++;
}
```

Here, `left` and `right` track the start and end of the current subarray.

This code will look at every location in the input array, regardless of whether the subarray is valid. However, we don't actually need to look at every invalid subarray since we know the output will be -1 every time.

Instead, we can write our loop so it only looks at valid subarrays.

Let's return to our example from before, again with a k of 2, to help visualize our first and last valid subarrays.

| Values | [ _7_ | _4_ | _3_ | _9_ | _1_ ] | 8   |
| ------ | ----- | --- | --- | --- | ----- | --- |
| Index  | [ _0_ | _1_ | _2_ | _3_ | _4_ ] | 5   |
|        | ↑     | ↑   | ◉   | ↑   | ↑     |

The first valid subarray will always be found at index `k`, shown as position 2 in our example above. Likewise, `left` for the first valid subarray will always be 0 and `right` will always be `k + k`.

Now let's look at the last valid subarray:

| Values | 7   | [ _4_ | _3_ | _9_ | _1_ | _8_ ] |
| ------ | --- | ----- | --- | --- | --- | ----- |
| Index  | 0   | [ _1_ | _2_ | _3_ | _4_ | _5_ ] |
|        |     | ↑     | ↑   | ◉   | ↑   | ↑     |

The last valid subarray is the position where `right` = n - 1, since any position further than that will extend past the bounds of the array.

There are a few ways to write our abbreviated loop—for example, using a `for` loop with carefully chosen bounds. But for this tutorial, I’m using a `while` loop because it makes the relationship between `left`, `center`, and `right` easier to visualize and control.

```javascript
let left = 0;
let center = k;
let right = k + k;

while (right < n) {
  // Code for calculating and storing the current average
  left++;
  center++;
  right++;
}
```

Now we have a loop that only looks at valid subarrays.

What, then, about those positions without a valid subarray? If we prefill our result array with -1 at each position, then those positions without a valid subarray will correctly return a -1 without any additional code.

With that small change, our updated code looks like this:

```javascript
const n = nums.length;
const result = new Array(n).fill(-1); // Prefill result with -1

let left = 0;
let center = k;
let right = k + k;

while (right < n) {
  // Code for calculating and storing the current average
  left++;
  center++;
  right++;
}
```

### Step three: Set up the rolling sum

To get the average of our valid subarrays, we first need to add all the values in each subarray.

A common first approach would be to calculate the average inside our loop. We could use `.slice` to isolate our valid subarray, then use `.reduce` to sum all the values.

Remember that the second index provided to `.slice` is exclusive, so we'll add one to `right` to make sure the value at the `right` position is included in the sum.

```javascript
let left = 0;
let center = k;
let right = k + k;

while (right < n) {
  let total = nums.slice(left, right + 1).reduce((acc, n) => acc + n, 0);
  // Code for calculating and storing the current average

  left++;
  center++;
  right++;
}
```

However, this approach is inefficient. Imagine we had a `nums` array with 1000 values and a k of 100. At each step we would sum 201 individual values, most of which were already summed in the previous loop.

We can streamline our process by storing the total of the first valid subarray, then only adding and subtracting those values that are removed or added as we move to the next subarray. Using this approach, we would only perform two computations for each new subarray—subtracting the value we dropped from the last subarray and adding the new value to form the current subarray.

Our loop would now look like this:

```javascript
let left = 0;
let center = k;
let right = k + k;

let currTotal = nums.slice(left, right + 1).reduce((acc, n) => acc + n, 0);

while (right < n) {
  // Code for calculating and storing the current average

  currTotal -= nums[left]; // Remove the current left value

  left++;
  center++;
  right++;

  currTotal += nums[right]; // Add the new right value
}
```

This approach is closely related to a prefix sum solution, but instead of creating a full prefix array, we store the current total in a single variable and update as we go. This saves memory and simplifies the code.

### Step four: Calculate and store the average

At this point, all that is left in our main loop is calculating the average and storing it in the result array.

To calculate the average, we will divide `currTotal` by the length of the subarray, which will be `2 \* k + 1` (k elements to the left, k to the right, plus the center). Then we'll wrap that result in `Math.trunc` to change it to an integer value, as requested in the problem description.

```javascript
let currAvg = Math.trunc(currTotal / (2 * k + 1));
```

We can then store the average in our result array. Remember that the index in the result array should match the _center_ of our current subarray. We can use the `center` variable to store our average directly in the correct location.

Since the loop skips any index without a valid subarray, the -1 we prefilled can stay—no extra work needed.

```javascript
result[center] = Math.trunc(currTotal / (2 * k + 1));
```

Altogether our code now looks like this:

```javascript
let left = 0;
let center = k;
let right = k + k;

let currTotal = nums.slice(left, right + 1).reduce((acc, n) => acc + n, 0);

while (right < n) {
  result[center] = Math.trunc(currTotal / (2 * k + 1));

  currTotal -= nums[left]; // Remove the current left value

  left++;
  center++;
  right++;

  currTotal += nums[right]; // Add the new right value
}
```

### Step five: Return the result array

The last step is so simple, it's sometimes easy to forget: We need to return our result array.

```javascript
return result;
```

## The complete code

Here's our final solution in its entirety:

```javascript
const n = nums.length;
const result = new Array(n).fill(-1); // Prefill result with -1

let left = 0;
let center = k;
let right = k + k;

let currTotal = nums.slice(left, right + 1).reduce((acc, n) => acc + n, 0);

while (right < n) {
  result[center] = Math.trunc(currTotal / (2 * k + 1));

  currTotal -= nums[left]; // Remove the current left value

  left++;
  center++;
  right++;

  currTotal += nums[right]; // Add the new right value
}

return result;
```

Thanks for reading! If you'd like to see a similar walkthrough for another LeetCode problem, feel free to leave a request in the comments.
