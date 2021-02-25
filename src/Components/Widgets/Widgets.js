import React, { useState, useEffect } from "react";

import SearchBox from "./SearchBox";

import SearchIcon from "@material-ui/icons/Search";

import firebaseApp from "../../firebase";

import "./Widgets.css";

function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets-input">
        <SearchIcon className="widgets-searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>
      <div className="widgets-widgetContainer">
        <h2>What's Happening</h2>
      </div>
    </div>
  );
}

export default Widgets;
