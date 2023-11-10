import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes.js";

var notesArr = notes;
var count = notesArr.length;

function CreateNotes(constant) {
  return (
    <Note key={constant.id} title={constant.title} content={constant.content} />
  );
}

function onClickPreventDefault(e) {
  e.preventDefault();
}

function App() {
  const [arr, setArr] = useState(notesArr);
  const [items, setItems] = useState({ title: "", content: "" });

  const deleteNote = (id) => {
    notesArr = notesArr.filter((note) => note.key !== id);
    setArr(notesArr);
    console.log(notesArr);
  };

  function handleChange(event) {
    const { value, name } = event.target;
    setItems((prevValue) => {
      if (name === "title") {
        return { title: value, content: prevValue.content };
      } else if (name === "content") {
        return { title: prevValue.title, content: value };
      }
    });
  }

  function addNote() {
    count = count + 1;
    if (items.title !== "" && items.content !== "") {
      notesArr.push({ key: count, title: items.title, content: items.content });
    }
    setArr(notesArr);
    console.log(notesArr);
    setItems({ title: "", content: "" });
  }

  return (
    <div>
      <Header />
      <center>
        <form onSubmit={onClickPreventDefault}>
          <input
            className="tinput"
            name="title"
            onChange={handleChange}
            placeholder="Title"
            value={items.title}
          />
          <textarea
            className="cinput"
            name="content"
            onChange={handleChange}
            placeholder="Take a note..."
            value={items.content}
          />
          <button className="submit" onClick={addNote}>
            +
          </button>
        </form>
      </center>
      {arr.map((note) => (
        <Note
          key={note.key}
          id={note.key}
          title={note.title}
          content={note.content}
          deleteNote={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
