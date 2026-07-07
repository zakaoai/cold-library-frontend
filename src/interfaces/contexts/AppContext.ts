import type { Dispatch, SetStateAction } from "react"
import type UserDTO from "../services/UserService/UserDTO"

export default interface AppContext {
  user: UserDTO | undefined
  setUser: Dispatch<SetStateAction<UserDTO | undefined>>
}
