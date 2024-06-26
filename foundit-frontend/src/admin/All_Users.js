import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Itemcontext from '../context APIs/items/Itemcontext';
import AdminUsers from './Admin_Users';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AdminHomepage(props) {
  const navigate = useNavigate();
  const context = useContext(Itemcontext);
  const { getUser, getAllUsers, allusers } = context;
  const [blockedU, setBlockedU] = useState(0);
  const [unverifiedE, setUnverifiedE] = useState(0);

  const [name, setName] = useState("");
  const [blocked, setBlocked] = useState("All");
  const [vfied, setVfied] = useState("All");
  const [s_items, setS_items] = useState([]);
  const fontsize=21
  const fontS = { style: { fontSize: fontsize } };

  useEffect(() => {
    if (!localStorage.getItem('auth_token')) {
      navigate("/");  props.showAlert("!! You have not loggedin", "danger");  return;
    }
    getUser().then((d)=>{
      if((d.success && d.user_data.role !== "admin") || !(d.success)){
          navigate("/");  props.showAlert("!! You are not autherized", "danger"); return;
      }
    })
    getAllUsers().then((d) => {
      if (!(d.success)) {
        props.showAlert("Items can not be Loaded!!!", "danger");
      } else {
        let bl = 0, uv = 0; setS_items(d.users);
        for (let i = 0; i < d.users.length; i++) {
          if (d.users[i].isBlocked) bl = bl + 1;
          if (!(d.users[i].verified)) uv = uv + 1;
        } setBlockedU(bl); setUnverifiedE(uv);
      }
    })
    
    // eslint-disable-next-line
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault(); // default settings of form
    if (localStorage.getItem('auth_token')) {
      let op = allusers;
      if (name) op = op.filter(item => item.name === name);
      if(blocked!=="All")  op = op.filter(item => item.isBlocked === blocked);
      if(vfied!=="All")  op = op.filter(item => item.verified === vfied);
      setS_items(op);
    }
    else props.showAlert(" You are not loggedin!!", "danger");
  }

  return (
    <>
      {/* 2. Counting details */}
      <section className="m-1 py-5">
        <div className="container">
          <div className="row g-3">

            {/* Counter item */}
            <div className="col-sm-6 col-xl-4">
              <div className="d-flex justify-content-center align-items-center p-4 bg-primary bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-primary mb-0"><i className="bi bi-patch-check-fill"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="purecounter mb-0 fw-bold me-2" data-purecounter-start="0" data-purecounter-end="10" data-purecounter-delay="200" data-purecounter-duration="0">{(localStorage.getItem('auth_token'))?allusers.length:0}</h5>
                    <span className="mb-0 h5">Users</span>
                  </div>
                  <p className="mb-0">Total Users</p>
                </div>
              </div>
            </div>

            {/*Counter item -->*/}
            <div className="col-sm-6 col-xl-4">
              <div className="d-flex justify-content-center align-items-center p-4 bg-info bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-primary mb-0"><i className="bi bi-patch-check-fill"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="purecounter mb-0 me-2 fw-bold" data-purecounter-start="0" data-purecounter-end="6" data-purecounter-delay="300" data-purecounter-duration="0">{blockedU}</h5>
                    <span className="mb-0 h5">blocked Users</span>
                  </div>
                  <p className="mb-0">All blocked users</p>
                </div>
              </div>
            </div>

            {/* Counter item */}
            <div className="col-sm-6 col-xl-4">
              <div className="d-flex justify-content-center align-items-center p-4 bg-primary bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-primary mb-0"><i className="bi bi-patch-check-fill"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="purecounter mb-0 me-2 fw-bold" data-purecounter-start="0" data-purecounter-end="6" data-purecounter-delay="300" data-purecounter-duration="0">{unverifiedE}</h5>
                    <span className="mb-0 h5">Unverified emails</span>
                  </div>
                  <p className="mb-0">All unverified emails</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* form */}
      <div className='d-flex flex-column justify-content-center align-items-center px-2 py-5'>
        <div className='col-lg-4 col-md-9 col-12'>
          {/* <img className="img-fluid mx-auto d-block mb-4 input-group-lg" src="https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-logo.svg" alt="" /> */}
          <h2 className='text-center m-0 mt-2 my-3'>Filter Users</h2>
          <form onSubmit={handleSearch} method="GET">
            <div className="my-3 input-group-lg">
              <TextField fullWidth id="name" label="Name" variant="standard" onChange={e=>setName(e.target.value)} name="name" InputProps={fontS}
                InputLabelProps={fontS} />
            </div>

            <div className="my-3 input-group-lg">
              <FormControl fullWidth variant='standard'>
                <InputLabel id="demo-simple-select-helper-label1" sx={{ fontSize: fontsize }}>Blocked User</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label1"
                  id="demo-simple-select-helper"
                  value={blocked} sx={{ fontSize: fontsize }}
                  label="blocked user"
                  onChange={e=>setBlocked(e.target.value)}
                >
                  <MenuItem value="All" sx={{ fontSize: fontsize }}>All</MenuItem>
                  <MenuItem value={true} sx={{ fontSize: fontsize }}>Blocked Users</MenuItem>
                  <MenuItem value={false} sx={{ fontSize: fontsize }}>Non Blocked</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="my-3 input-group-lg">
              <FormControl fullWidth variant='standard'>
                <InputLabel id="demo-simple-select-helper-label2" sx={{ fontSize: fontsize }}>Verified Users</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label2"
                  id="demo-simple-select-helper"
                  value={vfied} sx={{ fontSize: fontsize }}
                  label="Verified Users"
                  onChange={e=>setVfied(e.target.value)}
                >
                  <MenuItem value="All" sx={{ fontSize: fontsize }}>All</MenuItem>
                  <MenuItem value={true} sx={{ fontSize: fontsize }}>Verified Users</MenuItem>
                  <MenuItem value={false} sx={{ fontSize: fontsize }}>Non Verified</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className='d-grid mt-5'>
              <button type="submit" className="btn btn-primary btn-lg">Apply filters</button>
            </div>
          </form>
        </div>
      </div>

      {/* 3. User's Uploaded Items */}
      <div>

        {/*<!-- Title and Description -->*/}
        <div className="mt-5 mb-3">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="fs-1">Users</h2>
          </div>
        </div>

        {/* Items of User */}
        <div className='mx-1'>
          {
            // allusers.length === 0 ?
            //   <h3 className='text-center'>No Users Found!!!</h3>
            //   : 
            <AdminUsers users={s_items} showAlert={props.showAlert} />
          }
        </div>

      </div>
    </>
  )
}
