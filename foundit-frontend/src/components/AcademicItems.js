import React, { } from 'react'
import AcademicItem from './AcademicItem';
import './css/faculty.css';
import './css/notes.css';
function AcademicItems(props) {
  return (

    <>
      {
        props.items.map((item, id) => {
          return <AcademicItem key={id} flag={props.flag} item={item} showAlert={props.showAlert} />
        })
      }
    </>



  )
}

export default AcademicItems;