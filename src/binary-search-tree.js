const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootTree = null;
  }
  root() {
    return this.rootTree;
  }
  add(data) {
    const node = new Node(data);
    if (!this.rootTree) {
      this.rootTree = node;
      return this;
    }
    let current = this.rootTree;
    while (true) {
      if (data === current.data) {
        return;
      }
      if (data < current.data) {
        if (current.left === null) {
          current.left = node;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = node;
          return this;
        }
        current = current.right;
      }
    }
  }
  has(data) {
    let current = this.rootTree;
    while (current) {
      if (data === current.data) {
        return true;
      }
      current = data < current.data ? current.left : current.right;
    }
    return false;
  }
  find(data) {
    let current = this.rootTree;
    while (current) {
      if (data === current.data) {
        return current;
      }
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }
  remove(data) {
    function removeNode(node, value) {
      if (!node) return;
      else if (value > node.data) {
        node.right = removeNode(node.right, value);
        return node;
      } else if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else {
        if (node.left === null) {
          node = node.right;
          return node;
        } else if (node.right === null) {
          node = node.left;
          return node;
        } else if (node.left === null && node.right === null) {
          node = null;
          return node;
        }
        let leftMax = node.left;
        while (leftMax.right) {
          leftMax = leftMax.right;
        }
        node.data = leftMax.data;
        node.left = removeNode(node.left, leftMax.data);
        return node;
      }
    }
    this.rootTree = removeNode(this.rootTree, data);
  }
  max() {
    let current = this.rootTree;
    while (current) {
      if (current && current.right) {
        current = current.right;
      } else {
        return current.data;
      }
    }
    return;
  }
  min() {
    let current = this.rootTree;
    while (current) {
      if (current && current.left) {
        current = current.left;
      } else {
        return current.data;
      }
    }
    return;
  }
}

module.exports = {
  BinarySearchTree,
};
