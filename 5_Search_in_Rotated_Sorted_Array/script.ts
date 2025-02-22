export {};
let nums: number[] = [3, 5, 6, 0, 1, 2];
let target: number = 4;

const search = (nums: number[], target: number): number => {
  let leftIdx = 0;
  let rightIdx = nums.length - 1;

  while (leftIdx <= rightIdx) {
    let midIdx = Math.floor((rightIdx + leftIdx) / 2);

    if (nums[midIdx] === target) return midIdx;

    if (nums[leftIdx] <= nums[midIdx]) {
      if (target < nums[midIdx] && target >= nums[leftIdx]) {
        rightIdx = midIdx - 1;
      } else {
        leftIdx = midIdx + 1;
      }
    } else {
      if (target > nums[midIdx] && target <= nums[rightIdx]) {
        leftIdx = midIdx + 1;
      } else {
        rightIdx = midIdx - 1;
      }
    }
  }

  return -1;
};

search(nums, target);
