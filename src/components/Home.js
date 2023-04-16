import React from "react";
import { AddNote } from "./AddNote";
import { Notes } from "./Notes";

export default function Home(props) {
  return (
    <>
      <AddNote mode={props.mode} showAlert={props.showAlert} />
      <Notes mode={props.mode} showAlert={props.showAlert} />
    </>
  );
}
