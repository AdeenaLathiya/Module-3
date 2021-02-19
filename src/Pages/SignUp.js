import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./SignUp.css";

function SignUp() {
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
          <form className="signup-form">
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
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="signup-profile"
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
                <Link variant="body2">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default SignUp;
