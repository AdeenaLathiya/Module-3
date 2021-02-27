import React, { useState, useEffect } from "react";

// import SearchBox from "./SearchBox";

// import SearchIcon from "@material-ui/icons/Search";
import FlipMove from "react-flip-move";

import Post from "../Feed/Post";

import firebaseApp from "../../firebase";

import "./Widgets.css";

function Widgets() {
  const [posts, setPosts] = useState([]);
  const [postID, setPostID] = useState([]);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    setLiked([]);
    setPosts([]);

    firebaseApp.auth().onAuthStateChanged(function user(user) {
      if (user) {
        const likeRef = firebaseApp
          .firestore()
          .collection("likedPosts")
          .where("likedBy", "==", user.uid)
          .get();

        const postRef = firebaseApp.firestore().collection("posts");

        setTimeout(() => {
          likeRef.then((querySnapshot) => {
            if (querySnapshot.size > 0) {
              setPostID(querySnapshot.docs.map((doc) => doc.data().postID));
              console.log(postID);
              postID.forEach((postID) => {
                return postRef
                  .doc(postID)
                  .onSnapshot((doc) =>
                    setPosts((prevArr) => [...prevArr, doc.data()])
                  );
              });
              console.log(posts);
            } else {
              console.log("No Data");
            }
          });
        }, 3000);
      } else {
        console.log("User is not Signed In");
      }
    });
  }, []);
  return (
    <div className="widgets">
      {/* <div className="widgets-input">
        <SearchIcon className="widgets-searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div> */}
      <div className="widgets-widgetContainer">
        <h2>Liked Tweets</h2>

        {posts.length > 0 ? (
          <FlipMove>
            {posts.map((post, i) => (
              <Post
                key={i} //documentid aaegi yahan pr firebase.doc.id
                displayName={post.displayName}
                userName={post.userName}
                verified={post.verified}
                text={post.text}
                avatar={post.avatar}
                image={post.image}
                createdOn={post.createdOn}
                totalLikes={post.likes}
                postID={postID[i]}
                liked={liked[i]}
              />
            ))}
          </FlipMove>
        ) : (
          <div>
            <h5>No Liked Tweets</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default Widgets;
