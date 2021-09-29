import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import { useState } from "react";
import NoteState from "./context/NoteState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(54,54,54)";
      document.body.style.color = "azure";
      showAlert("Enabled Dark Mode", "Success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "transparent";
      document.body.style.color = "black";
      showAlert("Enabled Light Mode", "Success");
    }
  };

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      typ: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode} showAlert={showAlert}/>
          <Alert alert={alert} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home mode={mode} toggleMode={toggleMode}/>
              </Route>
              <Route exact path="/about">
                <About mode={mode} toggleMode={toggleMode}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
