import { ThemeContext } from "./ThemeProvider"
import { useEffect, useRef, useContext } from "react"
import QRCode from "qrcode"
import "./Content.css"

export function Content() {
  const { getColor } = useContext(ThemeContext)
  const canvas = useRef()
  const input = useRef()

  const onInputChange = () => {
    const inputString = input.current.value

    if (inputString) {
      const color = {
        light: getColor("background"),
        dark: getColor("foreground"),
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

  useEffect(() => {
    onInputChange()
  }, [])

  return (
    <>
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
    </>
  )
}

export default Content
