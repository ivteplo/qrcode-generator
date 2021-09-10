import QRCodeGenerator from "qrcode"
import { ThemeContext } from "./ThemeContext"
import { useRef, useEffect, useContext } from "react"
import "./QRCode.css"

export function QRCode({ input }) {
  const canvas = useRef()
  const { colors } = useContext(ThemeContext)

  useEffect(() => {
    if (input) {
      QRCodeGenerator.toCanvas(
        canvas.current,
        input,
        {
          width: 275,
          color: {
            light: colors.background,
            dark: colors.foreground,
          },
        },
        (error) => {
          if (error) {
            console.error(error)
          }
        }
      )
    } else {
      canvas.current
        ?.getContext("2d")
        .clearRect(0, 0, canvas.current.width, canvas.current.height)
    }
  }, [canvas, colors, input])

  return (
    <canvas ref={canvas} className="QR">
      Sorry, your browser does not support HTML5. Please, update your browser in
      order to use this website
    </canvas>
  )
}

export default QRCode
