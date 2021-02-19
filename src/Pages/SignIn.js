import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./SignIn.css";

function SignIn() {
  return (
    <div className="body">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="signin-body">
          <Avatar className="signin-avatar">
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className="signin-form">
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="email/userName"
              label="Email/User Name"
              autoFocus
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="signin-submit"
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link variant="body2">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default SignIn;
