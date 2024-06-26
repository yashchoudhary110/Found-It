import React, { useContext, useState, useRef } from 'react'
import Itemcontext from '../context APIs/items/Itemcontext';
import Item from './Item'

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Items(props) {

  const context = useContext(Itemcontext);
  const { editItem } = context;

  const [image, setImage] = useState();
  const [newItem, setnewItem] = useState({ id: "", ename: "", edescription: "", etype: "", eplace: "", edate: "", public_id: "" });
  const [imglmtexc, setImglmtexc] = useState(false);
  const refShow = useRef(null);
  const refHide = useRef(null);
  const [estatus, setEstatus] = useState("");

  const fontsize = 21;
  const fontS = { style: { fontSize: fontsize } };
  const minl = { minLength: 2 };

  const updateItem = (item) => {
    setnewItem({ id: item._id, ename: item.name, edescription: item.description, etype: item.type, eplace: item.place, edate: item.date, public_id: item.public_id });
    setEstatus(item.status);
    refShow.current.click();
  }

  const onChange = (e) => {
    setnewItem({ ...newItem, [e.target.name]: e.target.value });
  }

  const { id, ename, etype, eplace, edate, edescription, public_id } = newItem;

  const handleUpdateItem = (e) => {
    e.preventDefault(); // default settings of form
    var FormData = require('form-data');
    let data = new FormData();
    data.append('id', id);
    data.append('name', ename);
    data.append('type', etype);
    data.append('place', eplace);
    data.append('date', edate);
    data.append('description', edescription);
    data.append('image', image);
    data.append('status', estatus);

    // Image validation
    let li_dot = image.name.lastIndexOf('.');
    let img_ext = image.name.substring(li_dot + 1);
    if (!(img_ext === 'jpeg' || img_ext === 'png' || img_ext === 'jpg')) {
      alert("please upload a image not a file"); return;
    }
    if (image && image.size > 2 * 1024 * 1024) { setImglmtexc(true); return; }
    setImglmtexc(false);

    let a = editItem(data, id, public_id);
    a.then((d) => {
      if (d) {
        props.showAlert("Item Updated successfully", "success");
        refHide.current.click();
      }
    })
  }

  return (
    <>
      {/* 1. ***** Modal for Update Item***** */}
      {/* 
      // <!-- Button trigger modal --> */}
      <button ref={refShow} type="button" className="btn btn-primary btn-lg d-none" data-bs-toggle="modal" data-bs-target="#exampleModal3">
      </button>
      {/* 
      // <!-- Modal --> */}
      <div className="modal" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg " >
          <div className="modal-content" style={{ borderRadius: "15px" }}>

            {/* modal header */}
            <div className="modal-header bg-dark" style={{ borderRadius: "15px 15px 0px 0px" }}>
              <h5 className="modal-title text-white" id="exampleModalLabel">Update books</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            {/* modal Body */}
            <div className="modal-body mx-auto shadow bg-light px-5 py-3 col-12 justify-items-center" style={{ borderRadius: "15px" }}>
              {/* Form  */}
              <form onSubmit={handleUpdateItem} method="PUT">

                <div className="my-3">
                  <TextField required fullWidth id="ename" label="Name of book" variant="standard" onChange={onChange} name="ename" InputProps={fontS}
                    InputLabelProps={fontS} inputProps={minl} value={newItem.ename} />
                </div>
                {/* <div className="my-3">
                  <TextField required fullWidth id="etype" label="Type of Item" variant="standard" onChange={onChange} name="etype" InputProps={fontS}
                    InputLabelProps={fontS} inputProps={minl} value={newItem.etype} />
                </div> */}
                {/* <div className="my-3">
                  <TextField required fullWidth id="eplace" label="Place where You lost or found the Item" variant="standard" onChange={onChange} name="eplace" InputProps={fontS}
                    InputLabelProps={fontS} inputProps={minl} value={newItem.eplace} />
                </div> */}
                <div className="my-3">
                  <FormControl required fullWidth variant="standard">
                    <InputLabel id="demo-simple-select-helper-label" sx={{ fontSize: fontsize }}>Purpose</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={estatus} sx={{ fontSize: fontsize }}
                      label="Status"
                      onChange={(e) => { setEstatus(e.target.value) }}
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
                  <TextField fullWidth id="edescription" label="description" variant="standard" onChange={onChange} name="edescription" InputProps={fontS}
                    InputLabelProps={fontS} inputProps={minl} value={newItem.edescription} />
                </div>
                <div className="my-3">
                  <TextField type="date" required fullWidth id="edate" label="Date when You lost or found the Item" variant="standard" onChange={onChange} name="edate" InputProps={fontS}
                    InputLabelProps={fontS} value={newItem.edate.slice(0, 10)} />
                </div>
                <div className="my-3">
                  {/* {imglmtexc && <label htmlFor="image" className="form-label text-danger ms-2"> Image size exceeded!!</label>} */}
                  <TextField type="file" required focused fullWidth id="image" label="Image of Item" variant="standard" onChange={(e) => {
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
                  <button type="submit" className="btn btn-primary me-2">Update Item</button>
                  <button ref={refHide} type="button" className="btn btn-primary" id="modalDismiss" data-bs-dismiss="modal">Close</button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>


      {/* 2. ***** Uploaded Items of User ***** */}
      <div className="container">
        <div className='row my-2'>
          {/* using Filter and map */}

          {props.fis !== "All" && props.items.filter(item => item.status === props.fis).map((filteredItem, id) => {
            return <Item key={id} flag={props.flag} item={filteredItem} updateItem={updateItem} showAlert={props.showAlert} />
          })}

          {props.fis === "All" && props.items.map((item, id) => {
            return <Item key={id} flag={props.flag} item={item} updateItem={updateItem} showAlert={props.showAlert} />
          })}
        </div>
      </div>
    </>
  )
}

export default Items