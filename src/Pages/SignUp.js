import React, { Component, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import db from "../Scripts/script-signup";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./SignUp.css";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      userName: "",
      password: "",
      fullName: "",
      contactNo: "",
      profile: "",
    };
  }

  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addUser = (e) => {
    e.preventDefault();
    
    this.setState({
      email: "",
      userName: "",
      password: "",
      fullName: "",
      contactNo: "",
      profile: "",
    });
  };

  render() {
    return (
      <div className="body">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="signup-body">
            <Avatar className="signup-avatar">
              <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className="signup-form" onSubmit={this.addUser}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="email"
                    name="email"
                    variant="filled"
                    fullWidth
                    required
                    id="email"
                    label="Email"
                    autoFocus
                    onChange={this.updateInput}
                    value={this.state.email}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="userName"
                    name="userName"
                    variant="filled"
                    fullWidth
                    required
                    id="userName"
                    label="User Name"
                    onChange={this.updateInput}
                    value={this.state.userName}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="password"
                    name="password"
                    variant="filled"
                    fullWidth
                    required
                    id="password"
                    label="Password"
                    type="password"
                    onChange={this.updateInput}
                    value={this.state.password}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="fullName"
                    name="fullName"
                    variant="filled"
                    fullWidth
                    required
                    id="fullName"
                    label="Full Name"
                    onChange={this.updateInput}
                    value={this.state.fullName}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="contactNo"
                    name="contactNo"
                    variant="filled"
                    fullWidth
                    id="contactNo"
                    label="Contact No"
                    type="telephone"
                    onChange={this.updateInput}
                    value={this.state.contactNo}
                  />
                </Grid>
              </Grid>
              <Button
                name="signup-profile"
                type="submit"
                fullWidth
                variant="contained"
                className="signup-profile"
                onChange={this.updateInput}
                value={this.state.profile}
              >
                Upload Profile Picture
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="signup-submit"
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to={"/signin"}>Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default SignUp;
