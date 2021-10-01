import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Fetching all notes
  const getAllnote = async() => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MWI0YjcwMDE3MDgwY2I0MjM3ZGZmIn0sImlhdCI6MTYzMjc2MjE0N30.fkwsFP0dUl2UMtJ0OHBmRDF7fhezVjIi89dXYoqnHIo"
      }
    });
    const json = await response.json();
    setNotes(json.notes);
  }

  // Adding a note
  const addNote = async(title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MWI0YjcwMDE3MDgwY2I0MjM3ZGZmIn0sImlhdCI6MTYzMjc2MjE0N30.fkwsFP0dUl2UMtJ0OHBmRDF7fhezVjIi89dXYoqnHIo"
      },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  }


  // Deleting a note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MWI0YjcwMDE3MDgwY2I0MjM3ZGZmIn0sImlhdCI6MTYzMjc2MjE0N30.fkwsFP0dUl2UMtJ0OHBmRDF7fhezVjIi89dXYoqnHIo"
      },
    });
    console.log(await(response.json()));
    console.log("Deleting note " + id);
    const newNote = notes.filter((note) => { return (note._id !== id) });
    setNotes(newNote);
  }


  // Editing a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MWI0YjcwMDE3MDgwY2I0MjM3ZGZmIn0sImlhdCI6MTYzMjc2MjE0N30.fkwsFP0dUl2UMtJ0OHBmRDF7fhezVjIi89dXYoqnHIo"
      },
      body: JSON.stringify({title, description, tag})
    });
    console.log(await(response.json()));
    const newNote = JSON.parse(JSON.stringify(notes));
    for(var i = 0; i<newNote.length; i++) {
      const elem = notes[i];
      if(elem._id === id) {
        newNote[i].title = title;
        newNote[i].description = description;
        newNote[i].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  }

  return (
    <NoteContext.Provider value={{ notes, getAllnote, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

