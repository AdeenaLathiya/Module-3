import React, { useState, useEffect } from "react";
import "./Followers.css";
import { Link } from "react-router-dom";
import {
  Button,
  Tab,
  Tabs,
  Paper,
  Avatar,
  Box,
  Typography,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import PropTypes from "prop-types";
// import db from "../firebase";
import firebaseApp from "../../firebase";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "500px",
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });
  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

function Followers({ userID }) {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const [followerID, setFollowerID] = useState([]);
  const [followingID, setFollowingID] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const followersRef = firebaseApp
      .firestore()
      .collection("follow")
      .where("followedUser", "==", userID)
      .get();

    const followingRef = firebaseApp
      .firestore()
      .collection("follow")
      .where("followedBy", "==", userID)
      .get();

    const userRef = firebaseApp.firestore().collection("users");

    followersRef.then((onSnapshot) => {
      if (onSnapshot.size > 0) {
        setFollowerID(onSnapshot.docs.map((doc) => doc.data().followedBy));

        followerID.forEach((followerID) => {
          return userRef
            .doc(followerID)
            .onSnapshot((doc) =>
              setFollowers((prevArr) => [...prevArr, doc.data()])
            );
        });
        console.log(followers);
      } else {
        console.log("no such document");
      }
    });

    followingRef.then((onSnapshot) => {
      if (onSnapshot.size > 0) {
        setFollowerID(onSnapshot.docs.map((doc) => doc.data().followedUser));

        followingID.forEach((followingID) => {
          return userRef
            .doc(followingID)
            .onSnapshot((doc) =>
              setFollowing((prevArr) => [...prevArr, doc.data()])
            );
        });
        console.log(following);
      } else {
        console.log("no such document");
      }
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className="follow" variant="contained" onClick={handleOpen}>
        Followers
      </Button>
      <Button className="follow" variant="contained" onClick={handleOpen}>
        Following
      </Button>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Paper square>
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                variant="fullWidth"
              >
                <Tab label="Followers" {...a11yProps(0)} />

                <Tab label="Following" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                {followers.length > 0 ? (
                  followers.map((follower) => {
                    <div>
                      <Avatar src={follower.avatar} />
                      <h4>{follower.fullName}</h4>
                    </div>;
                  })
                ) : (
                  <h2>No Followers</h2>
                )}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {following.length > 0 ? (
                  following.map((following) => {
                    <div>
                      <Avatar src={following.avatar} />
                      <h4>{following.fullName}</h4>
                    </div>;
                  })
                ) : (
                  <h2>No Following</h2>
                )}
              </TabPanel>
            </Paper>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Followers;
