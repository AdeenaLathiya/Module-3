import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";

import firebaseApp from "../firebase";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./SignIn.css";

function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  // const [fullName, setFullName] = useState("");
  // const [contactNo, setContactNo] = useState(0);
  // const [avatar, setAvatar] = useState("");

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    const emailAt = userName.indexOf("@");
    const emailDot = userName.lastIndexOf(".");

    if (
      emailAt < 1 ||
      emailDot < emailAt + 2 ||
      emailDot + 2 >= userName.length
    ) {
      const userRef = firebaseApp
        .firestore()
        .collection("users")
        .where("userName", "==", userName);

      console.log(userRef);

      userRef
        .get()
        .then(function (querySnapshot) {
          if (querySnapshot.size > 0) {
            console.log(querySnapshot.docs[0].id);

            const emailDB = querySnapshot.docs[0].data().email;

            firebaseApp
              .auth()
              .signInWithEmailAndPassword(emailDB, password)
              .then((userCred) => {
                var user = userCred.user;
                history.replace("/");
              })
              .catch((err) => {
                var errorCode = err.code;
                var errorMessage = err.message;

                console.log(errorCode, "\n", errorMessage);
              });
          } else {
            console.log("No Data");
            // alert("User Already Exists");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(userName, password)
        .then((userCred) => {
          var user = userCred.user;
          history.replace("/");
        })
        .catch((err) => {
          var errorCode = err.code;
          var errorMessage = err.message;

          console.log(errorCode, "\n", errorMessage);
        });
    }
  };

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
          <form method="POST" className="signin-form" onSubmit={onSubmit}>
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              // id="email/userName"
              label="Email/User Name"
              // autoFocus
              onChange={(e) => {
                setUserName(e.target.value);
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
                <Link to={"/signup"}>Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default SignIn;
