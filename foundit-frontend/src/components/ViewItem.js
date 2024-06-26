import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import Itemcontext from '../context APIs/items/Itemcontext';

function ViewItem() {
  const { itemId, userId } = useParams();

  const context = useContext(Itemcontext);
  const { getUserById,  uploader, item, getAItem } = context;
  const [iflag, setIflag] = useState(false);
  const [uflag, setUflag] = useState(false);

  const def_img=process.env.REACT_APP_DEFAULT;

  useEffect(() => {
    itemId && getAItem(itemId).then((d)=>{
      if(d.success){ setIflag(true);  }
      else console.log(d.message);
    })
    userId && getUserById(userId).then((d) => {
      if(d.success) setUflag(true);
      else console.log(d.message);
    })// eslint-disable-next-line
  }, [])


  return (
    <>
      <div className="container marketing">
        {/* <!-- START THE FEATURETTES --> */}
        {uflag && <div className="row featurette mt-3">

          <ul className="col-md-7 order-md-2 list-unstyled">
            <li><h2 className="featurette-heading fw-normal lh-1"><span className="text-muted">Uploader Details</span></h2></li>
            <li><p className="lead"><strong className='text-muted'>Name:</strong> {uploader.name}</p></li>
            <li><p className="lead"><strong className='text-muted'>Modile No:</strong> {uploader.mobile_no}</p></li>
            <li><p className="lead"><strong className='text-muted'>Department:</strong> {uploader.department}</p></li>
            <li><p className="lead"><strong className='text-muted'>Gender:</strong> {uploader.gender}</p></li>
          </ul>

          <div className="col-md-5 order-md-1">
            <img src={uploader.user_image}
              alt="course"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = {def_img};
              }} className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" style={{ "width": 400, "height": 400 }} preserveAspectRatio="xMidYMid slice" focusable="false" />
          </div>

        </div>}

        <hr className="featurette-divider" />

        {iflag && <div className="row featurette mb-2">

          <ul className="col-md-7 list-unstyled">
            <li><h2 className="featurette-heading fw-normal lh-1"><span className="text-muted">Book Details.</span></h2></li>
            <li><p className="lead"><strong className='text-muted'>Book Name:</strong> {item.name}</p></li>
            <li><p className="lead"><strong className='text-muted'>Description:</strong> {item.description}</p></li>
            <li><p className="lead"><strong className='text-muted'>Purpose:</strong> {item.status}</p></li>
            {/* <li><p className="lead"><strong className='text-muted'>Is Reported:</strong> {item.is_reported ? "Yes" : "No"}</p></li> */}
            {/* <li><p className="lead"><strong className='text-muted'>Place Where it Found/Lost:</strong> {item.place}</p></li> */}
            <li><p className="lead"><strong className='text-muted'>Date:</strong> {item.date.slice(0, 10)}</p></li>

            {/* <li><p className="lead"><small className="text-muted">Last updated 3 mins ago</small></p></li> */}
          </ul>

          <div className="col-md-5">
            <img src={item.image_name}
              alt="course"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = {def_img};
              }} className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" style={{ "width": 400, "height": 400 }} preserveAspectRatio="xMidYMid slice" focusable="false" />
          </div>
        </div>}

      </div>
    </>
  )
}

export default ViewItem