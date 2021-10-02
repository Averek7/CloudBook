import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import { useState } from "react";
import NoteState from "./context/NoteState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      typ: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }


  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      showAlert("Enabled Dark Mode", "success");
      document.body.style.backgroundColor = "rgb(54,54,54)";
      document.body.style.color = "azure";
    } else {
      setMode("light");
      showAlert("Enabled Light Mode", "success");
      document.body.style.backgroundColor = "transparent";
      document.body.style.color = "black";
    }
  };

  
  return (
    <>
      <NoteState>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode} showAlert={showAlert}/>
          <Alert alert={alert} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home mode={mode} toggleMode={toggleMode} showAlert={showAlert}/>
              </Route>
              <Route exact path="/about">
                <About mode={mode} toggleMode={toggleMode}/>
              </Route>
              <Route exact path="/signin">
                <Signin mode={mode} toggleMode={toggleMode} showAlert={showAlert}/>
              </Route>
              <Route exact path="/signup">
                <Signup mode={mode} toggleMode={toggleMode} showAlert={showAlert}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
