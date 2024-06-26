import { useState } from "react";
import Itemcontext from "./Itemcontext";

function Itemstates(props) {

  const host="http://localhost:5000"

  const itemsinitially = [];
  const [items, setItems] = useState(itemsinitially);
  const [item, setItem] = useState(itemsinitially);
  const [allNotes, setAllNotes] = useState(itemsinitially);
  const [userData, setUser] = useState(itemsinitially);
  const [allusers, setAllusers] = useState(itemsinitially);
  const [allitems, setAllitems] = useState(itemsinitially);
  const [uploader, setUploader] = useState(itemsinitially);
  const [placementItems, setPlacementItems] = useState(itemsinitially);
  const [pItem, setPItem] = useState(itemsinitially);

  const [isAdded, setisAdded] = useState(false);

  // 1. ******** Fetch all items using fetch API *********
  const fetchAllItems = async () => {
    // Method-1   ****API call****
    const response = await fetch(`/api/item/fetchitems`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': localStorage.getItem('auth_token')
      }
    });
    const json = await response.json();
    if (json.success) setItems(json.items_list);
    return json;
  }

  // 2. ******** Add A Item ********
  const addItem = async (data) => {
    setisAdded(false);
    const response = await fetch(`/api/item/uploaditem`, {
      method: 'POST',
      headers: {
        'auth_token': localStorage.getItem('auth_token')
      },
      body: data
    });
    const json = await response.json();
    if (json.success) {
      setisAdded(true);
      setItems(items.concat(json.savedItem));
      document.getElementById('modalDismiss2').click();
    }
    else {
      alert(json.message);
    }
    return json.success;
  }

  // 3. ******** Delete A Item ********
  const deleteItem = async (id, public_id) => {
    const response = await fetch(`/api/item/deleteItem/${id}/${public_id}`, {
      method: 'DELETE',
      headers: {
        'auth_token': localStorage.getItem('auth_token'),
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    if (!json.success) {
      alert(json.message);
    } else {
      const newItems = items.filter((e) => { return e._id !== id });
      setItems(newItems);
      const newAllItems = allitems.filter((e) => { return e._id !== id });
      setAllitems(newAllItems);
    }

    return json.success;
  }

  // 4. ******** Edit a Item ********
  const editItem = async (data, id, public_id) => {
    const response = await fetch(`/api/item/updateItem/${id}/${public_id}`, {
      method: 'PUT',
      headers: {
        'auth_token': localStorage.getItem('auth_token')
      },
      body: data
    });
    const json = await response.json();
    if (json.success) {
      const item = json.item;
      let newItems = JSON.parse(JSON.stringify(items));
      for (let index = 0; index < items.length; index++) {
        const element = items[index];
        if (element._id === id) {
          newItems[index].name = item.name;
          newItems[index].description = item.description;
          newItems[index].type = item.type;
          newItems[index].date = item.date;
          newItems[index].place = item.place;
          newItems[index].image_name = item.image_name;
          break;
        }
      }
      setItems(newItems);
      return json.success;
    } else {
      alert(json.message);
      return json.success;
    }
  }

  // 5. ********clear the Items ********
  const clearItems = () => {
    setItems(itemsinitially);
    setUser(itemsinitially);
    setAllusers(itemsinitially);
    setUploader(itemsinitially);
    setAllitems(itemsinitially);
  }

  // 6. ******** Fetch a item using fetch API *********
  const getAItem = async (id) => {
    // Method-1   ****API call****
    const response = await fetch(`/api/item/getAItem/${id}`, {
      method: 'GET',
      headers: {
        'auth_token': localStorage.getItem('auth_token')
      }
    });
    const json = await response.json();
    if (json.success) setItem(json.item);
    return json;
  }

  // 5. ******** Add Placement ********
  const addplacementexp = async (company_name, profile, date, No_students, No_rounds, intern_or_fte, round_exp) => {
    const response = await fetch(`/api/item/addplacementexp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': localStorage.getItem('auth_token')
      },
      body: JSON.stringify({ company_name: company_name, profile: profile, date: date, No_students: No_students, No_rounds: No_rounds, intern_or_fte: intern_or_fte, round_exp: round_exp })
    });
    const json = await response.json();
    return json.success;
  }

  // 6. ******** Fetch Placement ********
  const fetchPlacements = async () => {
    const response = await fetch(`/api/item/fetchPlacements`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        'auth_token': localStorage.getItem('auth_token')
      },
      // body: JSON.stringify({company_name:company_name, profile:profile, date:date, No_students:No_students, No_rounds:No_rounds, intern_or_fte:intern_or_fte, round_exp:round_exp})
    });
    const json = await response.json();
    if (json.success) setPlacementItems(json.allitems);
    return json.success;
  }

  // 7. ****** Get All items || ADMIN Access ONLY ********
  const getAllItems = async () => {
    const response = await fetch(`/api/item/getAllItems`, {
      method: 'GET',
      headers: {
        'auth_token': localStorage.getItem('auth_token')
      }
    });
    const json = await response.json();
    if (json.success) setAllitems(json.allitems);
    return json;
  }


  // 5. ******** Fetch Placement ********
  const fetchPItem = async (_id) => {
    const response = await fetch(`/api/item/fetchPItem/${_id}`, {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json',
        'auth_token': localStorage.getItem('auth_token')
      },
      // body: JSON.stringify({company_name:company_name, profile:profile, date:date, No_students:No_students, No_rounds:No_rounds, intern_or_fte:intern_or_fte, round_exp:round_exp})
    });
    const json = await response.json();
    console.log(json);
    if (json.success) setPItem(json.item);
    return json;
  }


  // 1. ******** Get Loggedin User details ********
  const getUser = async () => {
    // API Call
    const response = await fetch(`/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': localStorage.getItem('auth_token')
      }
    });
    const json = await response.json();
    setUser(json.user_data);
    return json;
  }

  // 2. ******** Get User details with Id ********(Login Required)
  const getUserById = async (id) => {
    const response = await fetch(`/api/auth/getUserById/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': localStorage.getItem('auth_token')
      }
    });
    const json = await response.json();
    setUploader(json.uploader);
    return json;
  }

  //3. ****** Get All user || ADMIN Access ONLY ********
  const getAllUsers = async () => {
    const response = await fetch(`/api/auth/getAllUsers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': localStorage.getItem('auth_token')
      }
    });
    const json = await response.json();
    setAllusers(json.users);
    return json;
  }

  //4. ****** Block a user || ADMIN Access ONLY ********
  const blockAUser = async (id) => {
    const response = await fetch(`/api/auth/blockAUser/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': localStorage.getItem('auth_token')
      }
    });
    const json = await response.json();
    return json;
  }

 //5. ****** add a noted ********
  const addnotes= async (data) => {
    setisAdded(false);
    const response = await fetch(`/api/item/addnotes`, {
      method: 'POST',
      headers: {
        'auth_token': localStorage.getItem('auth_token')
      },
      body: data
    });
    const json = await response.json();
    return json;
  }

  //6. ****** fetch All Notes ********
  const fetchAllNotes= async () => {
    const response = await fetch(`/api/item/fetchAllNotes`, {
      method: 'POST',
      headers: {
        'auth_token': localStorage.getItem('auth_token')
      }
    });
    const json = await response.json();
    setAllNotes(json.notes);
    return json;
  }


  return (
    <Itemcontext.Provider value={{ getUserById, uploader, clearItems, isAdded, items, fetchAllItems, addItem, deleteItem, editItem, getUser, userData, allusers, getAllUsers, blockAUser, getAllItems, allitems, item, getAItem, addplacementexp, fetchPlacements, placementItems, pItem, fetchPItem, addnotes, fetchAllNotes, allNotes, host}}>
      {props.children}
    </Itemcontext.Provider>
  )
}

export default Itemstates
