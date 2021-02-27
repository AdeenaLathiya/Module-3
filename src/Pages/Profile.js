import React from "react";

import { Grid, Box } from "@material-ui/core/";

import { useParams } from "react-router-dom";

import User from "../Components/User/User";
import Sidebar from "../Components/Sidebar/Sidebar";
// import Feed from "../Components/Feed/Feed";
import Widgets from "../Components/Widgets/Widgets";

import ProfileMain from "../Components/ProfileMain/ProfileMain";
import SearchBox from "../Components/Widgets/SearchBox";

import "./Profile.css";

function Profile() {
  const { username } = useParams();

  return (
    <div className="profile">
      {/* <h1>Profile</h1> */}
      <Sidebar />
      {/* <ProfileMain userName={userName} /> */}
      <User uName={username} />
      <SearchBox />
      <Widgets />
    </div>
  );
}

export default Profile;
