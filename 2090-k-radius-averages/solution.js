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
