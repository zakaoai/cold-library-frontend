import ColorModeContext from "@/context/ColorModeContext"
import { useContext } from "react"

export const useColorModeContext = () => {
  const context = useContext(ColorModeContext)
  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider")
  }
  return context
}
