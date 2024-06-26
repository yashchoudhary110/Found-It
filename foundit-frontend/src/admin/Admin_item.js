import React, { useContext } from 'react'
import Itemcontext from '../context APIs/items/Itemcontext';
//component defination
function Admin_item(props) {
  const context = useContext(Itemcontext);//retrive the context object from itemcontext
  const { deleteItem } = context;
  const { _id, name, date, isreported, status, image_name , user_name, public_id} = props.item;

  const def_img=process.env.REACT_APP_DEFAULT;
//component receve props as parametr to extracted properties from props.item such as _id,name.date,image_name..etc
  return (//rendering the components;
    <>
      <tr>
        <th scope="row">{props.cnt}</th>
        <td>{name}</td>
        <td>{user_name}</td>
        {/* <td>{type}</td> */}
        {/* <td>{place}</td> */}
        <td>{date.slice(0, 10)}</td>
        <td>{isreported ? "Yes" : "No"}</td>
        <td>{status}</td>
        <td>
          {<img src={image_name}//rendered inside one of the table cells to display image.
            className="card-img-top rounded" alt="course"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = {def_img};
            }} style={{ "width": 50, "height": 50 }} />}
        </td>
        <td>
          <span className="h6 fw-light mb-0">
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
        </td>
      </tr>


    </>
  )
}

export default Admin_item
//This component is meant to be used within a larger React application that utilizes a context to manage items and provides the necessary props for this component to function properly.
//  It renders a row of data with item details, an image, and a delete button.