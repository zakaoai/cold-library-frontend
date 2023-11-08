import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

const Footer = () => (
  <Box
    sx={{
      backgroundColor: theme => (theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800]),
      p: 1,
      mt: "auto"
    }}
    component="footer">
    <Container maxWidth="sm">
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        Cold Library App V{APP_VERSION} - {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  </Box>
)

export default Footer
