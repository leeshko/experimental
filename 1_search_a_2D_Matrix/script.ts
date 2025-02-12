const matrix = [[1]];
const target = 0;

const searchMatrix = (matrix: number[][], target: number): boolean => {
  let matrixStart = 0;
  let matrixEnd = matrix.length - 1;
  let matrixMid = Math.floor((matrixStart + matrixEnd) / 2);

  let foundArr: number[] = [];

  while (matrixStart <= matrixEnd) {
    if (matrixStart === matrixEnd) {
      foundArr = matrix[matrixStart];
      break;
    } else if (target > matrix[matrixMid][matrix[0].length - 1]) {
      matrixStart = matrixMid + 1;
      matrixMid = Math.floor((matrixStart + matrixEnd) / 2);
    } else if (target < matrix[matrixMid][0]) {
      matrixEnd = matrixMid;
      matrixMid = Math.floor((matrixStart + matrixEnd) / 2);
    } else {
      foundArr = matrix[matrixMid];
      break;
    }
  }

  let start = 0;
  let end = foundArr?.length - 1;
  let mid = Math.floor((start + end) / 2);

  while (start <= end) {
    if (target > foundArr[mid]) {
      start = mid + 1;

      mid = Math.floor((start + end) / 2);
    } else if (target < foundArr[mid]) {
      end = mid - 1;
      mid = Math.floor((start + end) / 2);
    } else if (target === foundArr[mid]) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

console.log(searchMatrix(matrix, target));
