import { useEffect, createContext, useState } from "react"

export const ThemeContext = createContext({})

export function ThemeProvider({ children, getColor }) {
  const [theme, setTheme] = useState("light")

  const onColorSchemeChange = (event) => {
    const { matches } = event.target
    setTheme(matches ? "dark" : "light")
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    media.addEventListener("change", onColorSchemeChange)
    media.dispatchEvent(new Event("change"))

    return () => {
      media.removeEventListener("change", onColorSchemeChange)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, getColor }}>
      {children}
    </ThemeContext.Provider>
  )
}
