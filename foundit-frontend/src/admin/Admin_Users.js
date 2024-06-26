import React from 'react'
import AdminUser from './Admin_User';

function Admin_Users(props) {
  let cnt=0;

  return (
    <div className='overflow-auto bg-light'>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact No</th>
            <th scope="col">Gender</th>
            <th scope="col">Department</th>
            <th scope="col">Status</th>
            <th scope="col">Role</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>

          {/* 3. ***** Total Users ***** */}
          {/* use map */}
          {props.users.map((user, id) => {
            cnt=cnt+1;
            return <AdminUser key={id} cnt={cnt} user={user} showAlert={props.showAlert} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Admin_Users