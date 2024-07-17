import type IAdminLogAppBar from "@/interfaces/containers/Activite/AdminLog/AdminLogAppBar"
import { AppBar, Box, FormControl, InputLabel, MenuItem, Select, Toolbar } from "@mui/material"
import Grid from "@mui/material/Grid"

const AdminLogAppBar = ({ selectedUser, handleChangeSelectedUser, users }: IAdminLogAppBar) => (
  <Box mb={1}>
    <AppBar position="relative" color="transparent">
      <Toolbar>
        <Grid container size={{ xs: 12 }} spacing={2} justifyContent="space-between" display={"flex"}>
          <Grid>
            <FormControl fullWidth>
              <InputLabel id="select-user-label">User</InputLabel>
              <Select
                labelId="select-user-label"
                id="select-user"
                value={selectedUser?.id ?? "all"}
                label="User"
                onChange={handleChangeSelectedUser}>
                <MenuItem value={"all"}>Tous</MenuItem>
                {users?.map(a => (
                  <MenuItem key={a.id} value={a.id}>
                    {a.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </Box>
)

export default AdminLogAppBar
