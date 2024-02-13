import { createContext } from "react"

const defaultColorModeContext = { colorMode: "light", toggleColorMode: () => {} }
const ColorModeContext = createContext(defaultColorModeContext)

export default ColorModeContext
