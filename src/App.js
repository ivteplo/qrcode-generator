import { useRef } from "react"
import "./App.css"
import Content from "./Content"
import { ThemeProvider } from "./ThemeProvider"

function App() {
  const app = useRef()

  const getColor = (color) =>
    getComputedStyle(app.current)
      .getPropertyValue("--" + color)
      .trim()

  return (
    <ThemeProvider getColor={getColor}>
      <div className="App" ref={app}>
        <Content />
      </div>
    </ThemeProvider>
  )
}

export default App
