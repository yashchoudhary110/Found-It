import React from 'react'

function Alert(props) {

  const capitalize = (word) => {
    if (word === "danger")
      word = "Failed";
    word = word.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div className='position-absolute w-25 top-0' style={{left:'37%'}}>
      {props.alert && <div className={`alert alert-${props.alert.message} alert-dismissible fade show d-flex justify-content-center  p-0 px-2`} style={{zIndex:'2'}} role="alert">
        <strong>{capitalize(props.alert.message)}</strong> : {props.alert.explanation}
      </div>}
    </div>
  )
}

export default Alert;