import Node from "./node"

class Tree {
  constructor(array) {
    this.root = this.buildTree(array)
  }

  sortAndRemoveDuplicates(array) {
    return [...new Set(array)].sort((a, b) => a - b)
  }

  buildTree(array) {
    const sorted = this.sortAndRemoveDuplicates(array)
    if (sorted.length === 0) return null

    const mid = Math.floor(sorted.length / 2)
    const root = new Node(
      sorted[mid],
      this.buildTree(sorted.slice(0, mid)),
      this.buildTree(sorted.slice(mid + 1))
    )

    return root
  }

  insert(value, root = this.root) {
    if (root === null) return new Node(value)

    root.data < value
      ? (root.right = this.insert(value, root.right))
      : (root.left = this.insert(value, root.left))

    return root
  }

  delete(value, root = this.root) {
    if (root === null) return root

    if (value > root.data) root.right = this.delete(value, root.right)
    else if (value < root.data) root.left = this.delete(value, root.left)
    else {
      if (root.left === null) return root.right
      else if (root.right === null) return root.left

      root.data = this.findMinValue(root.right)
      root.right = this.delete(value, root.right)
    }

    return root
  }

  findMinValue(root) {
    let minValue = root.data
    while (root.left !== null) {
      minValue = root.left.data
      root = root.left
    }

    return minValue
  }

  find(value, root = this.root) {
    if (root === null) return null

    if (root.data !== value) {
      return root.data < value
        ? this.find(value, root.right)
        : this.find(value, root.left)
    }

    return root
  }

  height(root = this.root) {
    if (root === null) return -1
    return Math.max(this.height(root.right), this.height(root.left)) + 1
  }

  depth(value, currentRoot = this.root, depth = 0) {
    while (currentRoot !== null) {
      if (value === currentRoot.data) {
        return depth
      } else if (value > currentRoot) {
        currentRoot = currentRoot.right
      } else {
        currentRoot = currentRoot.left
      }
      depth++
    }

    return -1
  }

  isBalanced(root = this.root, res = true) {
    if (!root) return true

    function dfs(node) {
      if (root) return 0

      let left = this.dfs(node.left)
      let right = this.dfs(node.right)

      if (Math.abs(left - right) > 1) res = false

      return Math.max(left, right) + 1
    }

    dfs(root)

    return res
  }

  reBalance() {
    this.root = this.buildTree(this.preOrder())
  }

  /*
      BREADTH-FIRST SEARCH
         -> Level Order Traversal
    */

  levelOrder(root = this.root, queue = [], result = []) {
    if (!root) return

    queue.push(root)
    while (queue.length) {
      const currentNode = queue.shift()
      result.push(currentNode.data)
      if (currentNode.left) queue.push(currentNode.left)
      if (currentNode.right) queue.push(currentNode.right)
    }

    return result
  }

  /*
      DEPTH-FIRST SEARCH
         -> Pre-Order Traversal
         -> In-Order Traversal
         -> Post-Order Traversal
    */

  preOrder(root = this.root, nodeList = []) {
    // DATA -> LEFT -> RIGHT
    if (root) {
      nodeList.push(root.data)
      this.preOrder(root.left, nodeList)
      this.preOrder(root.right, nodeList)
    }

    return nodeList
  }

  inOrder(root = this.root, nodeList = []) {
    // LEFT -> DATA -> RIGHT
    if (root) {
      this.inOrder(root.left, nodeList)
      nodeList.push(root.data)
      this.inOrder(root.right, nodeList)
    }

    return nodeList
  }

  postOrder(root = this.root, nodeList = []) {
    // LEFT -> RIGHT -> DATA
    if (root) {
      this.postOrder(root.left, nodeList)
      this.postOrder(root.right, nodeList)
      nodeList.push(root.data)
    }

    return nodeList
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) return

    const divElement = document.createElement("pre")
    const outputContainer = document.querySelector(".main__output")

    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│&nbsp;&nbsp;&nbsp;" : "&nbsp;&nbsp;&nbsp;"}`,
        false
      )
    }

    divElement.innerHTML = `${prefix}${isLeft ? "└── " : "┌── "}${node.data}`
    outputContainer.append(divElement)

    if (node.left !== null) {
      this.prettyPrint(
        node.left,
        `${prefix}${
          isLeft ? "&nbsp;&nbsp;&nbsp;&nbsp;" : "│&nbsp;&nbsp;&nbsp;"
        }`,
        true
      )
    }
  }
}

export default Tree
