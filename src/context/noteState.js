import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      tag: "personel",
      _id: "6151f6a31440e411ec7fc797",
      title: "Go To Market",
      description: "Groceries are out of stocks",
      user: "6151b4b70017080cb4237dff",
      date: "2021-09-27T16:51:47.440Z",
      __v: 0,
    },
    {
      tag: "professional",
      _id: "6153f3f1db6cc323a07a5bdf",
      title: "Go To Gym",
      description: "Get some weight on and win the titles",
      user: "6151b4b70017080cb4237dff",
      date: "2021-09-29T05:04:49.876Z",
      __v: 0,
    },
    {
      tag: "professional",
      _id: "6153f3f1db6cc323a07a5bdf1",
      title: "Go To Gym",
      description: "Get some weight on and win the titles",
      user: "6151b4b70017080cb4237dff",
      date: "2021-09-29T05:04:49.876Z",
      __v: 0,
    },
    {
        tag: "personel",
        _id: "6151f6a31440e411ec7fc7971",
        title: "Go To Market",
        description: "Groceries are out of stocks",
        user: "6151b4b70017080cb4237dff",
        date: "2021-09-27T16:51:47.440Z",
        __v: 0,
      },
  ];

  const [notes, setNotes] = useState(notesInitial);

  const addNote = (title, description, tag) => {
    const note = null
    setNotes(notes.push(note));
  }

  const deleteNote = () => {

  }

  const editNote = () => {

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
