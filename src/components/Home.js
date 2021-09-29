import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext'

export default function Home(props) {
    const context = useContext(NoteContext);
    const { notes } = context;

    return (
        <>
            <div className={`m-3 p-3 bg-${props.mode}`}>
                <h2>Add Notes</h2>
                <div className="container my-4">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter title for your note" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button type="submit" className={`btn btn-${props.mode === "light"? "dark" : "light"}`}>Submit</button>
                </div>
            </div>
            <div className="container">
                <div className="row my-3">
                    <h2 className="text-center">Your Notes</h2>
                    {notes.map((elem) => (
                        <div className="col-md-3 my-2">
                            <div className={`card`} style={{ width: "16.5rem", display: "flex", flexDirection: "row-reverse", position: "relative", border: "none" }}>
                                <div className={`bg-${props.mode}`} style={{ fontSize: "18px", textAlign: "center"}}>
                                    <i className="fas fa-trash"></i>
                                    <i className="fas fa-edit"></i>
                                </div>
                                <div className={`card-body card-body-${props.mode} bg-${props.mode}`}>
                                    <h5 className="card-title"><strong>{elem.title}</strong></h5>
                                    <p className={`card-text text-${props.mode === "light" ? "primary" : "danger"}`}><b>{elem.tag}</b></p>
                                    <p className="card-text">{elem.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
