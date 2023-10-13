function getCurrentTheme() {
  return localStorage.getItem("bst.theme") === null
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    : localStorage.getItem("bst.theme")
}

function loadTheme(theme) {
  document.querySelector(":root").setAttribute("color-scheme", theme)
}

function setBrowserBarTheme(state) {
  const theme = document.querySelector('[name="theme-color"]')

  state === "on" ? (theme.content = "#FAFAFA") : (theme.content = "#161722")
}

function themeSwitch(theme) {
  const themeBtn = document.querySelector(".header__theme-toggle")

  themeBtn.addEventListener("click", (e) => {
    let audio

    if (theme === "dark") {
      theme = "light"
      e.target.setAttribute("aria-label", theme)
      audio = document.querySelector(".header__switch--on")
      setBrowserBarTheme("off")
    } else {
      theme = "dark"
      e.target.setAttribute("aria-label", theme)
      audio = document.querySelector(".header__switch--off")
      setBrowserBarTheme("on")
    }
    audio.currentTime = 0
    audio.play()
    localStorage.setItem("bst.theme", `${theme}`)
    loadTheme(theme)
  })
}

function themeSwitchInitializer() {
  window.addEventListener("DOMContentLoaded", () => {
    loadTheme(getCurrentTheme())
  })

  themeSwitch(getCurrentTheme())
}

export { themeSwitchInitializer }
