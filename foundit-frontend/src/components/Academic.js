import React, { useState, useContext, useEffect } from 'react'
import Itemcontext from '../context APIs/items/Itemcontext';
import AcademicItems from './AcademicItems';
import { useNavigate } from 'react-router-dom';
import './css/admin.css'
import './css/faculty.css'
// import Academichome from './Academic_home'

export default function Academic(props) {
  let navigate = useNavigate();
  const context=useContext(Itemcontext);
  const {addnotes, fetchAllNotes, allNotes, getUser}=context;

  const [isLoading, setIsLoading] = useState(true);

  const [file, setFile] = useState("");
  const [notes_name, setnotes_name] = useState("");
  const [description, setdescription] = useState("");

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      getUser();
      fetchAllNotes().then((d) => {
        if (!(d.success)) props.showAlert(d.message, "danger");
        setIsLoading(false);
      })
    }
    else {
      props.showAlert("!! You have not loggedin", "danger");
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  // const onChange = (e) => {
    
  //   setdescription(e.target.value);
  // }

  const handleAddItem = async (e) => {
    e.preventDefault(); // default settings of form
    // console.log(credentials);
    var FormData = require('form-data');
    let data = new FormData();
    data.append('notes_name', notes_name);
    data.append('description', description);
    data.append('foo', file);

    const res = await addnotes(data);
    if (res.success){
      props.showAlert("Added successfully", "success");
      fetchAllNotes();
    }
    else props.showAlert("Not added ", "danger");
  }

  return (
    <>
      {/* 1.  Acadmic Add Items */}
      <div className="container faculty_box">
        <div className="row">
          <div className="col-md-12 nitt_col">
            <h3>Add Your Notes</h3>
          </div>
        </div>

        <div className='adminhome shadow mt-2 mb-5'>

          <form onSubmit={handleAddItem} method="POST" className="d-flex flex-row justify-content-between align-items-center aHomefnt">
            <div className="text-muted aHomefnt">
              <input required className="form-control text-muted aHomefnt" type="text" id="formFileMultiple" onChange={(e)=>{setnotes_name(e.target.value)}} name="notes_name" placeholder='Notes Name' />
            </div>
            <div className="text-muted aHomefnt">
              <input required className="form-control text-muted aHomefnt" type="text" id="formFileMultiple" onChange={(e)=>{setdescription(e.target.value)}} name="description" placeholder='Description' />
            </div>

            <div className="text-muted aHomefnt">
              <input required className="form-control text-muted aHomefnt" type="file" id="formFileMultiple" multiple onChange={(e) => {
                const f = e.target.files[0];
                setFile(f);
              }} name="fileinput" />
            </div>

            <div>
              <button type="submit" className="btn nitt_bg_color text-light aHomefnt px-3 py-1">
                Add
              </button>
            </div>
          </form>

        </div>

      </div>


      {/* 2.  Academic Show Items */}
      <div className="container faculty_box">
        <div className="yourprojects mb-3 mt-4 nitt_col">
          <h3>All Notes</h3>
        </div>

        <div className="row">
          {/* Items of User */}
          {allNotes.length === 0 && !isLoading && <h6 className='text-center'>No project found</h6>}
          {allNotes.length > 0 && <AcademicItems items={allNotes} showAlert={props.showAlert} flag={true} />}
        </div>
      </div>
    </>
  )
}
