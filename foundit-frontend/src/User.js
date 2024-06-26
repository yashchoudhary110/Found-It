import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function User(props) {

  return (
    <div className="min-vh-100 m-0 d-flex flex-column bg-light">
      <div className="sticky-top w-100">
        <Navbar alert={props.alert} showAlert={props.showAlert} />
      </div>
      <div>
        <Outlet />
      </div>
      <div className="mt-auto w-100">
        <Footer />
      </div>
    </div>
  );
}

export default User;
