import { useRef } from "react"
import "./App.css"
import Content from "./Content"
import { ThemeProvider } from "./ThemeContext"

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
    ]

    return colors.reduce(
      (prev, color) => ({ ...prev, [color]: getColor(color) }),
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
