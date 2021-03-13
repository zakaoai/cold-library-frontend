import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import WhatshotIcon from "@material-ui/icons/Whatshot";

const PurpleSwitch = withStyles({
  root: {
    width: 80,
    height: 48,
    padding: 8
  },
  switchBase: {
    padding: 11,
    color: "#ff6a00"
  },
  thumb: {
    width: 26,
    height: 26,
    backgroundColor: "#fff"
  },
  track: {
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
    }
  },
  checked: {
    "&$switchBase": {
      color: "#185a9d",
      transform: "translateX(32px)",
      "&:hover": {
        backgroundColor: "rgba(24,90,257,0.08)"
      }
    },
    "& $thumb": {
      backgroundColor: "#fff"
    },
    "& + $track": {
      background: "linear-gradient(to right, #43cea2, #185a9d)",
      "&:before": {
        opacity: 1
      },
      "&:after": {
        opacity: 0
      }
    }
  }
})(Switch);

export default function HotColdSwitch(isCold, setIsCold) {
  return (
    <FormGroup>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>
            <WhatshotIcon style={(!isCold && { color: red[500] }) || {}} />
          </Grid>
          <Grid item>
            <PurpleSwitch checked={isCold} onChange={() => setIsCold(a => !a) || {}} name="checkedC" />
          </Grid>
          <Grid item>
            <AcUnitIcon style={(isCold && { color: blue[500] }) || {}} />
          </Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
}
