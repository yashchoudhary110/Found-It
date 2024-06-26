import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import About from "./components/About";
import Search from "./components/Search";
import Login from "./components/Login";
import Signup from "./components/Signup";
import User from './User';

import AllItems from "./admin/All_Items";
import AllUsers from "./admin/All_Users";
import Admin from './Admin';

import Itemstates from "./context APIs/items/Itemstates";
import Emailverified from "./components/Emailverified";
import ViewItem from "./components/ViewItem";
import Academic from "./components/Academic";
import Placement from "./components/Placement";
import Foundit from "./components/Foundit";
import Details from './components/Details'
import ExpForm from './components/ExpForm'

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (explanation, message) => {
    setAlert({
      explanation: explanation,
      message: message
    })
    setTimeout(() => {
      setAlert(null);
    }, '5000');
  }

  return (  
    <>
      <Itemstates>
        <Router>
          <Routes>
              <Route path="/" element={<User showAlert={showAlert} alert={alert} />} >
              <Route exact path="/" element={<Homepage showAlert={showAlert} />} />
              <Route exact path="about" element={<About />} />
              <Route exact path="search" element={<Search showAlert={showAlert} />} />
              <Route exact path="login" element={<Login showAlert={showAlert} />} />
              <Route exact path="signup" element={<Signup showAlert={showAlert} />} />
              <Route exact path="academic" element={<Academic showAlert={showAlert}/>} />
              <Route exact path="placement" element={<Placement showAlert={showAlert}/>} />
              <Route exact path="ExpForm" element={<ExpForm showAlert={showAlert}/>} />
              <Route exact path="placement" element={<Placement showAlert={showAlert}/>} />
              
              <Route exact path="/foundit" element={<Foundit/>} />
              <Route exact path="/Details/:_id/:userId" element={<Details/>} />
              <Route exact path="ViewItem/:itemId/:userId" element={<ViewItem/>} />
            </Route>

            <Route path="/admin" element={<Admin showAlert={showAlert} alert={alert} />}>
              <Route exact path="allItems" element={<AllItems showAlert={showAlert} />} />
              <Route exact path="allUsers" element={<AllUsers showAlert={showAlert} />} />
            </Route>

            <Route exact path="/verify/:id/:token" element={<Emailverified showAlert={showAlert}/>} />

          </Routes>
        </Router>

      </Itemstates>
    </>
  );
}

export default App;
