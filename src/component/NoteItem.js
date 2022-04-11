import React,{useContext} from "react";
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const note = useContext(noteContext)
    const deleteNote = note.deleteNote
    const {id,title,description,tag} = props
    const handleDelete=(id)=>{
        deleteNote(id)
    }
  return (
    <div>
      
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text"><small className="text-muted">{tag}</small></p>
              <p className="card-text">{description}</p>
              <i className="fa-regular fa-trash-can mx-2" style={{"cursor":"pointer"}}onClick={()=>{handleDelete(id)}}></i>           
              <i className="fa-regular fa-pen-to-square" style={{"cursor":"pointer"}}></i>        
            </div>
            
          </div>
        </div>
      </div>
  );
};

export default NoteItem;
