import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";

function Sidebar() {
  return (
    <div className="sidebar">
      {/* Twitter Icon */}
      <TwitterIcon />
      {/* Sidebar Option */}

      <SidebarOption Icon={HomeIcon} text="Home" />
      <SidebarOption Icon={PersonIcon} text="Profile" />
      {/* <SidebarOption text="Tweet" /> */}
    </div>
  );
}

export default Sidebar;
