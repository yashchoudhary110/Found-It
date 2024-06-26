import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

function Emailverified() {
  
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState("Email verified successfully");
  const { id, token } = useParams();
  const navigate=useNavigate();

  const isVerified = async () => {
    const response = await fetch(`/api/auth/verify/${id}/${token}`, {
      method: 'GET'
    });
    const json = await response.json();
    if (json.success)  setFlag(true);
    else   setFlag(false); 
    setMessage(json.message); 
  }

  useEffect(() => {
    isVerified().catch(console.error);
    // eslint-disable-next-line
  }, [])

  return (
      <div className="vh-100 d-flex justify-content-center text-center align-items-center text-dark bg-light ">
          {flag ? <main className="px-3">
            <h1>{message}</h1>
            <p className="lead">Now You can Login</p>
            <p className="lead">
              <button className="btn btn-lg btn-secondary fw-bold border-white bg-dark" onClick={()=>{navigate("/login")}}>Login</button>
            </p>
          </main>:
          <main className="px-3">
          <h1>404 not found</h1>
          <p className="lead">{message}</p>
          
        </main>}
      </div>
  )
}

export default Emailverified