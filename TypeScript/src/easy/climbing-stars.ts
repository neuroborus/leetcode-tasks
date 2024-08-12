import { _compare, _log } from "../logger";

/*
 * You are climbing a staircase.
 * It takes n steps to reach the top.
 * Each time you can either climb 1 or 2 steps.
 * In how many distinct ways can you climb to the top?
 * */

function countWays(n: number, dp: number[]): number {
  // If only one stair - here is only 1 way
  if (n <= 1) return (dp[n] = 1);

  // If result fo n already exists - use it
  if (dp[n] != -1) {
    return dp[n];
  }

  // Return sum of ways
  dp[n] = countWays(n - 1, dp) + countWays(n - 2, dp);
  return dp[n];
}

function climbStairs(n: number): number {
  const dp = new Array(n + 1).fill(-1);
  return countWays(n, dp);
}

_compare(2, climbStairs(2));
_compare(3, climbStairs(3));
_log(climbStairs(50));
