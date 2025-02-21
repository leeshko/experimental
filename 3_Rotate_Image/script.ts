let m: number[][] = [
  [5, 1, 9, 11],
  [2, 4, 8, 10],
  [13, 3, 6, 7],
  [15, 14, 12, 16],
];

// Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

const rotate = (matrix: number[][]): void => {
  let tempNum;
  let leftTop = 0;
  let rightBottom = matrix[0].length - 1;

  while (leftTop < rightBottom) {
    for (let i = 0; i < rightBottom - leftTop; i++) {
      tempNum = matrix[rightBottom][leftTop + i];
      matrix[rightBottom][leftTop + i] = matrix[rightBottom - i][rightBottom];
      matrix[rightBottom - i][rightBottom] = matrix[leftTop][rightBottom - i];
      matrix[leftTop][rightBottom - i] = matrix[leftTop + i][leftTop];
      matrix[leftTop + i][leftTop] = tempNum;
    }
    leftTop++;
    rightBottom--;
  }
};

rotate(m);
