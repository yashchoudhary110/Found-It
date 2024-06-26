import React, { useState, useContext } from 'react'

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Itemcontext from '../context APIs/items/Itemcontext'

function AddItem(props) {
  const context = useContext(Itemcontext);
  const { addItem, userData } = context;

  const fontsize = 21;
  const fontS = { style: { fontSize: fontsize } };
  const minl = { minLength: 2 };

  const [cred, setCred] = useState({ name: "", type: "", place: "", date: "", description: "" })
  const [image, setImage] = useState();
  const [imglmtexc, setImglmtexc] = useState(false);
  const [status, setStatus] = useState("");

  const { name, date, description } = cred;

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  }

  const handleAddItem = (e) => {
    e.preventDefault(); // default settings of form
    var FormData = require('form-data');
    let data = new FormData();
    data.append('name', name);
    // data.append('type', type);
    // data.append('place', place);
    data.append('date', date);
    data.append('description', description);
    data.append('status', status);
    data.append('image', image);
    data.append('user_name', userData.name);

    // Image validation
    let li_dot = image.name.lastIndexOf('.');
    let img_ext = image.name.substring(li_dot + 1);
    if (!(img_ext === 'jpeg' || img_ext === 'png' || img_ext === 'jpg')) {
      alert("please upload a image not a file"); return;
    }
    if (image && image.size > 2 * 1024 * 1024) { setImglmtexc(true); return; }
    setImglmtexc(false);

    let a = addItem(data);
    a.then((d) => {
      if (d) {
        props.showAlert("Item added Successfully", 'success')
      }
    });
  }

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      {
        localStorage.getItem('auth_token') ?
          <button type="button" className="btn btn-primary btn-lg rounded-pill m-0 p-0 p-1" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ position: "fixed", bottom: "20px", right: "20px" }}>
            <i className="bi bi-plus-lg me-1"></i>Add Book
          </button> :
          <button type="button" className="btn btn-primary btn-lg rounded-pill m-0 p-0 p-1" data-bs-toggle="modal" data-bs-target="#exampleModal2" style={{ position: "fixed", bottom: "20px", right: "20px" }}>
            <i className="bi bi-plus-lg me-1"></i>Add Book
          </button>
      }


      {/* <!-- Modal - 1 --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content" style={{ borderRadius: "15px" }}>

            {/* modal header */}
            <div className="modal-header bg-dark" style={{ borderRadius: "15px 15px 0px 0px" }}>
              <h5 className="modal-title text-white" id="exampleModalLabel">Add Book</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            {/* modal Body */}
            <div className="modal-body mx-auto bg-white py-3 px-5 col-12 justify-items-center" style={{ borderRadius: "15px" }}>
              {/* Form  */}
              <form onSubmit={handleAddItem} method="POST">
                <div className="my-3">
                  <TextField required fullWidth id="name" label="Name of Book" variant="standard" onChange={onChange} name="name" InputProps={fontS}
                    InputLabelProps={fontS} inputProps={minl} />
                </div>

                {/* <div className="my-3">
                  <TextField required fullWidth id="type" label="Type of Item" variant="standard" onChange={onChange} name="type" InputProps={fontS}
                    InputLabelProps={fontS} inputProps={minl} />
                </div> */}

                {/* <div className="my-3">
                  <TextField required fullWidth id="place" label="Place where You lost or found" variant="standard" onChange={onChange} name="place" InputProps={fontS}
                    InputLabelProps={fontS} inputProps={minl} />
                </div> */}

                <div className="my-3">
                  <FormControl required fullWidth variant="standard">
                    <InputLabel id="demo-simple-select-helper-label" sx={{ fontSize: fontsize }}>Purpose</InputLabel>
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
                      <MenuItem value="To Buy" sx={{ fontSize: fontsize }}>To Buy</MenuItem>
                      <MenuItem value="To Sell" sx={{ fontSize: fontsize }}>To Sell</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="my-3">
                  <TextField type="text-field" fullWidth id="description" label="description" variant="standard" onChange={onChange} name="description" InputProps={fontS}
                    InputLabelProps={fontS} />
                </div>

                <div className="my-3">
                  <TextField focused type="date" required fullWidth id="date" label="Date when You lost or found" variant="standard" onChange={onChange} name="date" InputProps={fontS}
                    InputLabelProps={fontS} />
                </div>

                <div className="my-3">
                  {/* {imglmtexc && <label htmlFor="image" className="form-label text-danger ms-2"> Image size exceeded!!</label>} */}
                  <TextField type="file" focused required fullWidth id="image" label=" Image of item" variant="standard" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.size > 2 * 1024 * 1024) setImglmtexc(true);
                    else setImglmtexc(false);
                    setImage(file);
                  }} name="image" InputProps={fontS}
                    InputLabelProps={fontS} />
                  <div className='d-flex flex-row justify-content-between'>
                    <div className="form-text p-0 m-0">Only images are expected, max image size is 2MB</div>
                    {imglmtexc && <label htmlFor="user_image" className="p-0 m-0 text-danger form-text"> Image size exceeded!!</label>}
                  </div>
                </div>

                <div className='mt-5'>
                  <button type="submit" className="btn btn-primary me-2">Add</button>
                  <button type="button" className="btn btn-primary" id="modalDismiss2" data-bs-dismiss="modal">Close</button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>

      {/* <!-- Modal - 2 --> */}
      <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">foundIt says!</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              You have not loggedIn! Please LogIn/SignUp to upload any item.
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default AddItem