import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";

import firebaseApp from "../../firebase";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Button } from "@material-ui/core";

import SidebarOption from "./SidebarOption";
import TweetBox from "../Feed/TweetBox";

import "./Sidebar.css";

function Sidebar() {
  const [userName, setUserName] = useState("");

  const [open, setOpen] = useState(false);

  // const history = useHistory();

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebaseApp
          .firestore()
          .collection("users")
          .doc(user.uid)
          .onSnapshot((doc) => setUserName(doc.data().userName));

        console.log(userName, "Ref");
      } else {
        console.log("User is not Signed In");
      }
    });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onLogOut = () => {
    // e.preventDefault();
    // console.log("clicked");
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed Out");
        // history.replace("/signin");
      })
      .catch((err) => {
        console.log("Failed to Log Out");
      });
  };

  return (
    <div className="sidebar">
      {/* Twitter Icon */}
      <TwitterIcon className="sidebar-twitter-icon" />

      {/* Sidebar Option */}
      <Link to="/">
        <SidebarOption active Icon={HomeIcon} text="Home" />
      </Link>

      <Link to={`/profile/${userName}`}>
        <SidebarOption Icon={PersonIcon} text="Profile" />
      </Link>

      <Link to="/signin" onClick={onLogOut}>
        <SidebarOption Icon={ExitToAppIcon} text="Log Out" />
      </Link>

      {/* <Button
        startIcon={<ExitToAppIcon />}
        variant="outlined"
        className="sidebar-logout"
        fullWidth
        onClick={() => onLogOut()}
      >
        Log Out
      </Button> */}

      {/* Tweet Button */}
      <Button
        variant="outlined"
        className="sidebar-tweet"
        fullWidth
        onClick={handleOpen}
      >
        Tweet
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
            <TweetBox />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Sidebar;
