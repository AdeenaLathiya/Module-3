import React, { useState, useEffect } from "react";

import FlipMove from "react-flip-move";

import firebaseApp from "../../firebase";

import TweetBox from "./TweetBox";
import Post from "./Post";

import "./Feed.css";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    firebaseApp
      .firestore()
      .collection("posts")
      // .orderBy("", "asc")
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div className="feed">
      {/* Header */}
      <div className="feed-header">
        <h2>Home</h2>
      </div>

      {/* TweetBox */}
      <TweetBox />

      {/* Posts */}
      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.text} //documentid aaegi yahan pr firebase.doc.id
            displayName={post.displayName}
            userName={post.userName}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
