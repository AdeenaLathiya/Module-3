import { createBrowserHistory } from "history";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Profile from "./Pages/Profile";
import User from "./Components/User/User";

import "./App.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter history={createBrowserHistory}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/profile/:username">
            <Profile />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
