import React, { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { getPosts } from "./actions/posts";
import Posts from "./components/posts/posts.js";
import Form from "./components/form/form.js";
import useStyles from "./styles";
import likeit from "./images/like.jpg";

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Container maxwidth="lg">
      <AppBar className="classes.appBar" position="static" color="inherit">
        <Typography className="classes.heading" variant="h2" align="center">
          LIKEIT
          <img
            className="classes.image"
            src={likeit}
            alt="likeit"
            height="50"
            width="50"
          />
        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            className={classes.mainContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              {" "}
              {/*full width for extra small devices(12)*/}
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
