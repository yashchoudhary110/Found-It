import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Signup(props) {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "", mobile_no: "", department: ""});
  const [user_image, setUser_image] = useState();
  const [imglmtexc, setImglmtexc] = useState(false);
  const [gen, setGen] = useState('')

  const fontsize=21
  const fontS = { style: { fontSize: fontsize } };
  const minl={minLength:2};

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const { email, name, password, mobile_no, department } = credentials;

  const handleSignup = async (e) => {
    e.preventDefault(); // default settings of form
    // *******API call to Signup*****
    var FormData = require('form-data');
    let data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('mobile_no', mobile_no);
    data.append('department', department);
    data.append('gender', gen);
    data.append('user_image', user_image);

    // Image validation
    let li_dot=user_image.name.lastIndexOf('.');
    let img_ext=user_image.name.substring(li_dot+1);
    if(!(img_ext==='jpeg' || img_ext==='png' || img_ext==='jpg')){
      alert("please upload a image not a file"); return;
    }
    if (user_image && user_image.size > 2 * 1024 * 1024) { 
      setImglmtexc(true); props.showAlert("Image size exceeded", "danger");   return; 
    }
    setImglmtexc(false);
    // Email validation
    if(!(email.includes("@gmail.com"))){ 
      props.showAlert("Enter your webmail of NITT", "danger");  return;  
    }

    const response = await fetch(`/api/auth/createuser`, {
      method: 'POST',
      body: data
    });
    const json = await response.json();
    if (json.success) {
      localStorage.removeItem('auth_token');
      props.showAlert("An Email is sent on your email id please verify that.", "success");
    }
    else {
      props.showAlert(json.message, "danger");
    }
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center m-3 my-5'>
      <div className='col-lg-4 col-md-9 col-12'>
        {/* <img className="img-fluid mx-auto d-block my-3 input-group-lg" src="https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-logo.svg" alt="" /> */}
        <h2 className='text-center mb-4'>Register to foundIt</h2>
        <form onSubmit={handleSignup} method="POST">
          <div className="my-3 input-group-lg">
            <TextField fullWidth id="name" label="Name" variant="standard" onChange={onChange} name="name" InputProps={fontS}
              InputLabelProps={fontS} inputProps={minl}/>
          </div>
          <div className="my-3 input-group-lg">
            <TextField type="email" fullWidth id="email" label="Webmail address" variant="standard"  onChange={onChange} name="email" InputProps={fontS}
              InputLabelProps={fontS} inputProps={minl}/>
          </div>
          <div className="my-3 input-group-lg">
            <TextField fullWidth id="mobile_no" label="Mobile Number" variant="standard" onChange={onChange} name="mobile_no" InputProps={fontS}
              InputLabelProps={fontS} inputProps={{minLength:10, maxLength:10}}/>
          </div>
          <div className="my-3 input-group-lg">
            <TextField fullWidth id="department" label="Department" variant="standard" onChange={onChange} name="department" InputProps={fontS}
              InputLabelProps={fontS} inputProps={minl}/>
          </div>
          <div className="my-3 input-group-lg">
            <TextField type="password" fullWidth id="password" label="Password" variant="standard" onChange={onChange} name="password" InputProps={fontS}
              InputLabelProps={fontS} inputProps={{minLength:5, maxLength:16}}/>
          </div>
          <div className="my-3 input-group-lg">
            <TextField type="password" fullWidth id="cpassword" label="Confirm Password" variant="standard" onChange={onChange} name="cpassword" InputProps={fontS} InputLabelProps={fontS} inputProps={{minLength:5, maxLength:16}}/>
          </div>

          <div className="my-3 input-group-lg">
            <FormControl fullWidth variant='standard' required>
              <InputLabel id="demo-simple-select-helper-label"  sx={{ fontSize: fontsize }}>Gender</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={gen} sx={{ fontSize: fontsize }}
                label="Age"
                onChange={(e) => { setGen(e.target.value) }}
              >
                <MenuItem value="" sx={{ fontSize: fontsize }}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Male" sx={{ fontSize: fontsize }}>Male</MenuItem>
                <MenuItem value="Female" sx={{ fontSize: fontsize }}>Female</MenuItem>
                <MenuItem value="Other" sx={{ fontSize: fontsize }}>Other</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="mt-3 input-group-lg p-0">
            {/* {imglmtexc && <label htmlFor="user_image" className="form-label text-danger"> Image size exceeded!!</label>} */}
            <TextField required focused label="Your image" type="file" fullWidth id="email" variant="standard" name="email" InputProps={fontS}
              InputLabelProps={fontS} onChange={event => {
                const image = event.target.files[0];
                if (image && image.size > 2 * 1024 * 1024) setImglmtexc(true);
                else setImglmtexc(false);
                setUser_image(image);
              }}/>
            <div className='d-flex flex-row justify-content-between'>
              <div className="form-text p-0 m-0">max image size is 2MB</div>
              {imglmtexc && <label htmlFor="user_image" className="p-0 m-0 text-danger form-text"> Image size exceeded!!</label>}
            </div>
          </div>

          <div className='d-grid mt-5'>
            <button type="submit" className="btn btn-primary btn-lg">Sign up</button>
          </div>
          <div className='m-0 mt-4 fs-6 text-center'>
            <p className='text-muted d-inline'>Already have an Account? </p> <Link className="" to="/login">Signin</Link>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Signup