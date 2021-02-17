import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PublishIcon from '@material-ui/icons/Publish';

function Post({ displayName, userName, verified, text, image, avatar }) {
  return (
    <div className="post">
      <div className="post-avatar">
        <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" />
      </div>
      <div className="post-body">
        <div className="post-header">
          <div className="post-headerText">
            <h3>
              Adeena{" "}
              <span className="post-headerSpecial">
                <VerifiedUserIcon className="post-badge" /> @adeena
              </span>
            </h3>
          </div>
          <div className="post-headerDescription">
            <p>This is a challenge</p>
          </div>
        </div>
        <img
          src="https://media.giphy.com/media/XybYbEoykTGq5g5kco/giphy.gif"
          alt=""
        />
        <div className="post-footer">
          <ChatBubbleOutlineIcon fontSize="small"/>
          <RepeatIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small"/>
          <PublishIcon fontSize="small"/>
        </div>
      </div>
    </div>
  );
}

export default Post;
