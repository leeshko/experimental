const piles = [25,10,23,4];
const h = 4;

const minEatingSpeed = (piles: number[], h: number): number => {
  let min = 1;
  let max = Math.max(...piles);
  let midAppetite = Math.floor((min + max) / 2);
  let perHour = max;

  if (piles.reduce((acc, p) => acc + p, 0) <= h) return 1;

  while (min <= max) {
    let time = 0;
    for (let i = 0; i < piles.length; i++) {
      time += Math.ceil(piles[i] / midAppetite);
    }
    

    if (time >= h) {
      min +=1;
    } else if (time < h) {
      perHour = midAppetite;
      max -=1;
    }
  }

  return perHour;
};

console.log(minEatingSpeed(piles, h));
