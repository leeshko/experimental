let m: number[][] = [
  [5, 1, 9, 11],
  [2, 4, 8, 10],
  [13, 3, 6, 7],
  [15, 14, 12, 16],
];
let a = [
  [ 15, 13, 2, 5 ],
  [ 14, 4, 8, 1 ],
  [ 12, 3, 6, 9 ],
  [ 16, 7, 10, 11 ]
]
// Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

const rotate = (matrix: number[][]): void => {
  let tempNum;
  let lastIdx: number = matrix[0].length - 1;
  for (let i = 0; i < Math.floor(matrix[0].length/2); i++) {
    for (let j = i; j < Math.floor(matrix[0].length/2); j++) {
      tempNum = matrix[lastIdx - i][j];
      matrix[lastIdx - i][j] = matrix[lastIdx - j][lastIdx - i];
      
      matrix[lastIdx - j][lastIdx - i] = matrix[i][lastIdx - j];
      matrix[i][lastIdx - j] = matrix[j][i];
      matrix[j][i] = tempNum;
      tempNum = null;
    }
  }

  console.log(matrix);
};

rotate(m);

