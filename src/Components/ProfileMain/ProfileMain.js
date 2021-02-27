import React from "react";

import { useParams } from "react-router-dom";

import ProfileBox from "../ProfileMain/ProfileBox";
import ProfileNav from "../ProfileMain/ProfileNav";

import "./ProfileMain.css";

function ProfileMain() {
  const { userName } = useParams();

  return (
    <div className="feed">
      {/* Header */}
      <div className="feed-header">
        <h2>Profile</h2>
      </div>

      {/* ProfileBox */}
      <ProfileBox userName={userName} />

      {/* ProfileNav */}
      <ProfileNav />
    </div>
  );
}

export default ProfileMain;
