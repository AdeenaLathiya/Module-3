import React from "react";

import SearchIcon from "@material-ui/icons/Search";

import "./Widgets.css";

function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets-input">
        <SearchIcon className="widgets-searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>
      <div className="widgets-widgetContainer">
        <h2>What's happening?</h2>
      </div>
    </div>
  );
}

export default Widgets;
