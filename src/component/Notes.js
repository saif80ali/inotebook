import React,{useContext,useEffect} from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'

const Notes = () => {
    const note = useContext(noteContext)
    const mynotes = note.note
    const fetchallnote = note.fetchallnote
    
    useEffect(() => {
        fetchallnote()
      }, []);
    // console.log(mynotes)
  return (
    <div className='container my-3'>
        <h2>My notes</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
        {mynotes.length===0?<p><strong>No notes to show</strong></p> :mynotes.map((element)=>{return <NoteItem key={element._id} id={element._id} title={element.title} description={element.description} tag={element.tag}/>})}
        </div>
    </div>
  )
}

export default Notes
