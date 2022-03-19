import logo from "./logo.svg";
import "./App.css";

// type rcc for this:-
import React,{useState} from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  // apikey=process.env.myapi_is

  const [progress, setprogress] = useState(0)

  
  
    return (
      <div>
        <Router>
          <Navbar />

          <LoadingBar
        color='#f11946'
        
        
        progress={progress}
        height={3}
        
      />
          
          <Switch>
            <Route exact path="/"><News setprogress={setprogress} key={"general"} pageSize={6} country="in" category="general" /></Route>
            <Route exact path="/business"><News setprogress={setprogress} key={"business"} pageSize={6} country="in" category="business" />business</Route>
            <Route exact path="/entertainment"><News setprogress={setprogress} key={"entertainment"} pageSize={6} country="in" category="entertainment" />entertainment</Route>
            <Route exact path="/health"><News setprogress={setprogress} key={"health"} pageSize={6} country="in" category="health" />health</Route>
            <Route exact path="/science"><News setprogress={setprogress} key={"science"} pageSize={6} country="in" category="science" />science</Route>
            <Route exact path="/sports"><News setprogress={setprogress} key={"sports"} pageSize={6} country="in" category="sports" />sports</Route>
            <Route exact path="/technology"><News setprogress={setprogress} key={"technology"} pageSize={6} country="in" category="technology" />technology</Route>
          </Switch>
        </Router>
      </div>
    );
  
}

export default App;