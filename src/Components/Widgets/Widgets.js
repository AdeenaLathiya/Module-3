import React, { useState } from "react";

import SearchBox from "./SearchBox";

import SearchIcon from "@material-ui/icons/Search";

import firebaseApp from "../../firebase";

import "./Widgets.css";

function Widgets() {
  const [searchField, setSearchField] = useState("");

  firebaseApp.auth().onAuthStateChanged((user) => {
    if (user) {
      var userID = firebaseApp.auth().currentUser.uid;
      const userRef = firebaseApp.firestore().collection("users").doc(userID);
      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            let users = doc.data().fullName;
            const filteredUsers = users.filter((user) => {
              return user.fullName
                .toLowerCase()
                .includes(searchField.toLowerCase());
            });
            console.log(filteredUsers);
          } else console.log("No Data");
        })
        .catch((err) => console.log("Error"));
    }
  });

  const onSearchChange = (e) => {
    setSearchField(e.target.value);
  };

  // const filteredUsers = users.filter((user) => {
  //   return user.fullName.toLowerCase().includes(searchField.toLowerCase());
  // });

  return (
    <div className="widgets">
      <SearchBox searchChange={onSearchChange} />
      {/* <div className="widgets-input">
        <SearchIcon className="widgets-searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div> */}
      <div className="widgets-widgetContainer">
        {/* <h2>{filteredUsers}</h2> */}
      </div>
    </div>
  );
}

export default Widgets;
