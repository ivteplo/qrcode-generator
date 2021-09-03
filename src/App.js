import { useEffect, useRef } from "react"
import QRCode from "qrcode"
import "./App.css"

function App() {
  const canvas = useRef()
  const input = useRef()
  const app = useRef()

  const onInputChange = () => {
    const inputString = input.current.value

    if (inputString) {
      const styles = getComputedStyle(app.current)
      const color = {
        light: styles.getPropertyValue("--background").trim(),
        dark: styles.getPropertyValue("--foreground").trim(),
      }

      QRCode.toCanvas(
        canvas.current,
        inputString,
        {
          width: 275,
          color,
        },
        (error) => {
          if (error) {
            console.error(error)
          }
        }
      )
    } else {
      canvas.current
        .getContext("2d")
        .clearRect(0, 0, canvas.current.width, canvas.current.height)
    }
  }

  const onColorSchemeChange = () => {
    onInputChange()
  }

  useEffect(() => {
    onInputChange()

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    media.addEventListener("change", onColorSchemeChange)

    return () => {
      media.removeEventListener("change", onColorSchemeChange)
    }
  }, [])

  return (
    <div className="App" ref={app}>
      <div className="Form">
        <h1 className="Title">Generate QR Code</h1>
        <input
          ref={input}
          className="InputField"
          type="text"
          placeholder="Text to generate QR code from"
        />
        <button className="SubmitButton" type="button" onClick={onInputChange}>
          Generate
        </button>
      </div>
      <canvas ref={canvas} className="QR">
        Sorry, your browser does not support HTML5. Please, update your browser
        in order to use this website
      </canvas>
    </div>
  )
}

export default App
