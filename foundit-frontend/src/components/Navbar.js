import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Itemcontext from '../context APIs/items/Itemcontext';
import Alert from "./Alert";

export default function Navbar(props) {
  let navigate = useNavigate();
  const context = useContext(Itemcontext);
  const { getUser, userData, clearItems } = context;
  let role = "cl"; let verified = false;
  if (userData) role = userData.role;
  if (userData) verified = userData.verified;

  useEffect(() => {
    if (localStorage.getItem('auth_token')) getUser();
    // eslint-disable-next-line
  }, [])


  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    clearItems();
    props.showAlert("Logged Out successfully", 'success');
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <Alert alert={props.alert} />
        <div className="container-fluid">
          <Link className="navbar-brand  text-white fw-bolder fs-4" to="/">shPortal</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <Link className="nav-link  text-muted " aria-current="page" to="/">Home</Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link  text-muted " aria-current="page" to="/foundit">Book Store</Link>
              </li>
              <li className="nav-item d-flex flex-row">
                <Link className="nav-link  text-muted p" to="search"><i className="bi bi-search me-1"></i>Search</Link>
              </li>
              <li className="nav-item d-flex flex-row">
                <Link className="nav-link  text-muted p" to="placement">Placement</Link>
              </li>
              <li className="nav-item d-flex flex-row">
                <Link className="nav-link  text-muted p" to="academic">Academic</Link>
              </li>
              <li className="nav-item d-flex flex-row">
                <Link className="nav-link  text-muted p" to="academic">Brain Test</Link>
              </li>
              <li className="nav-item d-flex flex-row">
                <Link className="nav-link  text-muted p" to="academic">Puzzle</Link>
              </li>
              
              <li className="nav-item d-flex flex-row">
                <Link className="nav-link  text-muted p" to="academic">QnA</Link>
              </li>
              {/* <li className="nav-item d-flex flex-row">
                <Link className="nav-link  text-muted p" to="/Details">Details</Link>
              </li> */}

              <li className="nav-item">
                <Link className="nav-link  text-muted" to="about">About us</Link>
              </li>
              {localStorage.getItem('auth_token') && role === "admin" && verified && <li className="nav-item d-flex flex-row">
                <Link className="nav-link  text-muted p" to="admin/allItems">Admin</Link>
              </li>}
            </ul>

            {(localStorage.getItem('auth_token') && verified)
              ? <div className='d-flex'>
                <p className='text-muted m-2'>Welcome {userData.name}</p>
                <button className='btn btn-primary mx-1' onClick={handleLogout}>Logout</button>
              </div>
              :
              <div className="d-flex">
                <Link className="btn btn-outline-primary" to="login">Login</Link>
                <Link className="btn btn-outline-primary ms-3" to="signup">Signup</Link>
              </div>}

          </div>
        </div>
      </nav>
    </>
  )
}
