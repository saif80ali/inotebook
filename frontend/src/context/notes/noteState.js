import NoteContext from "./noteContext";
import React, { useState } from "react";


const NoteState = (props)=>{
    
    const [note,setNote] = useState([])
    const [alertmsg,setAlertMsg] = useState(null)

    const url = process.env.REACT_APP_API_URL_BACKEND;
    const fetchallnote = async ()=>{
        const response = await fetch(`${url}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
          });
          const json = await response.json()
          if(json == []){
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
              'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify(newNote)
          });
          const status = response.status
          if(status===200){
            Myalert("success","Note Added Successfully!")
          }
          else{
            Myalert("danger","Note Not Added, Some Error Occurred")
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
              'auth-token':localStorage.getItem('token')
            },
          });
          const status = response.status
          if(status===200){
            Myalert("success","Note Deleted Successfully!")
          }
          else{
            Myalert("danger","Some Error Occurred")
          }
        //   console.log(status)
          fetchallnote()
    }
    const updateNote = async(newNote)=>{
      // console.log(localStorage.getItem('token'))
      const response = await fetch(`${url}/api/notes/updatenote/${newNote.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify({title:newNote.title,description:newNote.description})
        });
        const {success,msg} = await response.json()
        // console.log(success)
        if(success){
          Myalert("success","Note Updated Successfully!")
        }
        else{
          Myalert("warning",msg)
        }
      //   console.log(status)
        fetchallnote()
  }
  const handleLogin = async(userdetails)=>{
    // const appendNote = note.concat(newNote)
    // setNote(appendNote)
    const response = await fetch(`${url}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify(userdetails)
      });
      const status = await response.json()
      const {success,error,signedToken} = status
      // console.log(success)
      
      if(success){
        Myalert("success","Log in Successfull!")
        localStorage.setItem('token',signedToken)
        return success
      }
      else{
        Myalert("danger",error)
        return success
      }
  }

  const handleSignup = async(userdetails)=>{
    // const appendNote = note.concat(newNote)
    // setNote(appendNote)
    const response = await fetch(`${url}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify(userdetails)
      });
      const status = await response.json()
      const {success,error,signedToken} = status
      // console.log(success)
      
      if(success){

        Myalert("success","Log in Successfull!")
        localStorage.setItem('token',signedToken)
        return success
      }
      else{
        Myalert("danger",error)
        return success
      }
  }

    //Creating alert with taking the type of alert
    const Myalert = (type,msg)=>{
        setAlertMsg({type,msg})
            setTimeout(() => {
                setAlertMsg(null)
            }, 1500);

    }


    return(
        <NoteContext.Provider value={{note,alertmsg,addNote,deleteNote,fetchallnote,updateNote,handleLogin,handleSignup}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState