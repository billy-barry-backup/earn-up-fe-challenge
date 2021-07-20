import React, { Fragment, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';


const styles = (theme) => ({
    root: {
        maxWidth: theme.spacing(37),
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
});

//
// HELPER FUNCTIONS
// In reality these would be in a shared utils folder or likely pulled from a common lib
//
const formatStartDate = (dateString) => new Date(dateString).toLocaleDateString();
const formatSchedule = (scheduleString) => {
    if (scheduleString === "biweekly") {
        return "Biweekly (every 2 weeks)"
    }

    if (scheduleString === "semimonthly") {
        return "Semimonthly (twice a month)"
    }

    return "Invalid Schedule"
}
const getDateOrdinal = (paymentDueDate) => {
    // Using the following logic for ordinals
    // If the number ends in 11, 12, or 13, its ordinal ends in th. 
    // Otherwise, if it ends in 1, 2, or 3, use the corresponding st, nd, or rd.
    // All other ordinals use th.
    const dateAsString = paymentDueDate.toString();
    // *11th, *12th, and *13th
    if(dateAsString.match(/(11|12|13)$/)) {
        return dateAsString + 'th';
    }
    // *1st
    if(dateAsString.match(/1$/)) {
        return dateAsString + 'st';
    }
    // *2nd
    if(dateAsString.match(/2$/)) {
        return dateAsString + 'nd';
    }
    // *3rd
    if(dateAsString.match(/3$/)) {
        return dateAsString + 'rd';
    }

    // all others use th
    return dateAsString + 'th';
};

const getFormattedListOfPaymentDates = (paymentDates) => {
    return paymentDates.map(getDateOrdinal).join(', ');
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const LoanCard = (props) => {
    const { loan, classes } = props;
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    if (!loan) {
        return <Fragment />;
    }

    return (  
        <Grid item >
            <Card classes={{
                root: classes.root
            }}>
                <CardContent>
                <Typography gutterBottom variant="h5">
                    {loan.lenderName}
                </Typography>

                <Typography variant="body2" color="textSecondary" component="p">
                    Monthly Payments of {`$${loan.monthlyPaymentAmount}`} due on the {getDateOrdinal(loan.paymentDueDay)}
                </Typography>
                <List dense={true}>
                    <ListItem>
                        <ListItemText primary="Debit Start Date" secondary={formatStartDate(loan.debitStartDate)} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Debit Schedule" secondary={formatSchedule(loan.scheduleType)} />
                    </ListItem>
                    <ListItem>
                        <ListItemText 
                            primary={`Payments are withdrawn on ${loan.scheduleType === 'semimonthly' ? 'the' : ''}`}
                            secondary={
                                loan.scheduleType === 'semimonthly' ? 
                                    getFormattedListOfPaymentDates(loan.daysOfMonth) :
                                    `${capitalizeFirstLetter(loan.debitDayOfWeek)}s`
                            } 
                        />
                    </ListItem>
                </List>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                {/* This will throw a deprecation warning in development builds due to a Material UI 
                * known issue. This is addressed in the upcoming v5 of Material UI https://github.com/mui-org/material-ui/blob/next/CHANGELOG.md#breaking-changes-47
                */}
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                    <List dense={true}>
                            <ListItem>
                                <ListItemText primary="Loan ID:" secondary={loan.id} />
                            </ListItem>
                        </List>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>  
    )
}

export default withStyles(styles)(LoanCard);