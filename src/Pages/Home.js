import React from "react";

import Sidebar from "../Components/Sidebar/Sidebar";
import Feed from "../Components/Feed/Feed";
import Widgets from "../Components/Widgets/Widgets";
import SearchBox from "../Components/Widgets/SearchBox";

import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Sidebar />
      <Feed />
      <SearchBox />
      {/* <Widgets /> */}
    </div>
  );
}

export default Home;
