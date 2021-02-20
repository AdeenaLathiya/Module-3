import React from "react";

import ProfileBox from "../ProfileMain/ProfileBox";
import ProfileNav from "../ProfileMain/ProfileNav";
// import TweetBox from "../Feed/TweetBox";

import "./ProfileMain.css";

function Profile() {
  return (
    <div className="feed">
      {/* Header */}
      <div className="feed-header">
        <h2>Profile</h2>
      </div>

      {/* TweetBox */}
      <ProfileBox />

      {/* ProfileNav */}
      <ProfileNav />
    </div>
  );
}

export default Profile;
