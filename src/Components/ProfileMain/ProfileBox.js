import React from "react";

import { Avatar } from "@material-ui/core";

import "./ProfileBox.css";

function ProfileBox() {
  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox-input">
          <Avatar
          // src={avatar}
          />
        </div>
      </form>
    </div>
  );
}

export default ProfileBox;
