import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import { Button } from "@material-ui/core";

function Sidebar() {
  return (
    <div className="sidebar">
      {/* Twitter Icon */}
      <TwitterIcon />

      {/* Sidebar Option */}
      <SidebarOption active Icon={HomeIcon} text="Home" />
      <SidebarOption Icon={PersonIcon} text="Profile" />

      {/* Tweet Button */}
      <Button variant="outlined" className="sidebar-tweet" fullWidth>
        Tweet
      </Button>
    </div>
  );
}

export default Sidebar;
