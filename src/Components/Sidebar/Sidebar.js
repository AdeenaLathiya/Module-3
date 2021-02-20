import React from "react";

import { Link, useHistory } from "react-router-dom";

import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import { Button } from "@material-ui/core";

import "./Sidebar.css";

function Sidebar() {
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

      {/* Tweet Button */}
      <Button variant="outlined" className="sidebar-tweet" fullWidth>
        Tweet
      </Button>
    </div>
  );
}

export default Sidebar;
