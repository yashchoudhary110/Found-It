import React from 'react'
import Adminitem from './Admin_item'

function Admin_items(props) {
  let cnt=0;

  return (
    <div className='overflow-auto bg-light'>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Name</th>
            <th scope="col">Uploaded By</th>
            {/* <th scope="col">Type</th> */}
            {/* <th scope="col">Place</th> */}
            <th scope="col">Date</th>
            <th scope="col">Is Reported</th>
            <th scope="col">Purpose</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>

          {/* 3. ***** Uploaded Items of User ***** */}
          {/* use map */}
          {props.allitems.map((item, id) => {
            cnt=cnt+1;
            return <Adminitem key={id} cnt={cnt} item={item} showAlert={props.showAlert} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Admin_items