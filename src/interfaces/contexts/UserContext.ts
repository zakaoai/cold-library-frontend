import { User } from "@auth0/auth0-react"

export default interface UserContext {
  user: User | undefined
  isAdmin: boolean
  isAuthenticated: boolean
  isLoading: boolean
}
