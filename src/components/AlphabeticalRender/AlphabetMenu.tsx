import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import type IAlphabetMenu from "./interface/AlphabetMenu"

const AlphabetMenu = ({ alphabet }: IAlphabetMenu) => (
  <List
    sx={{
      height: "100%",
      width: 50,
      maxHeight: "100vh",
      position: "sticky",
      top: 0,
      overflow: "auto",
      bgcolor: theme => (theme.palette.mode === "dark" ? "grey.800" : "grey.200"), // Add dark mode support

      borderLeft: theme => `1px solid ${theme.palette.mode === "dark" ? "grey.700" : "grey.400"}` // Add dark mode support
    }}>
    {alphabet
      .sort()
      .map(letter => letter.toUpperCase())
      .map(letter => (
        <ListItem key={letter} disablePadding>
          <ListItemButton component="a" href={`#${letter}`} sx={{ textDecoration: "none", color: "inherit" }}>
            <ListItemText primary={letter} />
          </ListItemButton>
        </ListItem>
      ))}
  </List>
)

export default AlphabetMenu
