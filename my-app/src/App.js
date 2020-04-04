import React from 'react';
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(props) {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home" exact component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" exact component={Register}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
