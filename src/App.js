import "./App.css";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import { Router, Route, browserHistory, IndexRouter } from "react-router";

function App() {
  return (
    <div className="app">
      <Home />
      <SignUp />
      <SignIn />
    </div>
  );
}

export default App;
