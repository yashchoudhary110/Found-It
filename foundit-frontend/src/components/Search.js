import React, { useState, useContext, useEffect } from 'react';
import Items from './Items';
import Itemcontext from '../context APIs/items/Itemcontext';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function Search(props) {
  const context = useContext(Itemcontext);
  const { getAllItems, allitems } = context;

  const [s_tags, sets_tags] = useState({ name: "", type: "", place: "", date: "", });
  const [s_items, setS_items] = useState([]);
  const [status, setStatus] = useState('');

  const fontsize=21;
  const fontS = { style: { fontSize: fontsize } };

  const onChange = (e) => {
    sets_tags({ ...s_tags, [e.target.name]: e.target.value });
  }
  const { name, type, place, date } = s_tags;

  useEffect(() => {
    localStorage.getItem('auth_token') && getAllItems().then((d) => {
      if (d.success) setS_items(d.allitems);
      else props.showAlert(d.message, "danger");
    });
    // eslint-disable-next-line
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
      {/* form */}
      <div className='d-flex flex-column justify-content-center align-items-center px-2 py-5'>
        <div className='col-lg-4 col-md-9 col-12'>
          {/* <img className="img-fluid mx-auto d-block mb-4 input-group-lg" src="https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-logo.svg" alt="" /> */}
          <h2 className='text-center m-0'>Search Items</h2>
          <form className='px-4 pt-1' onSubmit={handleSearch} method="GET">
            <div className="my-3 input-group-lg">
              <TextField  fullWidth id="name" label="Name of Item" variant="standard" onChange={onChange} name="name" InputProps={fontS}
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
                  <MenuItem value="Lost" sx={{ fontSize: fontsize }}>Lost</MenuItem>
                  <MenuItem value="Found" sx={{ fontSize: fontsize }}>Found</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="my-3 input-group-lg">
              <TextField fullWidth id="type" label="Type of Item" variant="standard" onChange={onChange} name="type" InputProps={fontS}
                InputLabelProps={fontS} />
            </div>
            <div className="my-3 input-group-lg">
              <TextField fullWidth id="place" label="Place where You lost or found the Item" variant="standard" onChange={onChange} name="place" InputProps={fontS}
                InputLabelProps={fontS} />
            </div>
            <div className="my-3 input-group-lg">
              <TextField focused type="date" fullWidth id="date" label="Date when You lost or found the Item" variant="standard" onChange={onChange} name="date" InputProps={fontS}
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
          <div>
            <div className='text-center mt-5 mb-1'>
              <h2>Search Results</h2>
            </div>
            <Items items={s_items} flag={false} fis="All" />
          </div> :
          <p className='text-center mt-5 mb-4'>No Results</p>
      }
    </>
  )
}

export default Search