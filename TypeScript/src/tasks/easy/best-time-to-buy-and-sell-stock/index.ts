import { _compare } from '@/logger';


function maxProfit(prices: number[]): number {
  let max = -Infinity;
  let delta = 0;
  for (let i = prices.length - 1; i >= 0; --i) {
    if (max < prices[i]) max = prices[i];
    delta = Math.max(delta, max - prices[i]);
  }
  return delta;
}

_compare(5, maxProfit([7,1,5,3,6,4]));
_compare(0, maxProfit([7,6,4,3,1]));
