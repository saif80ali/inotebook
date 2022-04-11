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
    {alertmsg && <Alert alertmsg={alertmsg}/>}
    <Addnote/>
    <Notes/>
    </>
  )
}

export default Home
