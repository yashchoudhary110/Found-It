import React, { useState, useContext, useEffect } from 'react'
import Itemcontext from '../context APIs/items/Itemcontext';
import Items from './Items';
import { useNavigate } from 'react-router-dom';


function Academichome(props) {
  let navigate = useNavigate();
  const context = useContext(Itemcontext);
  const { fetchAllItems, items, getUser } = context;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      getUser();
      fetchAllItems().then((d) => {
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

  return (

    <>
      <div className="container faculty_box">
        <div className="yourprojects mb-3 mt-4 nitt_col">
          <h3>Your Notes</h3>
        </div>

        <div className="row">
          {/* Items of User */}
          {items.length === 0 && !isLoading && <h6 className='text-center'>No project found</h6>}
          {items.length > 0 && <Items items={items} showAlert={props.showAlert} flag={true} />}
        </div>
      </div>
    </>

  )
}

export default Academichome;