import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { getLoans, getLoadingState, getErrorState, loadLoans } from "./homeReducer";
import LoanCard from "../../components/LoanCard";
import LoadingBackdrop from "../../components/LoadingBackdrop/LoadingBackdrop";
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  // Since the <Alert> component is still in labs
  // We have to hand-roll the CSS to make it look similar-ish
  snackbarAlert: {
    color: '#FFF',
    backgroundColor: '#f44336',
    padding: theme.spacing(1.2),
    borderRadius: theme.spacing(0.5),
    fontWeight: '600'
  },
  errorSubmessage: {
    marginLeft: theme.spacing(2)
  }
}));

export default function Home() {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  // For right now, let's just dispatch the load loans event as soon as the component is mounted
  dispatch(loadLoans());

  const isLoading = useSelector(getLoadingState);
  const loans = useSelector(getLoans);
  const hasLoans = !isLoading && Array.isArray(loans) && Boolean(loans?.length);
  const { errors, hasErrors } = useSelector(getErrorState);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Container maxWidth="xl">
      {
        hasErrors && (
          <Fragment>
            <Typography variant="h2" component="h1" >
              This page is not available
            </Typography>
            <Typography variant="body2" className={classes.errorSubmessage} >
              An error has occurred and your loan data could not be loaded. Please try again later.
            </Typography>
            {
              errors.map((error, ind) => {
                return (
                  <Snackbar 
                    key={ind} 
                    open={open} 
                    autoHideDuration={6000} 
                    onClose={handleClose}
                  >
                    <div className={classes.snackbarAlert}>{error}</div>
                  </Snackbar>
                )
              })
            }
          </Fragment>
        )
      }
      <Grid container spacing={2}>
        {
          isLoading && <LoadingBackdrop />
        }
        {
          hasLoans && loans.map((loan, ind) => {
            return (
              <LoanCard
                loan={loan}
                key={loan?.id || ind}
              />
            );
          })
        }
      </Grid>
    </Container>
  );
}