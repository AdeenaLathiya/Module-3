import React from "react";

import Sidebar from "../Components/Sidebar/Sidebar";
// import Feed from "../Components/Feed/Feed";
import Widgets from "../Components/Widgets/Widgets";

import ProfileMain from "../Components/ProfileMain/ProfileMain";

import "./Profile.css";

function Profile() {
  return (
    <div className="profile">
      {/* <h1>Profile</h1> */}
      <Sidebar />
      <ProfileMain />
      <Widgets />
    </div>
  );
}

export default Profile;
