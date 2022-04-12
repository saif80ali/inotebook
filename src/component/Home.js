import React,{useContext} from 'react'
import Addnote from './Addnote'
import Notes from './Notes'
import noteContext from '../context/notes/noteContext'
import Alert from './Alert'

const Home = () => {
  const context = useContext(noteContext)
  const alertmsg = context.alertmsg
  return (
    <>
    <div style={{"minHeight":"58px"}}>
    {alertmsg && <Alert alertmsg={alertmsg}/>}
    </div>
    <Addnote/>
    <Notes/>
    </>
  )
}

export default Home
