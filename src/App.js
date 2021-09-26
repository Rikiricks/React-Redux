import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Post from './components/Post'
import PostList from './components/PostList'
import AddPost from './components/AddPost'

function App() {
  return (
    <Router>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to={"/posts"} className="navbar-brand">
        ReduxRicks
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/posts"} className="nav-link">
            Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/add"} className="nav-link">
            Add
          </Link>
        </li>
      </div>
    </nav>

    <div className="container mt-3">
      <Switch>
        <Route exact path={["/", "/posts"]} component={PostList} />
        <Route exact path="/add" component={AddPost} />
        <Route path="/posts/:id" component={Post} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
