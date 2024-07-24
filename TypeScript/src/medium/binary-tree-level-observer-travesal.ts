import { _compare } from "../logger";

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function processNode(node: TreeNode, level: number, result: number[][]) {
  while (result.length - 1 < level) result.push([]); // can be used with if
  result[level].push(node.val);
  if (node.left) processNode(node.left, level + 1, result);
  if (node.right) processNode(node.right, level + 1, result);
}

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const result: number[][] = [];
  const level = 0;
  processNode(root, level, result);

  return result;
}

const tree = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

_compare([[3], [9, 20], [15, 7]], levelOrder(tree));
