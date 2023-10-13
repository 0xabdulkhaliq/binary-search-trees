import { updateInformation } from "./ui"

function instantiateActions(root) {
  const buttonElements = document.querySelectorAll("label button")

  buttonElements.forEach((button) => {
    const inputEl = button.previousElementSibling

    if (inputEl === null) {
      buttonEvent(button, rebalanceTree, root, { value: 0 })
    } else if (inputEl.id === "numbers") {
      buttonEvent(button, addNewNumbers, root, inputEl)
    } else if (inputEl.id === "insert-number") {
      buttonEvent(button, insertNumber, root, inputEl)
    } else if (inputEl.id === "remove-number") {
      buttonEvent(button, removeNumber, root, inputEl)
    } else if (inputEl.id === "find-number") {
      buttonEvent(button, findDepth, root, inputEl)
    }
  })
}

function rebalanceTree(root) {
  root.reBalance()
  outputUpdater(root)
}

function addNewNumbers(root, value) {
  root.root = root.buildTree(value.split(" "))

  outputUpdater(root)
}

function insertNumber(root, value) {
  root.insert(Number(value))
  outputUpdater(root)
}

function removeNumber(root, value) {
  root.delete(Number(value))
  outputUpdater(root)
}

function findDepth(root, value, buttonElement) {
  buttonElement.textContent = `Depth: ${root.depth(Number(value))}`
  buttonElement.classList.add("depth-btn--active")

  setTimeout(() => {
    buttonElement.textContent = ""
    buttonElement.classList.remove("depth-btn--active")
  }, 5000)
}

function outputUpdater(root) {
  const output = document.querySelector(".main__output")
  output.innerHTML = ""

  root.prettyPrint()
  updateInformation(root)
}

function buttonEvent(button, func, root, inputElement) {
  button.addEventListener("click", (e) => {
    e.preventDefault()

    if (inputElement.value === "") return

    func(root, inputElement.value, button)
    inputElement.value = ""
  })
}

export { instantiateActions }
