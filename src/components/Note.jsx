import React, { useState } from "react";
import notes from "../notes.js";

function Note(props) {
  const [show, updateShow] = useState(true);

  function handleDelete() {
    // The following line is an approach suggested by the professor in the Nov 3rd class.
    //updateShow(false);
    // The following line is the approach suggested by the midterm question prompt.
    props.deleteNote(props.id);
  }

  return (
    // the style is not used. It goes with the approach suggested by professor
    <div className="note" style={{ display: show ? "block" : "none" }}>
      <button onClick={handleDelete}> x </button>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
}

export default Note;
