import { createBrowserHistory } from "history";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";

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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
