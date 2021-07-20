import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, getCounter } from "./counterReducer";

export default function ExampleRedux() {
  const dispatch = useDispatch();
  const counter = useSelector(getCounter);
  return (
    <div>
      <Typography gutterBottom variant="h5">
        Redux Example
      </Typography>

      <Card gutterBottom>
        <CardContent>
          <Typography variant="h5">Simple Counter</Typography>
          <Typography align="center" variant="subtitle1">
            Current: {counter}
          </Typography>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              onClick={() => dispatch(increment())}
            >
              Increment
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => dispatch(decrement())}
            >
              Decrement
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}
