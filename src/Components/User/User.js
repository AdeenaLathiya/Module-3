import React, { useState, useEffect } from "react";

import FlipMove from "react-flip-move";

import { Avatar, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

import firebaseApp from "../../firebase";

import Followers from "../Followers/Followers";
import Post from "../Feed/Post";
import "../ProfileMain/ProfileBox.css";

function User({ uName }) {
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState("");
  const [username, setUserName] = useState(uName);
  const [createdOn, setCreatedOn] = useState("");
  const [verified, setVerified] = useState("false");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [liked, setLiked] = useState([]);
  const [postID, setPostID] = useState([]);
  const [follow, setFollow] = useState(false);
  const [userID, setUserID] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setLiked([]);

    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        setLoggedInUser(user.uid);

        firebaseApp
          .firestore()
          .collection("users")
          .where("userName", "==", uName)
          .get()
          .then((onSnapshot) => {
            if (onSnapshot.size > 0) {
              let doc = onSnapshot.docs[0];
              setFullName(doc.data().fullName);
              setUserName(doc.data().userName);
              setContactNo(doc.data().contactNo);
              setAvatar(doc.data().avatar);
              setEmail(doc.data().email);
              setStatus(doc.data().status);
              setUserID(doc.id);

              if (userID === loggedInUser) {
                setIsLoggedIn(true);
                console.log(userID, loggedInUser);
              } else {
                setIsLoggedIn(false);
                console.log(userID, loggedInUser);
              }
            } else {
              console.log("No Data");
            }
          })
          .catch((err) => {
            console.log(err);
          });

        firebaseApp
          .firestore()
          .collection("posts")
          .where("createdBy", "==", userID)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size > 0) {
              setPosts(querySnapshot.docs.map((doc) => doc.data()));

              console.log(posts);

              setPostID(
                querySnapshot.docs.map((doc) => {
                  firebaseApp.auth().onAuthStateChanged(function (user) {
                    if (user) {
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
                    } else {
                      console.log("User is not Signed In");
                    }
                  });
                  return doc.id;
                })
              );
            } else {
              console.log("No Data");
            }
          })
          .catch((err) => {
            console.log(err);
          });

        const followRef = firebaseApp
          .firestore()
          .collection("follow")
          .where("followedUser", "==", userID)
          .where("followedBy", "==", loggedInUser);

        followRef.get().then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            setFollow(true);
          } else {
            setFollow(false);
          }
        });
      } else {
        console.log("User is not Signed In");
      }
    });
  }, []);

  const onFollow = () => {
    const followRef = firebaseApp.firestore().collection("follow");

    const data = {
      followedUser: userID,
      followedBy: loggedInUser,
    };
    followRef.add(data);
    setFollow(true);
  };

  const onUnFollow = () => {
    const followRef = firebaseApp
      .firestore()
      .collection("follow")
      .where("followedUser", "==", userID)
      .where("followedBy", "==", loggedInUser);

    followRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
    setFollow(false);
  };

  const onFileChange = async (e) => {
    // e.preventDefault();

    const file = e.target.files[0];
    const storageRef = firebaseApp.storage().ref("avatar/");
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setAvatar(await fileRef.getDownloadURL());
  };

  const onSubmit = (e) => {
    e.preventDefault();

    var data = {
      avatar: avatar,
      contactNo: contactNo,
      // email: email,
      fullName: fullName,
      status: status,
      // userName: userName,
      // verified: verified,
    };

    var db = firebaseApp.firestore().collection("users").doc(loggedInUser);
    db.update(data);
    // db.set(data);

    console.log("Updated");

    handleClose();
  };

  // userRef
  // .get()
  // .then((doc) => {
  //   if (doc.exists) {
  //     console.log("Doc data: ", doc.data());

  //     const data = doc.data();
  //     setFullName(data.fullName);
  //     setUserName(data.userName);
  //     setAvatar(data.avatar);
  //     setEmail(data.email);
  //     setContactNo(data.contactNo);
  //     setStatus(data.status);
  //     setCreatedOn(data.createdOn);
  //     setUserID(userID);
  //   } else console.log("No Data");
  // })
  // .catch((err) => console.log("Error"));

  // firebaseApp.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     console.log("Signed In", firebaseApp.auth().currentUser.uid);
  //     var userID = firebaseApp.auth().currentUser.uid;
  //     const userRef = firebaseApp.firestore().collection("users").doc(userID);
  //     userRef
  //       .get()
  //       .then((doc) => {
  //         if (doc.exists) {
  //           console.log("Doc data: ", doc.data());

  //           const data = doc.data();
  //           setAvatar(data.avatar);
  //           setContactNo(data.contactNo);
  //           setEmail(data.email);
  //           setFullName(data.fullName);
  //           setStatus(data.status);
  //           setUserName(data.userName);
  //           setCreatedOn(data.createdOn);
  //           setUserID(userID);
  //         } else console.log("No Data");
  //       })
  //       .catch((err) => console.log("Error"));
  //   }
  // });

  return (
    <div className="profileBox">
      <div className="profileBox-header">
        <Avatar className="profileBox-inputAvatar" src={avatar} />
      </div>
      <h3>{fullName}</h3>
      <h5>{`@${username}`}</h5>
      <p>{`Status: ${status}`}</p>
      {/* <p>{`Created On: ${createdOn}`}</p> */}
      <Followers userID={userID} />
      {isLoggedIn ? (
        <Button
          startIcon={<EditIcon />}
          variant="outlined"
          className="profileBox-edit"
          onClick={handleOpen}
        >
          Edit Profile
        </Button>
      ) : follow ? (
        <Button
          // startIcon={<EditIcon />}
          variant="outlined"
          className="profileBox-edit"
          onClick={onUnFollow}
        >
          UnFollow
        </Button>
      ) : (
        <Button
          // startIcon={<EditIcon />}
          variant="outlined"
          className="profileBox-edit"
          onClick={onFollow}
        >
          Follow
        </Button>
      )}

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

      <Modal
        // aria-labelledby="transition-modal-title"
        // aria-describedby="transition-modal-description"
        className="profileBox-modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="profileBox-modalFade">
            <div className="modalHeader">
              <h2>Edit Profile</h2>
              <Avatar
                startIcon={<EditIcon />}
                className="modal-inputAvatar"
                src={avatar}
              />
              <Input type="file" onChange={onFileChange} name="avatar" />
              {/* <Button
                endIcon={<DoneIcon />}
                variant="outlined"
                className="modal-editBtn"
                // onClick={handleClose}
              >
                Save Changes
              </Button> */}
            </div>
            <form method="POST" className="modal-formEdit" onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <div
                  // className="profileBox-header"
                  >
                    {/* <EditIcon> */}
                    {/* <Avatar
                      startIcon={<EditIcon />}
                      className="modal-inputAvatar"
                      src={avatar}
                    />
                    <Input type="file" onChange={onFileChange} name="avatar" /> */}
                    {/* </EditIcon> */}
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    label="Email"
                    value={email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="userName"
                    type="text"
                    variant="outlined"
                    fullWidth
                    label="User Name"
                    value={username}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    // autoComplete="fullName"
                    name="fullName"
                    type="text"
                    variant="outlined"
                    fullWidth
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="status"
                    // type="email"
                    multiline
                    variant="outlined"
                    fullWidth
                    label="Status"
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="contactNo"
                    type="tel"
                    variant="outlined"
                    fullWidth
                    label="Contact No."
                    value={contactNo}
                    onChange={(e) => {
                      setContactNo(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="update"
                endIcon={<DoneIcon />}
                variant="outlined"
                className="modal-editBtn"
                // onClick={handleClose}
              >
                Save Changes
              </Button>
              <Button
                // type="submit"
                endIcon={<CloseIcon />}
                variant="outlined"
                className="modal-closeBtn"
                onClick={handleClose}
                color="secondary"
              >
                Cancel
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default User;
