import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import IconButton from "@mui/material/IconButton"

const ArrowCollapse = ({ open, setOpen }) => (
  <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} sx={{ width: "100%" }}>
    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
  </IconButton>
)

export default ArrowCollapse
