import React, { useState, useEffect } from "react";

import FlipMove from "react-flip-move";

import firebaseApp from "../../firebase";

import TweetBox from "./TweetBox";
import Post from "./Post";

import "./Feed.css";
import { PostAddOutlined } from "@material-ui/icons";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [postID, setPostID] = useState([]);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    setLiked([]);

    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebaseApp
          .firestore()
          .collection("posts")
          .get()
          .then(function (querySnapshot) {
            if (querySnapshot.size > 0) {
              setPosts(querySnapshot.docs.map((doc) => doc.data()));

              console.log(posts);

              setPostID(
                querySnapshot.docs.map((doc) => {
                  const ref = firebaseApp
                    .firestore()
                    .collection("likedPosts")
                    .where("postID", "==", doc.id)
                    .where("likedBy", "==", user.uid);

                  ref
                    .get()
                    .then((onSnapshot) => {
                      if (onSnapshot.size > 0) {
                        setLiked((prevArr) => [...prevArr, "liked"]);
                        console.log(liked, doc.data());
                      } else {
                        setLiked((prevArr) => [...prevArr, "notLiked"]);
                        console.log("No Data");
                      }
                    })
                    .catch(function (err) {
                      console.log(err);
                    });
                  return doc.id;
                })
              );
            } else {
              console.log("No Data");
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        console.log("User is not Signed In");
      }
    });

    // firebaseApp
    //   .firestore()
    //   .collection("posts")
    //   // .orderBy("", "asc")
    //   .onSnapshot((snapshot) => {
    //     setPosts(snapshot.docs.map((doc) => doc.data()));
    //   });
  }, []);

  console.log(postID);
  console.log(liked, "liked");

  return (
    <div className="feed">
      {/* Header */}
      <div className="feed-header">
        <h2>Home</h2>
      </div>

      {/* TweetBox */}
      <TweetBox />

      {/* Posts */}
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
          <h1>No Tweets Yet</h1>
        </div>
      )}
    </div>
  );
}

export default Feed;
