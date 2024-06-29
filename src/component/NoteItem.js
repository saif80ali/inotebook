import React,{useContext} from "react";
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true // Use 24-hour format
    };
    const note = useContext(noteContext)
    const deleteNote = note.deleteNote
    let {id,title,description,tag,date,editNote} = props
    const handleDelete=(id)=>{
        deleteNote(id)
    }
    
  return (
    <div>
      
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="d-flex"><h5 className="card-title">{title}</h5><div><i className="fa-regular fa-trash-can mx-2" style={{"cursor":"pointer"}} onClick={()=>{handleDelete(id)}}></i>           
              <i className="fa-regular fa-pen-to-square" style={{"cursor":"pointer"}} onClick={()=>{editNote({id,title,description,tag})}}></i> </div></div>
              
              <p className="card-text"><small className="text-muted">{tag}</small></p>
              <p className="card-text">{description}</p>
              <div className="text-muted fw-bold text-end">{new Date(date).toLocaleString('en-US', options)}</div>
                     
            </div>
            
          </div>
        </div>
      </div>
  );
};

export default NoteItem;
