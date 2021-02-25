import React, { useState } from "react";

import { Avatar, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import DoneIcon from "@material-ui/icons/Done";

import firebaseApp from "../../firebase";

import "./ProfileBox.css";

function ProfileBox() {
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState("");
  const [userName, setUserName] = useState("");
  const [createdOn, setCreatedOn] = useState("");
  const [verified, setVerified] = useState("false");
  const [userID, setUserID] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFileChange = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    const storageRef = firebaseApp.storage().ref("avatar/");
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setAvatar(await fileRef.getDownloadURL());
  };

  const onSubmit = (e) => {
    e.preventDefault();

    var data = {
      avatar: avatar,
      contactNo: contactNo,
      email: email,
      fullName: fullName,
      status: status,
      userName: userName,
      verified: verified,
    };

    var db = firebaseApp.firestore().collection("users").doc(userID);
    db.set(data);

    console.log("Updated");

    handleClose();
  };

  // userRef
  // .get()
  // .then((doc) => {
  //   if (doc.exists) {
  //     console.log("Doc data: ", doc.data());

  //     const data = doc.data();
  //     setFullName(data.fullName);
  //     setUserName(data.userName);
  //     setAvatar(data.avatar);
  //     setEmail(data.email);
  //     setContactNo(data.contactNo);
  //     setStatus(data.status);
  //     setCreatedOn(data.createdOn);
  //     setUserID(userID);
  //   } else console.log("No Data");
  // })
  // .catch((err) => console.log("Error"));

  firebaseApp.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("Signed In", firebaseApp.auth().currentUser.uid);
      var userID = firebaseApp.auth().currentUser.uid;
      const userRef = firebaseApp.firestore().collection("users").doc(userID);
      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Doc data: ", doc.data());

            const data = doc.data();
            setAvatar(data.avatar);
            setContactNo(data.contactNo);
            setEmail(data.email);
            setFullName(data.fullName);
            setStatus(data.status);
            setUserName(data.userName);
            setCreatedOn(data.createdOn);
            setUserID(userID);
          } else console.log("No Data");
        })
        .catch((err) => console.log("Error"));
    }
  });

  return (
    <div className="profileBox">
      <div className="profileBox-header">
        <Avatar className="profileBox-inputAvatar" src={avatar} />
      </div>
      <h3>{fullName}</h3>
      <h5>{`@${userName}`}</h5>
      <p>{`Status: ${status}`}</p>
      <p>{`Created On: ${createdOn}`}</p>
      <Button
        startIcon={<EditIcon />}
        variant="outlined"
        className="profileBox-edit"
        onClick={handleOpen}
      >
        Edit Profile
      </Button>
      <Modal
        // aria-labelledby="transition-modal-title"
        // aria-describedby="transition-modal-description"
        className="profileBox-modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="profileBox-modalFade">
            <div className="modalHeader">
              <h2>Edit Profile</h2>
              {/* <Button
                endIcon={<DoneIcon />}
                variant="outlined"
                className="modal-editBtn"
                // onClick={handleClose}
              >
                Save Changes
              </Button> */}
            </div>
            <form method="POST" className="modal-formEdit" onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <div
                  // className="profileBox-header"
                  >
                    {/* <EditIcon> */}
                    <Avatar
                      startIcon={<EditIcon />}
                      className="modal-inputAvatar"
                      src={avatar}
                    />
                    <Input type="file" onChange={onFileChange} name="avatar" />
                    {/* </EditIcon> */}
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    label="Email"
                    value={email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="userName"
                    // type="email"
                    variant="outlined"
                    fullWidth
                    label="User Name"
                    value={userName}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="fullName"
                    name="fullName"
                    // type="email"
                    variant="outlined"
                    fullWidth
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="status"
                    // type="email"
                    variant="outlined"
                    fullWidth
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="contactNo"
                    type="telephone"
                    variant="outlined"
                    fullWidth
                    label="Contact No."
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                endIcon={<DoneIcon />}
                variant="outlined"
                className="modal-editBtn"
                // onClick={handleClose}
              >
                Save Changes
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default ProfileBox;
