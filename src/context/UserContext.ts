import IUserContext from "@/interfaces/contexts/UserContext"
import { createContext } from "react"

const UserContext = createContext<IUserContext | undefined>(undefined)

export default UserContext
