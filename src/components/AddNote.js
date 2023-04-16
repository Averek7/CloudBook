import React, { useState, useContext } from "react";
import NoteContext from "../context/NoteContext";

export const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "general",
  });

  const clickChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const btnAdd = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Note added to collection", "success");
    setNote({ title: "", description: "", tag: "" });
  };

  return (
    <div>
      <div className={`m-3 p-3 bg-${props.mode}`}>
        <h3 className="text-center my-2">Add Notes</h3>
        <div className="container my-4">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              placeholder="Enter title for your note"
              onChange={clickChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              rows="3"
              placeholder="Describe your note"
              onChange={clickChange}
              minLength={5}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                value={note.tag}
                placeholder="Enter tag related"
                onChange={clickChange}
                minLength={5}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className={`btn btn-${
              props.mode === "light" ? "dark" : "light"
            } m-2`}
            onClick={btnAdd}
          >
            Add to Notes
          </button>
        </div>
      </div>
    </div>
  );
};
