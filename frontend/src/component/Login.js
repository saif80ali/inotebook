import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import { useNavigate } from "react-router-dom";
import Alert from './Alert'
const Login = () => {
    let history = useNavigate();
    const note = useContext(noteContext)
    const {handleLogin,alertmsg} = note

    const handleLoginSubmit = async(e)=>{
        e.preventDefault()
        const email = document.getElementById("exampleInputEmail1").value
        const password = document.getElementById("exampleInputPassword1").value
        const res = await handleLogin({email,password})
        // console.log(res)
        if(res){
            history("/")
        }

        // console.log(res)
    }

    const textAPI = async () => {
      const url = process.env.REACT_APP_API_URL_BACKEND;
        await fetch(`${url}/api/hello`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

        //   console.log(json)
    }
  return (
      <>
      {alertmsg && <Alert alertmsg={alertmsg}/>}
    <div className='container '>
        
        <h2 className='mt-3'>Log in to use iNotebook</h2>
      <form onSubmit={handleLoginSubmit}>
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
  <button onClick={textAPI} className="btn btn-primary mt-2">Test</button>
    </div>
    </>
  )
}

export default Login
