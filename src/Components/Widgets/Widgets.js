import React from "react";
import "./Widgets.css";
import SearchIcon from "@material-ui/icons/Search";

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
