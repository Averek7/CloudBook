import React, { useContext, useState, useEffect, useRef } from 'react'
import NoteContext from '../context/NoteContext'
import { NoteItem } from './NoteItem';

export const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getAllnote, editNote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);

    useEffect(() => {
        getAllnote();
        // eslint-disable-next-line
    }, []);

    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "general" });

    const clickChange = (e) => {
        console.log({ [e.target.name]: e.target.value })
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }

    const btnUpdate = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    }

    return (
        <div>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" name="etitle" value={note.etitle} placeholder="Enter title for your note" onChange={clickChange} minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" id="description" name="edescription" value={note.edescription} rows="3" placeholder="Describe your note" onChange={clickChange} minLength={5} required></textarea>
                            </div>
                            <div className="mb-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="tag" name="etag" value={note.etag}  placeholder="Enter tag related" onChange={clickChange} minLength={5} required />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={btnUpdate}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="text-center m-2">Your Notes</h2>
            <div className={`container d-block m-auto`}>
                <div className="row m-3">
                    {notes.length === 0 ? "Your Note Collection is Empty" :
                    notes.map((elem) => (
                        <NoteItem key={elem._id} note={elem} updateNote={updateNote} mode={props.mode} />
                    ))
                    }
                </div>
            </div>
        </div>

    )
}
