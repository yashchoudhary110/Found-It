import React from 'react';
// import Itemcontext from '../context APIs/items/Itemcontext'
import { Link } from 'react-router-dom'
export default function PlacementItem(props) {
  //  const context = useContext(Itemcontext);
    //const { getUserById } = context;

    const { company_name, profile, date, No_students, No_rounds, intern_or_fte, uploader, _id, userId } = props.item;
    
    return (


        <tbody>
            <tr>
                <td className="border-0 align-middle"><strong>{uploader}</strong></td>
                <th scope="row" className="border-0">
                    <div className="p-2">
                        <div className="ml-3 d-inline-block align-middle">
                            <h5 className="mb-0"> {company_name}</h5><span className="text-muted font-weight-normal font-italic d-block"></span>
                        </div>
                    </div>
                </th>
                <td className="border-0 align-middle"><strong>{date}</strong></td>
                <td className="border-0 align-middle"><strong>{profile}</strong></td>
                <td className="border-0 align-middle"><strong>{intern_or_fte}</strong></td>
                <td className="border-0 align-middle"><strong>{No_rounds}</strong></td>
                <td className="border-0 align-middle"><strong>{No_students}</strong></td>
                <td className="border-0 align-middle"><strong><Link className="nav-link  text-muted p" to={`/details/${_id}/${userId}`}>view</Link></strong></td>
            </tr>
        </tbody>



    )
}
