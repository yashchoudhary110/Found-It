import React, { useContext } from 'react'
import Itemcontext from '../context APIs/items/Itemcontext';
import {Link} from 'react-router-dom';

function Item(props) {
  const context = useContext(Itemcontext);
  const { deleteItem, userData } = context;
  const { user_name, image_name, user, name, _id , public_id, status} = props.item
  const def_img=process.env.REACT_APP_DEFAULT;

  return (
    <>
      {/*<!-- Card Body starts here -->*/}
      <div className="col-sm-12 col-lg-4 col-xl-3 mt-5 px-3">
        <div className="card shadow-lg h-100 bg-white">
          <div style={{ "transform": "rotate(0)" }}>
            {/* **Uploader Name** */}
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{ left: '50%' }}>
              By {user === userData._id ? "You" : user_name}
            </span>

            {/*<!-- Image -->*/}
            <img src={image_name}
              className="card-img-top rounded mw-100" alt="course"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = {def_img};
              }} style={{"minWidth":250, "height":250}} />
              
            {/*<!-- Card body -->*/}
            <div className="card-body pe-2 py-1 m-0">
              {/*<!-- Title -->*/}
              <h5 className="card-title fw-dark m-0 mb-1">
                Book Name : {name}
              </h5>
              <p className="mb-1 text-truncate-2 text-muted">
                {/* Type : {type} */}
               purpose: {status}
              </p>

              <small className='text-muted'>
                uploaded By <strong>{user_name ? user_name : "Unkown"}</strong> on . . . .<Link  className="btn btn-link stretched-link text-muted ps-1 pt-0" to={`/ViewItem/${_id}/${user}`}>Read More</Link>
              </small>
            </div>
          </div>

          {/*<!-- Card footer -->*/}
          {props.flag && <div className="card-footer pt-0 bg-white">
            <div className="d-flex justify-content-between">

              <span className="h6 fw-light m-0">
                <button type="button" onClick={() => {
                  let flag = window.confirm("Do you realy want to delete this Item?");
                  if (flag) {
                    let a = deleteItem(_id, public_id);
                    a.then((d) => {
                      if (d) {
                        props.showAlert("Item deleted successfully", 'success');
                      }
                    })
                  }
                }} className="btn btn-light btn-lg p-0">
                  <i className="bi bi-trash"></i>
                </button>
              </span>

              <span className="h6 fw-light m-0">
                <button type="button" onClick={() => { props.updateItem(props.item) }} className="btn btn-light btn-lg p-0">
                  <i className="bi bi-pencil-square"></i>
                </button>
              </span>

            </div>
          </div>
          }
        </div>
      </div>
      {/*<!-- Card body Ends here -->*/}

    </>
  )
}

export default Item