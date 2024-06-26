import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Adminitems from './Admin_items';
import Itemcontext from '../context APIs/items/Itemcontext';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function AdminHomepage(props) {
  const navigate = useNavigate();
  const context = useContext(Itemcontext);
  const { getAllItems, allitems, getUser } = context;

  const [s_tags, sets_tags] = useState({ name: "", type: "", place: "", date: "", });
  const [s_items, setS_items] = useState([]);
  const [status, setStatus] = useState('');
  const [losti, setLosti] = useState(0);
  const [foundi, setFoundi] = useState(0);

  const fontsize=21
  const fontS = { style: { fontSize: fontsize } };

  const onChange = (e) => {
    sets_tags({ ...s_tags, [e.target.name]: e.target.value });
  }
  const { name, type, place, date } = s_tags;

  useEffect(() => {
    if (!localStorage.getItem('auth_token')) {
      navigate("/");  props.showAlert("!! You have not loggedin", "danger");  return;
    }
    getUser().then((d)=>{
      if((d.success && d.user_data.role !== "admin") || !(d.success)){
          navigate("/");  props.showAlert("!! You are not autherized", "danger"); return;
      }
    })
    getAllItems().then((d) => {
      if (d.success){ 
        setS_items(d.allitems);  let li=0, fi=0;
        for(let i=0;  i<d.allitems.length;  i=i+1){
          if(d.allitems[i].status==="Lost")  li=li+1;
          if(d.allitems[i].status==="Found")  fi=fi+1;
        } setLosti(li); setFoundi(fi);
      }
      else props.showAlert(d.message, "danger");
    });// eslint-disable-next-line
  }, [])


  const handleSearch = async (e) => {
    e.preventDefault(); // default settings of form
    if (localStorage.getItem('auth_token')) {
      let op = allitems;
      if (name) op = op.filter(item => item.name === name);
      if (type) op = op.filter(item => item.type === type);
      if (place) op = op.filter(item => item.place === place);
      if (date) op = op.filter(item => item.date === date);
      if (status) op = op.filter(item => item.status === status);
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
                    <h5 className="purecounter mb-0 fw-bold me-2" data-purecounter-start="0" data-purecounter-end="10" data-purecounter-delay="200" data-purecounter-duration="0">{(localStorage.getItem('auth_token'))? allitems.length:0}</h5>
                    <span className="mb-0 h5">Books</span>
                  </div>
                  <p className="mb-0">All Books</p>
                </div>
              </div>
            </div>

            {/*Counter item -->*/}
            <div className="col-sm-6 col-xl-4">
              <div className="d-flex justify-content-center align-items-center p-4 bg-info bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-primary mb-0"><i className="bi bi-patch-check-fill"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="purecounter mb-0 me-2 fw-bold" data-purecounter-start="0" data-purecounter-end="6" data-purecounter-delay="300" data-purecounter-duration="0">{losti}</h5>
                    <span className="mb-0 h5">Needed Books</span>
                  </div>
                  <p className="mb-0">All Needed Books</p>
                </div>
              </div>
            </div>

            {/* Counter item */}
            <div className="col-sm-6 col-xl-4">
              <div className="d-flex justify-content-center align-items-center p-4 bg-primary bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-primary mb-0"><i className="bi bi-patch-check-fill"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="purecounter mb-0 me-2 fw-bold" data-purecounter-start="0" data-purecounter-end="6" data-purecounter-delay="300" data-purecounter-duration="0">{foundi}</h5>
                    <span className="mb-0 h5">Books to sell</span>
                  </div>
                  <p className="mb-0">All Books to sell</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* form */}
      <div className='d-flex flex-column justify-content-center align-items-center px-2 py-5'>
        <div className='col-lg-4 col-md-9 col-12'>
          {/* <img className="img-fluid mx-auto d-block my-3 input-group-lg" src="https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-logo.svg" alt="" /> */}
          <h2 className='text-center m-0 mt-2 my-3'>Filter Books</h2>
          <form onSubmit={handleSearch} method="GET">
            <div className="my-3 input-group-lg">
              <TextField fullWidth id="name" label="Name of book" variant="standard" onChange={onChange} name="name" InputProps={fontS}
                InputLabelProps={fontS} />
            </div>
            <div className="my-3 input-group-lg">
              <FormControl fullWidth variant='standard'>
                <InputLabel id="demo-simple-select-helper-label" sx={{ fontSize: fontsize }}>Status</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={status} sx={{ fontSize: fontsize }}
                  label="Status"
                  onChange={(e) => { setStatus(e.target.value) }}
                >
                  <MenuItem value="" sx={{ fontSize: fontsize }}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Lost" sx={{ fontSize: fontsize }}>To buy</MenuItem>
                  <MenuItem value="Found" sx={{ fontSize: fontsize }}>To sell</MenuItem>
                </Select>
              </FormControl>
            </div>
            {/* <div className="my-3 input-group-lg">
              <TextField fullWidth id="type" label="Book Name" variant="standard" onChange={onChange} name="type" InputProps={fontS}
                InputLabelProps={fontS} />
            </div> */}
            <div className="my-3 input-group-lg">
              <TextField fullWidth id="place" label="Author" variant="standard" onChange={onChange} name="place" InputProps={fontS}
                InputLabelProps={fontS} />
            </div>
            <div className="mt-3 input-group-lg">
              <TextField focused type="date" fullWidth id="date" label="Date" variant="standard" onChange={onChange} name="date" InputProps={fontS}
                InputLabelProps={fontS} />
            </div>
            <div className='d-grid mt-5'>
              <button type="submit" className="btn btn-primary btn-lg">Apply filters</button>
            </div>
          </form>
        </div>
      </div>

      {/* ****Results**** */}
      {
        (s_items && s_items.length !== 0) ?
          <div className='mx-1'>
            <div className='text-center mt-5 my-3'>
              <h2>Books</h2>
            </div>
            <Adminitems allitems={s_items} showAlert={props.showAlert} />
          </div> :
          <p className='text-center mt-5 my-3'>No Results</p>
      }
    </>
  )
}

export default AdminHomepage