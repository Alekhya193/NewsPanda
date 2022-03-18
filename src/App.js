import logo from "./logo.svg";
import "./App.css";

// type rcc for this:-
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apikey=process.env.myapi_is

  state={
    progress:0
  }
  setprogress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />

          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={3}
        
      />
          
          <Switch>
            <Route exact path="/"><News setprogress={this.setprogress} apikey={this.apikey} key={"general"} pageSize={6} country="in" category="general" /></Route>
            <Route exact path="/business"><News setprogress={this.setprogress} apikey={this.apikey} key={"business"} pageSize={6} country="in" category="business" />business</Route>
            <Route exact path="/entertainment"><News setprogress={this.setprogress} apikey={this.apikey} key={"entertainment"} pageSize={6} country="in" category="entertainment" />entertainment</Route>
            <Route exact path="/health"><News setprogress={this.setprogress} apikey={this.apikey} key={"health"} pageSize={6} country="in" category="health" />health</Route>
            <Route exact path="/science"><News setprogress={this.setprogress} apikey={this.apikey} key={"science"} pageSize={6} country="in" category="science" />science</Route>
            <Route exact path="/sports"><News setprogress={this.setprogress} apikey={this.apikey} key={"sports"} pageSize={6} country="in" category="sports" />sports</Route>
            <Route exact path="/technology"><News setprogress={this.setprogress} apikey={this.apikey} key={"technology"} pageSize={6} country="in" category="technology" />technology</Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
