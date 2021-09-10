import { useState, useRef } from "react"
import QRCode from "./QRCode"
import "./Content.css"

export function Content() {
  const [inputValue, setInputValue] = useState("")
  const input = useRef()

  const generate = () => {
    setInputValue(input.current.value)
  }

  const submit = (event) => {
    event.preventDefault()
    generate()
  }

  return (
    <>
      <div className="FormWrapper">
        <h1 className="Title">Generate QR Code</h1>
        <form onSubmit={submit} className="Form">
          <input
            ref={input}
            className="InputField"
            type="text"
            placeholder="Text to generate QR code from"
          />
          <button className="SubmitButton" type="submit">
            Generate
          </button>
        </form>
      </div>
      <QRCode input={inputValue} />
    </>
  )
}

export default Content
