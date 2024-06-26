import React, { useContext } from 'react'
import Itemcontext from '../context APIs/items/Itemcontext';
// import image from '../images/download icon.svg';
import './css/faculty.css';
import './css/notes.css';

function AcademicItem(props) {
  const context = useContext(Itemcontext);
  const { host } = context;
  const { user_name, notes_name, description, likes, date, file_name } = props.item
  const nd = new Date(date);
  const d = nd.toString();
  const month = d.slice(4, 7);
  const day = d.slice(8, 10);

  // const downloadfileaturl=(url)=>{
  //   console.log(url);
  //   const aTag=document.createElement('a');
  //   aTag.href=url;
  //   aTag.setAttribute('download', name);
  //   document.body.appendChild(aTag);
  //   aTag.click();
  //   aTag.remove();
  // }

  return (
    <div className="col-md-6 col-lg-4 col-xl-3 " >
      <div className="card card-margin m-2">
        <div className="card-body pt-3">
          <div className="widget-49">
            <div className="widget-49-title-wrapper">
            <div className="widget-49-meeting-info">
                <p>Notes Name: <b><span className="widget-49-pro-title text-truncate" style={{"maxWidth": "150px"}}>{notes_name}</span></b></p>
              </div>
              <div className="widget-49-meeting-info">
                <p>Uploaded By: <span className="widget-49-pro-title text-truncate" style={{"maxWidth": "150px"}}>{user_name}</span></p>
              </div>
              <div className="widget-49-date-primary">
              <p> Description: <span className="widget-49-date-day">{description}</span></p>
               <p> likes: <span className="widget-49-date-month">{likes}</span></p>
              </div>
              <div className="widget-49-date-primary">
              <p> Date: <span className="widget-49-date-day">{day}</span>
               <span className="widget-49-date-month">{month}</span></p>
              </div>
            </div>
            <div className="widget-49-meeting-action">
              {/* <button className='btn btn-link mb-1' onClick={()=>{downloadfileaturl(`${host}/files/${name}`)}}>
                <img src={image} alt="" />
              </button> */}
              <button><a href={`${host}/notes/${file_name}`} className="btn btn-sm btn-flash-border-primary fsfont">Open</a></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AcademicItem;