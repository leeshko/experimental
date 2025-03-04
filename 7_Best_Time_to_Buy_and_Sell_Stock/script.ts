let prices = [7, 1, 5, 3, 6, 4];

function maxProfit(prices: number[]): number {
  let l = 0;
  let r = 1;
  let maxProfit = 0;

  while (r < prices.length) {
    let profit = prices[r] - prices[l];
    maxProfit = profit > maxProfit ? profit : maxProfit;
    if(prices[r] < prices[l] ) {
      l = r
    }
    r++
  }

  return maxProfit;
}

console.log(111111, maxProfit(prices));
