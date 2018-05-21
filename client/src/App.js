import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import { clearCurrentProfile } from "./actions/profileAction";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/common/PrivateRoute";

// components, layout
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
// components, auth
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
// components, dashboard
import Dashboard from "./components/dashboard/Dashboard";
// components, create profile
import CreateProfile from "./components/create-profile/CreateProfile";
// components, edit profile
import EditProfile from "./components/edit-profile/EditProfile";
// components, add experience
import AddExperience from "./components/add-credentials/AddExperience";
// components, add experience
import AddEducation from "./components/add-credentials/AddEducation";
// components, profiles
import Profiles from "./components/profiles/Profiles";
// components, profile
import Profile from "./components/profile/Profile";
// components, Posts
import Posts from "./components/posts/Posts";
// components, Post
import Post from "./components/post/Post";
// components, not-found
import NotFound from "./components/not-found/NotFound";

import "./App.css";

// check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get suer info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for epired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    // clear current profile
    store.dispatch(clearCurrentProfile());
    // redirect login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/feed"
                  component={Posts}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/post/:id"
                  component={Post}
                />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
