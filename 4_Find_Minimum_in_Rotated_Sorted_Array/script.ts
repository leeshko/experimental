let nums: number[] = [3, 4, 5, 1, 2];

const findMin = (nums: number[]): number => {
  let min = nums[0];
  let leftIdx = 0;
  let rightIdx = nums.length - 1;

  while (leftIdx <= rightIdx) {
    let mid = Math.floor((leftIdx + rightIdx) / 2);

    if (nums[mid] > nums[rightIdx]) {
      leftIdx = mid + 1;
    } else {
      rightIdx = mid - 1;
    }
    if (nums[mid] < min) {
      min = nums[mid];
    }
  }
  return min;
};

findMin(nums);
