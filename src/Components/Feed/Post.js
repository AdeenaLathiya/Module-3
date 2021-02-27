import React, { Component, forwardRef } from "react";

import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PublishIcon from "@material-ui/icons/Publish";

import firebaseApp from "../../firebase";

import "./Post.css";

// const Post = forwardRef(
//   (
//     { displayName, userName, verified, text, image, avatar, createdOn },
//     ref
//   ) => {
//     return (
//       <div className="post" ref={ref}>
//         <div className="post-avatar">
//           <Avatar src={avatar} />
//         </div>
//         <div className="post-body">
//           <div className="post-header">
//             <div className="post-headerText">
//               <h3>
//                 {displayName}{" "}
//                 <span className="post-headerSpecial">
//                   {verified && <VerifiedUserIcon className="post-badge" />} @
//                   {userName}
//                   {/* {`${firebaseApp.firebase_.firestore.Timestamp.fromDate(
//                     createdOn
//                   )}`} */}
//                 </span>
//               </h3>
//             </div>
//             <div className="post-headerDescription">
//               <p>{text}</p>
//             </div>
//           </div>
//           <img src={image} alt="" />
//           <div className="post-footer">
//             <ChatBubbleOutlineIcon fontSize="small" />
//             <RepeatIcon fontSize="small" />
//             <FavoriteBorderIcon fontSize="small" />
//             <PublishIcon fontSize="small" />
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: "",
      userID: firebaseApp.auth().currentUser.uid,
      postID: "",
      ref: {},
      refLike: {},
      postRef: {},
      totalLikes: 0,
      icon: true,
    };
    this.onLike = this.onLike.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return {
      postID: props.postID,
      liked: props.liked,
      totalLikes: props.totalLikes,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        ref: firebaseApp.firestore().collection("likedPosts"),

        postRef: firebaseApp
          .firestore()
          .collection("posts")
          .doc(this.state.postID),

        refLike: firebaseApp
          .firestore()
          .collection("likedPosts")
          .where("postID", "==", this.state.postID)
          .where("likedBy", "==", this.state.userID),
      });

      if (this.state.liked === "liked") {
        this.setState({ icon: false });
      }

      console.log(this.state.ref, this.state.refLike);
    }, 3000);
  }

  onLike = (e) => {
    const {
      liked,
      postID,
      noOfLikes,
      userID,
      ref,
      refLike,
      postRef,
      totalLikes,
    } = this.state;

    console.log("called", liked);

    this.setState({ icon: false });

    if (liked === "notLiked") {
      this.setState(
        {
          liked: "liked",
          totalLikes: totalLikes + 1,
        },
        () => {
          console.log(this.state.liked, this.state.totalLikes);
        }
      );

      let data = {
        postID: postID,
        likedBy: userID,
      };

      refLike.get().then((querySnapshot) => {
        if (querySnapshot.size <= 0) {
          ref.add(data);
          postRef.update({ likes: totalLikes + 1 });
        } else if (querySnapshot.size > 0) {
          alert("Liked Already");
        }
      });

      console.log(data);
      console.log(noOfLikes);
    }
  };

  render() {
    const {
      displayName,
      userName,
      verified,
      text,
      image,
      avatar,
      createdOn,
      liked,
    } = this.props;

    return (
      <div className="post">
        <div className="post-avatar">
          <Avatar src={avatar} />
        </div>
        <div className="post-body">
          <div className="post-header">
            <div className="post-headerText">
              <h3>
                {displayName}{" "}
                <span className="post-headerSpecial">
                  {" "}
                  {verified && <VerifiedUserIcon className="post-badge" />} @
                  {userName}
                  {/* {`${firebaseApp.firebase_.firestore.Timestamp.fromDate(
                createdOn
              )}`} */}
                </span>
              </h3>
            </div>
            <div className="post-headerDescription">
              <p>{text}</p>
            </div>
          </div>
          <img src={image} alt="" />
          <div className="post-footer">
            {/* <ChatBubbleOutlineIcon fontSize="small" /> */}
            {/* <RepeatIcon fontSize="small" /> */}
            <div>
              <i className="icon" onClick={this.onLike}>
                {this.state.icon ? (
                  <FavoriteBorderIcon fontSize="small" className="favIcon" />
                ) : (
                  <FavoriteIcon fontSize="small" className="fav-Icon" />
                )}
              </i>

              {this.state.totalLikes}
            </div>

            <span className="createdOn">{createdOn}</span>
            {/* <FavoriteBorderIcon fontSize="small" /> */}
            {/* <PublishIcon fontSize="small" /> */}
          </div>
        </div>
      </div>
    );
  }
}
export default Post;
