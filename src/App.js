import { useRef } from "react"
import "./App.css"
import Content from "./Content"
import { ThemeProvider } from "./ThemeContext"

const toCamelCase = (str) =>
  str
    .replace(/\-/g, " ")
    .trim()
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word
        : word.substring(0, 1).toUpperCase() + word.substring(1)
    )
    .join("")

function App() {
  const app = useRef()

  const getColor = (color) =>
    app.current
      ? getComputedStyle(app.current)
          .getPropertyValue("--" + color)
          .trim()
      : ""

  const getColors = () => {
    const colors = [
      "primary",
      "primary-darker",
      "inactive-border",
      "background",
      "background-darker",
      "foreground",
      "qr-code-light-foreground",
      "qr-code-light-background",
      "qr-code-dark-foreground",
      "qr-code-dark-background",
    ]

    return colors.reduce(
      (prev, color) => ({ ...prev, [toCamelCase(color)]: getColor(color) }),
      {}
    )
  }

  return (
    <div className="App" ref={app}>
      <ThemeProvider getColors={getColors}>
        <Content />
      </ThemeProvider>
    </div>
  )
}

export default App
