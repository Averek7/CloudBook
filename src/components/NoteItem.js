import React, { useContext } from 'react'
import NoteContext from "../context/NoteContext"

export const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <>
            <div className="col-md-3 my-2">
                <div className="card" style={{ width: "16.5rem", display: "flex", flexDirection: "row-reverse", position: "relative", border: "none" }}>
                    <div className={`bg-${props.mode}`} style={{ fontSize: "18px", textAlign: "center" }}>
                        <i className="fas fa-trash" onClick={() => { deleteNote(note._id); props.showAlert("Successfully Deleted", "success"); }}></i>
                        <i className="fas fa-edit" onClick={() => { updateNote(note) }}></i>
                    </div>

                    <div className={`card-body bg-${props.mode}`} style={{ padding: "1rem 2rem" }}>
                        <h5 className="card-title"><strong>{note.title}</strong></h5>
                        <p className={`card-text text-${props.mode === "light" ? "primary" : "danger"}`}><b>{note.tag}</b></p>
                        <p className="card-text">{note.description}</p>
                    </div>

                </div>
            </div>
        </>
    )
}
