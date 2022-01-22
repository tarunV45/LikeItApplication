import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {Link, useLocation } from "react-router-dom";
import decode from 'jwt-decode';
import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";
import useStyles from "./styles";
import likeit from "../../images/like.jpg";
import { LOGOUT } from "../../constants/actionType";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  

  const logout = () => {
    dispatch({ type: LOGOUT });
    setUser(null);
    window.location.reload();
  };

  useEffect(() => {
    const token = user?.token;
    
    if(token) {
      const decoded_token = decode(token);
      if(decoded_token.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          LIKEIT
        </Typography>
        <img
          className={classes.image}
          src={likeit}
          alt="likeit"
          height="50"
          width="50"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageURL}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              component={Link}
              to="/"
              className={classes.logout}
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <div>
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
