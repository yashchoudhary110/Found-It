import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Itemcontext from '../context APIs/items/Itemcontext';

import TextField from '@mui/material/TextField';

function Login(props) {
  let navigate = useNavigate();
  const context = useContext(Itemcontext);
  const {  getUser } = context;
  
  const [cred, setCred] = useState({ email: "", password: "" });
  const fontS={ style: { fontSize: 21 } };

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    // API Fetch Call for logging in also send required data*********
    fetch(`/api/auth/loginUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: cred.email, password: cred.password })
    }).then(res=>res.json()).then((res)=>{
      if (res.success) {
        localStorage.setItem('auth_token', res.auth_token);
        getUser();
        navigate("/");
        props.showAlert("Loggedin successfully", "success");
      }
      else { props.showAlert(res.message, "danger"); }
    })
  }

  return (
    <>
      <div className='d-flex flex-column justify-content-center align-items-center p-3 my-3'>
        <div className='col-lg-4 col-md-8 col-12'>
          {/* <img className="img-fluid mx-auto d-block mb-5" src="https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-logo.svg" alt="" /> */}
          <h2 className='text-center m-3 mb-5'>SHPortal</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4 input-group-lg">
              <TextField fullWidth id="email" label="Email" variant="standard" onChange={onChange} name="email" InputProps={fontS}
                InputLabelProps={fontS} required/>
            </div>
            <div className="mb-5 input-group-lg">
              <TextField type="password" fullWidth id="password" label="Password" variant="standard" onChange={onChange} name="password" InputProps={fontS}
                InputLabelProps={fontS} inputProps={{minLength:5}}/>
            </div>
            <div className='d-grid'>
              <button type="submit" className="btn btn-primary btn-lg mb-2">Login</button>
            </div>
            <div className='mt-5 fs-6 text-center'>
              <p className='text-muted d-inline'>Create a New Account</p> <Link className="" to="/signup">Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login