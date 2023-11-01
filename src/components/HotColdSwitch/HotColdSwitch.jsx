import StorageState from "@/enums/StorageState";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import blue from "@mui/material/colors/blue";
import red from "@mui/material/colors/red";
import { styled } from "@mui/material/styles";

const MaterialUISwitch = styled(Switch)(() => ({
  width: 80,
  height: 48,
  padding: 8,
  "& .MuiSwitch-switchBase": {
    padding: 11,
    color: "#ff6a00",
    "&.Mui-checked": {
      color: "#185a9d",
      transform: "translateX(32px)",
      "&:hover": {
        backgroundColor: "rgba(24,90,257,0.08)"
      },
      "& + .MuiSwitch-track": {
        background: "linear-gradient(to right, #43cea2, #185a9d)",
        "&:before": {
          opacity: 1
        },
        "&:after": {
          opacity: 0
        }
      }
    }
  },
  "& .MuiSwitch-thumb": {
    width: 26,
    height: 26,
    backgroundColor: "#fff"
  },
  "& .MuiSwitch-track": {
    background: "linear-gradient(to right, #ee0979, #ff6a00)",
    opacity: "1 !important",
    borderRadius: 20,
    position: "relative",
    "&:before, &:after": {
      display: "inline-block",
      position: "absolute",
      top: "50%",
      width: "50%",
      transform: "translateY(-50%)",
      color: "#fff",
      textAlign: "center"
    },
    "&:before": {
      content: '"cold"',
      left: 4,
      opacity: 0
    },
    "&:after": {
      content: '"hot"',
      right: 4
    },
    "& + .MuiSwitch-checked": {
      background: "linear-gradient(to right, #43cea2, #185a9d)",
      "&:before": {
        opacity: 1
      },
      "&:after": {
        opacity: 0
      }
    }
  }
}));

export default function HotColdSwitch({ storageState, setStorageState }) {
  const isFluxFroid = storageState === StorageState.FLUX_FROID;
  const nextStorageState = isFluxFroid ? StorageState.FLUX_CHAUD : StorageState.FLUX_FROID;

  return (
    <FormGroup>
      <Typography component="div">
        <Grid item>
          <MaterialUISwitch
            icon={<WhatshotIcon style={{ color: red.A100 }} />}
            checkedIcon={<AcUnitIcon style={{ color: blue[200] }} />}
            checked={isFluxFroid}
            onChange={() => setStorageState(nextStorageState)}
          />
        </Grid>
      </Typography>
    </FormGroup>
  );
}
