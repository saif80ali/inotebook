import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import { useNavigate } from "react-router-dom";
import Alert from './Alert'
const Signup = () => {
  let history = useNavigate();
    const note = useContext(noteContext)
    const {handleSignup,alertmsg} = note

    const handleSignupSubmit = async(e)=>{
        e.preventDefault()
        const name = document.getElementById("exampleInputName").value
        const email = document.getElementById("exampleInputEmail1").value
        const password = document.getElementById("exampleInputPassword1").value
        const res = await handleSignup({name,email,password})
        if(res){
            history("/")
        }

        // console.log(res)
    }
  return (
      <>
      {alertmsg && <Alert alertmsg={alertmsg}/>}
    <div className='container '>
        
        <h2 className='mt-3'>Sign up to use iNotebook</h2>
      <form onSubmit={handleSignupSubmit}>
      <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Full name</label>
    <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" minLength={5} className="form-control" id="exampleInputPassword1" required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
    </>
  )
}

export default Signup
