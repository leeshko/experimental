const piles = [1, 4, 3, 2];
const h = 9;
//2

const minEatingSpeed = (piles: number[], h: number): number => {
  let left = 1;
  let right = Math.max(...piles);
  let speed = right;
  let mid;

  while (left <= right) {
    let totalHours = 0;
    mid = Math.floor((left + right) / 2);

    for (let i = 0; i < piles.length; i++) {
      totalHours += Math.ceil(piles[i] / mid);
    }


    if (totalHours > h) {
      left = mid + 1;
    } else {
      speed = mid;
      right = mid - 1;
    }
  }

  return speed;
};

console.log(minEatingSpeed(piles, h));
