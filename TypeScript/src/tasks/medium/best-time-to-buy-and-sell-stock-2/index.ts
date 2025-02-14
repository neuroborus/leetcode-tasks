import { _compare } from '@/logger';

enum StockState {
  ReadyToBuy = 0, // We don't have it yet. We can: buy it
  ReadyToSell = 1, // We already have it. We can: sell it
}

function maxProfit(prices: number[]): number {

  // Create a 2D array to store dynamic programming values
  const portfolio = new Array(prices.length).fill(null).map(() => new Array(2).fill(-1));

  // Recursive function to calculate the maximum profit
  const calcMaxProfit = (index: number, stockState: StockState) => {
    // Base case
    if (index === prices.length) {
      return 0;
    }

    // Check if the result for the current indices is already calculated
    if (portfolio[index][stockState] !== -1) {
      return portfolio[index][stockState];
    }

    let profit;

    if (stockState === StockState.ReadyToBuy) { // We can buy the stock
      profit = Math.max(
          0 + calcMaxProfit(index + 1, StockState.ReadyToBuy),     // Don't buy
          -prices[index] + calcMaxProfit(index + 1, StockState.ReadyToSell)  // Buy
      );
    }

    if (stockState === StockState.ReadyToSell) { // We can sell the stock
      profit = Math.max(
          0 + calcMaxProfit(index + 1, StockState.ReadyToSell),  // Don't sell
          prices[index] + calcMaxProfit(index + 1, StockState.ReadyToBuy)  // Sell
      );
    }

    return portfolio[index][stockState] = profit;
  }

  if (prices.length === 0) {
    return 0;
  }

  // Calculate and return the maximum profit
  const maxProfit = calcMaxProfit(0, StockState.ReadyToBuy);
  return maxProfit;
}

_compare(7, maxProfit([7,1,5,3,6,4]));
_compare(4, maxProfit([1,2,3,4,5]));
_compare(0, maxProfit([7,6,4,3,1]));
