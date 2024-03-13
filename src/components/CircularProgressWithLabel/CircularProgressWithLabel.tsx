import Box from "@mui/material/Box"
import CircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"

const CircularProgressWithLabel = ({ value, onClick, variant }: CircularProgressProps) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }} onClick={onClick}>
      <CircularProgress variant={variant} value={value} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        {value && (
          <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(value)}%`}</Typography>
        )}
      </Box>
    </Box>
  )
}

export default CircularProgressWithLabel
