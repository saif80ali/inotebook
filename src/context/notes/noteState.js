import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props)=>{
    const [note,setNote] = useState([])
    const [alertmsg,setAlertMsg] = useState(null)
    const url = "http://localhost:5000"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZWI5NWMxN2NiZjE1N2Y2ODdlZDU2In0sImlhdCI6MTY0OTMyNjU0N30.SJl6yqG55x_7FpGyNhFuk1Y9i3HxqznJlWEqBnLgp0U"

    const fetchallnote = async ()=>{
        const response = await fetch(`${url}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':token
            },
          });
          const json = await response.json()
          if(json === [] ){
              setNote("No notes to show")
          }
          else{
              setNote(json)
          }
        //   console.log(json)

    }
    
    
    // Addding a note 
    // TODO:API Calling
    const addNote = async(newNote)=>{
        // const appendNote = note.concat(newNote)
        // setNote(appendNote)
        const response = await fetch(`${url}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':token
            },
            body: JSON.stringify(newNote)
          });
          const status = response.status
          if(status===200){
            setAlertMsg(" Note added successfully!")
            setTimeout(() => {
                setAlertMsg(null)
            }, 1500);
          }
          fetchallnote()
    }
    // Delete a note 
    // TODO:API Calling
    const deleteNote = async(id)=>{
        // const filteredNote = note.filter((element)=>{return element._id !== id})
        // setNote(filteredNote)
        const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':token
            },
          });
          const status = response.status
          if(status===200){
            setAlertMsg(" Note deleted successfully!")
            setTimeout(() => {
                setAlertMsg(null)
            }, 1500);
          }
        //   console.log(status)
          fetchallnote()
    }


    return(
        <NoteContext.Provider value={{note,alertmsg,addNote,deleteNote,fetchallnote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState