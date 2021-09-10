import QRCodeGenerator from "qrcode"
import { ThemeContext } from "./ThemeContext"
import { useRef, useEffect, useContext, useState } from "react"
import { ReactComponent as DownloadIcon } from "./icons/download.svg"
import { ReactComponent as MoonIcon } from "./icons/moon.svg"
import { ReactComponent as SunIcon } from "./icons/sun.svg"
import "./QRCode.css"

export function QRCode({ input }) {
  const canvas = useRef()
  const { colors, theme: _theme } = useContext(ThemeContext)

  const [theme, setTheme] = useState(_theme)

  const download = () => {
    if (!canvas.current) {
      return
    }

    const link = document.createElement("a")
    link.download = "QRCode.png"
    link.href = canvas.current.toDataURL()
    link.click()
    link.remove()
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    if (input) {
      QRCodeGenerator.toCanvas(
        canvas.current,
        input,
        {
          width: 275,
          color: {
            light:
              colors[
                "qrCode" + (theme === "dark" ? "Dark" : "Light") + "Background"
              ],
            dark: colors[
              "qrCode" + (theme === "dark" ? "Dark" : "Light") + "Foreground"
            ],
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
  }, [canvas, colors, theme, input])

  useEffect(() => {
    setTheme(_theme)
  }, [_theme])

  return (
    <div className="QRCodeWrapper">
      <canvas ref={canvas} className="QR">
        Sorry, your browser does not support HTML5. Please, update your browser
        in order to use this website
      </canvas>
      {input && (
        <section className="QRCodeActions">
          <button
            onClick={toggleTheme}
            type="button"
            className="SubmitButton"
            title={
              "Toggle to " + (theme === "dark" ? "dark" : "light") + " theme"
            }
          >
            {theme === "dark" ? (
              <SunIcon strokeWidth="10" className="ButtonIcon" />
            ) : (
              <MoonIcon strokeWidth="10" className="ButtonIcon" />
            )}
            <span className="ScreenReaderOnly">Toggle theme</span>
          </button>
          <button
            onClick={download}
            type="button"
            className="SubmitButton"
            title="Download"
          >
            <DownloadIcon strokeWidth="10" className="ButtonIcon" />
            <span className="ScreenReaderOnly">Download</span>
          </button>
        </section>
      )}
    </div>
  )
}

export default QRCode
