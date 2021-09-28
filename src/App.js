import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import { useState } from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route} from "react-router-dom";


function App() {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if(mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(54,54,54)";
      document.body.style.color = "transparent";
    }
    else{
      setMode("light");
      document.body.style.backgroundColor = "transparent";
      document.body.style.color = "black";
    }
  }

  return (
    <>
    <Router>
      <Navbar mode={mode} toggleMode={toggleMode}/>
      <div className="container">
        <h2 style={{textAlign: 'center', margin: "5px"}}>Welcome To CloudBook</h2>
      </div>
      <Switch>
      <Route path="/">
          <Home/>
      </Route>
      <Route exact path="/home">
          <About/>
      </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
