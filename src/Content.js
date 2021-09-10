import { useState, useRef } from "react"
import QRCode from "./QRCode"
import "./Content.css"

export function Content() {
  const [inputValue, setInputValue] = useState("")
  const input = useRef()

  const generate = () => {
    setInputValue(input.current.value)
  }

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
        <button className="SubmitButton" type="button" onClick={generate}>
          Generate
        </button>
      </div>
      <QRCode input={inputValue} />
    </>
  )
}

export default Content
