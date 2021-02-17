import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

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
              <span>
                <VerifiedUserIcon className="post-badge" />
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
          
        </div>
      </div>
    </div>
  );
}

export default Post;
