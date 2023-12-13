import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

const PageLoader = () => (
  <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={true}>
    <CircularProgress color="inherit" />
  </Backdrop>
)

export default PageLoader
