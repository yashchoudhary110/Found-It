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


    const buttonStyle = {
      fontSize: '14px',  // Adjust the font size to reduce button size
      padding: '8px 16px',  // Adjust padding for a smaller button
      display: 'block',  // Make the button a block element
      margin: 'auto',  // Center the button horizontally
      width:'100px'
    };
  const handleClick=(e)=>{
    navigate('/ExpForm');
  }
  
  return (
    <>


      {/* <div className="myapp"><button><a className="myapp" href="#about" >Add your placement Procedure</a></button></div> */}

      <div className="pb-5">
        <div className="row">
          {placementItems.length === 0 && !isLoading && <h6>No Item Found</h6>}
          {placementItems.length > 0 &&
            <>
              <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">

                {/* <!-- Shopping cart table --> */}
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="border-0 bg-light">
                          <div className="p-2 px-3 text-uppercase">student Name</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="p-2 px-3 text-uppercase">Company</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Date</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Profile</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Intern/FTE</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Number_of_rounds</div>
                        </th>

                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Number of Students</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">PI Expirience</div>
                        </th>
                        {/* <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Tips for Particular Company</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Your Way of Preparation</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Advice for Particular Company</div>
                        </th> <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Overall Exprience about Environment and other Factor</div>
                        </th> */}
                      </tr>
                    </thead>

                    {placementItems.map((item, id) => {
                      return <PlacementItem key={id} item={item} showAlert={props.showAlert} />
                    })}

                  </table>
                </div>
          
              </div>
              <button  className="btn btn-success" onClick={handleClick} style={buttonStyle}>
      Add New Expirience
    </button>
              
            </>}
            
        </div>
      </div>


     
      {/* Form */}
      {/* <section className="page-section bg-primary" id="about"> */}
      {/* <section className="page-section placemet-bg " id="about">
      <br />
      
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

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </section> */}
    </>

  )
}
