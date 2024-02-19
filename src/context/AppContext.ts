import type IAppContext from "@/interfaces/contexts/AppContext"
import { createContext } from "react"

const AppContext = createContext<IAppContext | undefined>(undefined)

export default AppContext
