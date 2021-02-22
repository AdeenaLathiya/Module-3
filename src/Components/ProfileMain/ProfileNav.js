import React, { useState } from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

// import RestoreIcon from "@material-ui/icons/Restore";
import TwitterIcon from "@material-ui/icons/Twitter";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
// import LocationOnIcon from "@material-ui/icons/LocationOn";

import followers from "../followers/followers";
import following from "../following/following";
import myTweets from "../myTweets/myTweets";
import likedTweets from "../likedTweets/likedTweets";

import "./ProfileNav.css";

function ProfileNav() {
  const [value, setValue] = useState(0);

  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className="profileNav-body"
      >
        <BottomNavigationAction
          label="My Tweets"
          icon={<TwitterIcon />}
          onChange={<myTweets />}
        />

        <BottomNavigationAction label="Liked Tweets" icon={<FavoriteIcon />} />

        <BottomNavigationAction
          label="Followers"
          icon={<SupervisedUserCircleIcon />}
        />
        <BottomNavigationAction
          label="Following"
          icon={<SupervisedUserCircleIcon />}
        />
      </BottomNavigation>
    </div>
  );
}

export default ProfileNav;
