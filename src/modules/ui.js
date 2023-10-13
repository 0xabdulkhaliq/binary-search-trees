;(function stickyHeader() {
  const header = document.querySelector("header")

  window.onscroll = function () {
    document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
      ? header.classList.add("header--active")
      : header.classList.remove("header--active")
  }
})()

function updateInformation(root) {
  const height = document.querySelector(".information__height"),
    isBalanced = document.querySelector(".information__is-balanced"),
    levelOrder = document.querySelector(".information__lvl-order"),
    preOrder = document.querySelector(".information__pre-order"),
    inOrder = document.querySelector(".information__in-order"),
    postOrder = document.querySelector(".information__post-order")

  height.innerText = root.height()
  isBalanced.innerText = root.isBalanced()

  levelOrder.innerText = root.levelOrder().join(", ")
  preOrder.innerText = root.preOrder().join(", ")
  inOrder.innerText = root.inOrder().join(", ")
  postOrder.innerText = root.postOrder().join(", ")
}

export { updateInformation }
