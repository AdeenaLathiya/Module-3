import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";

import firebaseApp from "../firebase";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import "./SignUp.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [contactNo, setContactNo] = useState(0);
  const [password, setPassword] = useState("");

  const history = useHistory();

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebaseApp.storage().ref("profile/");
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setAvatar(await fileRef.getDownloadURL());
  };

  const onSubmit = (e) => {
    e.preventDefault();

    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        var data = {
          fullName: fullName,
          contactNo: contactNo,
          userName: userName,
          email: email,
          avatar: avatar,
          verified: false,
        };

        var db = firebaseApp.firestore.collection("users").doc(user.user.uid);
        db.set(data);
      })
      .catch((err) => {
        var errorCode = err.code;
        var errorMessage = err.message;

        console.log(errorCode, "\n", errorMessage);
      });

    history.replace("/");
    // firebaseApp.firestore().collection("users").add({
    //   userName: userName,
    //   fullName: fullName,
    //   email: email,
    //   password: password,
    //   avatar: avatar,
    //   contactNo: contactNo,
    // });
  };

  // firebaseApp.auth().onAuthStateChanged((user) => {
  //   if (user) console.log("Signed In");
  //   var userID = firebaseApp.auth().currentUser.uid;
  //   const userRef = firebaseApp.firestore().collection("users").doc(userID);
  //   userRef
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         console.log("Doc data: ", doc.data());

  //         const data = doc.data();
  //         setFullName(data.fullName);
  //         setUserName(data.userName);
  //         setEmail(data.email);
  //         setAvatar(data.avatar);
  //         setContactNo(data.contactNo);
  //         setPassword(data.password);
  //       } else console.log("No Data");
  //     })
  //     .catch((err) => console.log("Error"));
  // });

  // render() {
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
          <form className="signup-form" onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  type="email"
                  variant="filled"
                  fullWidth
                  required
                  id="email"
                  label="Email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  // value={this.state.email}
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
                  onChange={(e) => setUserName(e.target.value)}
                  // onChange={this.updateInput}
                  // value={this.state.userName}
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
                  onChange={(e) => setPassword(e.target.value)}
                  // onChange={this.updateInput}
                  // value={this.state.password}
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
                  onChange={(e) => setFullName(e.target.value)}
                  // onChange={this.updateInput}
                  // value={this.state.fullName}
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
                  onChange={(e) => setContactNo(e.target.value)}
                  // onChange={this.updateInput}
                  // value={this.state.contactNo}
                />
              </Grid>
            </Grid>
            <Button
              name="signup-profile"
              fullWidth
              variant="contained"
              className="signup-profile"
              // onChange={this.updateInput}
              // value={this.state.profile}
            >
              Upload Profile Picture
              <Input type="file" onChange={onFileChange} name="avatar" />
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
  // }
}

export default SignUp;
