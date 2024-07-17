import type UserDTO from "@/interfaces/services/UserService/UserDTO"
import type { SelectChangeEvent } from "@mui/material"

export default interface AdminLogAppBar {
  selectedUser: UserDTO | undefined
  handleChangeSelectedUser: (event: SelectChangeEvent) => void
  users: UserDTO[] | undefined
}
