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

function checkNode(node: TreeNode, gt: number[], lt: number[]): boolean {
  if (lt.some((l) => node.val >= l)) return false;
  if (gt.some((g) => node.val <= g)) return false;

  if (node.left) {
    if (!checkNode(node.left, gt, [...lt, node.val])) return false;
  }
  if (node.right) {
    if (!checkNode(node.right, [...gt, node.val], lt)) return false;
  }

  return true;
}

function isValidBST(root: TreeNode | null): boolean {
  if (root === null) return false;
  return checkNode(root, [], []);
}

const properTree = new TreeNode(2, new TreeNode(1), new TreeNode(3));
const improperTree1 = new TreeNode(
  5,
  new TreeNode(1),
  new TreeNode(4, new TreeNode(3), new TreeNode(6))
);
const improperTree2 = new TreeNode(
  5,
  new TreeNode(4, null, null),
  new TreeNode(6, new TreeNode(3), new TreeNode(7))
);

_compare(true, isValidBST(properTree));
_compare(false, isValidBST(improperTree1));
_compare(false, isValidBST(improperTree2));
