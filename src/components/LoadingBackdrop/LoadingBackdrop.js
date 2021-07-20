import React, { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from "@material-ui/core/styles";

// Simple backdrop to take the place of custom loading component or skeletons
// Mostly ripped directly from MUI
const styles = (theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

const LoadingBackdrop = (props) => {
  const classes = { props };
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default withStyles(styles)(LoadingBackdrop);