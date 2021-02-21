import React from "react";

import { Link, useHistory } from "react-router-dom";

import firebaseApp from "../../firebase";

import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Button } from "@material-ui/core";

import "./Sidebar.css";

function Sidebar() {
  const history = useHistory();

  const onLogOut = () => {
    // e.preventDefault();

    console.log("clicked");

    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed Out");
        history.replace("/signin");
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

      <Link to="/profile">
        <SidebarOption Icon={PersonIcon} text="Profile" />
      </Link>

      <Button
        startIcon={<ExitToAppIcon />}
        variant="outlined"
        className="sidebar-logout"
        fullWidth
        onClick={() => onLogOut()}
      >
        Log Out
      </Button>

      {/* Tweet Button */}
      <Button variant="outlined" className="sidebar-tweet" fullWidth>
        Tweet
      </Button>
    </div>
  );
}

export default Sidebar;
