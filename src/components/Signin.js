import React, { useState } from 'react'
import {useHistory} from "react-router-dom"

export const Signin = (props) => {
    let history = useHistory();
    const host = "http://localhost:5000";
    const [credential, setCredential] = useState({ email: "", password: "" });

    const clickChange = (e) => {
        console.log({ [e.target.name]: e.target.value })
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }

    const btnSubmit = async(e) => {
        e.preventDefault();
        console.log("Submit clicked !");
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //redirect
            localStorage.setItem('token', json.authToken);
            history.push("/");
            props.showAlert("Successfully Logged-in !", "success");
        }
        else{
            props.showAlert("Invalid Credentials Entries", "danger");
        }
    }

    return (
        <div>
            <div className="container me-2">
                <div className={`container me-5 my-5 p-5 bg-${props.mode}`}>
                    <form onSubmit={btnSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" value={credential.email} aria-describedby="emailHelp" onChange={clickChange}/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={clickChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary my-2">Sign - In</button>
                        <button type="reset" className="btn btn-primary my-2 mx-3">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}