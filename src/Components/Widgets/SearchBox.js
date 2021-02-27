import React, { useState, useEffect } from "react";

// import SearchBox from "./SearchBox";

import SearchIcon from "@material-ui/icons/Search";

import firebaseApp from "../../firebase";

import { useHistory } from "react-router-dom";

import "./SearchBox.css";

function SearchBox() {
  const [users, setUsers] = useState([]);

  const history = useHistory();

  var user = firebaseApp.firestore().collection("users");

  useEffect(() => {
    user.onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data().userName));
    });
  }, []);

  const keyPress = (e) => {
    if (e.charCode === 13) {
      console.log(e.target.value, e.target.getAttribute("key"));
      history.push(`/profile/${e.target.value}`);
    }
  };

  return (
    // <div>
    <div className="search">
      <div className="search-input">
        <SearchIcon className="search-searchIcon" />
        <input
          placeholder="Search Twitter"
          list="users"
          name="users"
          id="users"
          onKeyPress={keyPress}
        />
      </div>
      <datalist>
        {users.map((user, i) => (
          <option key={i} value={user} />
        ))}
      </datalist>
    </div>
    // </div>
  );
}

export default SearchBox;
