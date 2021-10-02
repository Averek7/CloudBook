import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'

export default function Navbar(props) {
    let location = useLocation();
    const history = useHistory();

    const btnLogout = () => {
        localStorage.clear();
        history.push("/signin");
        props.showAlert("Successfully Logged Out", "success");
    }

    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">CloudBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>

                        </ul>
                        {(!localStorage.getItem('token')) ? <div className="d-flex">
                            <Link className="btn btn-secondary mx-1" to="/signin" role="button">Sign-In</Link>
                            <Link className="btn btn-secondary mx-1" to="/signup" role="button">Sign-Up</Link>
                        </div> : <div className="d-flex"> <Link className="btn btn-secondary mx-1" to="/signin" role="button" onClick={btnLogout}>Sign-Out</Link></div>}
                        <div className="form-check form-switch m-2">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={props.toggleMode} />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{props.mode === "light" ? "light" : "dark"}</label>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
