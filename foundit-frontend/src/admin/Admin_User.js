import React, { useContext, useState } from 'react'
import Itemcontext from '../context APIs/items/Itemcontext';

function Admin_User(props) {
  const context = useContext(Itemcontext);
  const { blockAUser} = context;
  const { _id, name, email, mobile_no, user_image, department, isBlocked, gender, role } = props.user;
  const [status, setStatus] = useState(isBlocked);

  const def_img=process.env.REACT_APP_DEFAULT;

  return (
    <>

      <tr>
        <th scope="row">{props.cnt}</th>
        <td>{name}</td>
        <td>{email}</td>
        <td>{mobile_no}</td>
        <td>{gender}</td>
        <td>{department}</td>
        <td>{isBlocked?"Blocked":"Active"}</td>
        <td>{role}</td>
        <td>
          <img src={user_image}
            className="card-img-top rounded" alt="course"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = {def_img};
            }} style={{ "width": 50, "height": 50 }} />
        </td>
        <td>
            <button type="button" onClick={() => {
              let flag = window.confirm("Do you realy want to Do this?");
              if (flag) {
                let a = blockAUser(_id);
                a.then((d) => {
                  if (d.success) {
                    setStatus(d.newStatus.isBlocked);
                    props.showAlert("Done successfully!!", 'success');
                  }else{
                    props.showAlert("Can not block this User!!", 'danger');
                  }
                })
              }
            }} className="btn btn-dark btn-sm p-0 px-1" disabled={role==="admin"}>
              {/* <i className="bi bi-trash"></i> */}
              {status?"Unblock":"Block"}
            </button>
        </td>
      </tr>


    </>
  )
}

export default Admin_User