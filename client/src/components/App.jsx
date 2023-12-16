import React,{useEffect,useState} from 'react'
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

function onClickPreventDefault(e) {
  e.preventDefault();
}

 function App() {

  const [backendData, setBackendData] = useState([{}]); // storing backend data
  const [firstName, setFirstName] = useState(""); // form input store 
  const [dataUpdated, setDataUpdated] = useState(true); // useeffect dependency
  const [items, setItems] = useState({ title: "", content: "" });

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
  // submit form function 
  const submitForm = (e) => {
    e.preventDefault();
    async function postData () {
      console.log(firstName);
      //const response = await fetch("http://localhost:3000/api/postData", {
      const response = await fetch("https://keeper-production.up.railway.app/api/postData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // converting userinput into json 
        body: JSON.stringify({
          title: items.title,
          content: items.content
        })
      })
      if(response?.status === 200) {
        setDataUpdated(!dataUpdated);
        setFirstName("");
      }
    };
    if (items.title !== "" && items.content !== "") {
      postData(); // sending data 
    }
    setItems({ title: "", content: "" });
   }

   async function deleteNote(id) {
    try {
      const response = await fetch(`https://keeper-production.up.railway.app/api/deleteData/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        setDataUpdated(!dataUpdated);
        console.log('Record deleted successfully');
        // Do something after successful deletion
      } else {
        console.log('Error deleting record:', response.status);
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

   // fetching data from backend 
  useEffect(()=>{
    fetch("/api").then(
      response => response.json() 
    ).then(
      data =>{
        setBackendData(data);
        console.log(data);
      }
    )
  },[dataUpdated])
  return (
    //show data in front end
    
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
          <button className="submit" onClick={submitForm}>
            +
          </button>
        </form>
      </center>
      {(backendData.length === 0)? (
        <center>It looks like you have nothing on your plate. Start taking notes on Keeper. Or better yet... Enjoy the childlike leisure.</center>
          // how to know it's users? 
      ):(
        backendData.map((note) => (
          <Note
            key={note.key}
            id={note._id}
            title={note.title}
            content={note.content}
            deleteNote={deleteNote}
          />
        ))
      )}
    <Footer />
    </div>
    
  )
}
export default App


/*
1. form create 
2. hit api upon submitting form 
3. fetch db after submitting form 
*/
