//import { borderRight, textAlign } from '@mui/system'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
//import { Link } from 'react-router-dom'
import Itemcontext from '../context APIs/items/Itemcontext'
import PlacementItem from '../components/PlacementItem';


export default function Placement(props) {
  const navigate=useNavigate();
  const context = useContext(Itemcontext);
  const { addplacementexp, fetchPlacements, placementItems } = context;
  const [isLoading, setIsLoading] = useState(true);

  const [credentials, setCredentials] = useState({ company_name: "", profile: "", date: "", No_students: "", No_rounds: "", intern_or_fte: "", round_exp: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const { company_name, profile, date, No_students, No_rounds, intern_or_fte, round_exp } = credentials;

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      fetchPlacements().then((d) => {
        if (!d) props.showAlert("Not able to fetch placemnet Items", "danger");
        setIsLoading(false);
      })
    }
    console.log(placementItems);

    // eslint-disable-next-line
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault(); // default settings of form
    // console.log(credentials);
    const res = await addplacementexp(company_name, profile, date, No_students, No_rounds, intern_or_fte, round_exp);
    if (res) props.showAlert("Added successfully", "success");
    else props.showAlert("Not added ", "danger");
  }

  return (
    <>


      {/* <div className="myapp"><button><a className="myapp" href="#about" >Add your placement Procedure</a></button></div> */}
      {/* Form */}
      {/* <section className="page-section bg-primary" id="about"> */}
      <section className="page-section placemet-bg " id="about">
      <br />
         <h1 style={{textAlign: "center"}}>Please Add your Experience it is Helpfull</h1>
        <form onSubmit={handleSubmit} className='placement newnn'>
        <h4>Add your interview Exprience</h4>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Company Name</label>
            <input onChange={onChange} name='company_name' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Profile</label>
            <input onChange={onChange} name='profile' type="text" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Company visit date</label>
            <input onChange={onChange} name='date' type="date" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Number of students slected</label>
            <input onChange={onChange} name='No_students' type="text" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Number of rounds</label>
            <input onChange={onChange} name='No_rounds' type="text" className="form-control" id="exampleCheck1" />
          </div>
          <div className="mb-3">
            <label className="form-check-label" htmlFor="exampleCheck1">Intern or FTE</label>
            <input onChange={onChange} name='intern_or_fte' type="text" className="form-control" id="exampleCheck1" />
          </div>
          <div className="mb-3">
            <label className="form-check-label" htmlFor="exampleCheck1">Explain Procedure stepwise</label>
            <textarea onChange={onChange} name='round_exp' className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <div className="mb-3">
            <label className="form-check-label" htmlFor="exampleCheck1">Tips for particular company</label>
            <textarea onChange={onChange} name='round_exp' className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <div className="mb-3">
            <label className="form-check-label" htmlFor="exampleCheck1">Your way of preparation</label>
            <textarea onChange={onChange} name='round_exp' className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <div className="mb-3">
            <label className="form-check-label" htmlFor="exampleCheck1">Overall Exprience about Environment and other Factor</label>
            <textarea onChange={onChange} name='round_exp' className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </section>
    </>

  )
}
