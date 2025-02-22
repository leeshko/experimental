export {};
let nums: number[] = [5, 1, 3];
let target: number = 5;

const search = (nums: number[], target: number): number => {
  let leftIdx = 0;
  let rightIdx = nums.length - 1;

  while (leftIdx <= rightIdx) {
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);
    // console.log(111111, midIdx);
    if (nums[midIdx] === target) return midIdx;
    if (nums[leftIdx] < nums[midIdx]) {
      if (target > nums[leftIdx] && target < nums[midIdx]) {
        rightIdx = midIdx;
      } else {
        leftIdx = midIdx + 1;
      }
    } else {
      if (target < nums[leftIdx] && target < nums[midIdx]) {
        rightIdx = midIdx;
      } else if (target < nums[leftIdx] && target > nums[midIdx]) {
      } else {
        leftIdx = midIdx + 1;
      }
    }
  }
  return -1;
};

console.log(999999, search(nums, target));
