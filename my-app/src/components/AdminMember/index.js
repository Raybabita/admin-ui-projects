import "./index.css"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {FiEdit} from "react-icons/fi";
import {axios} from "axios";
import React, { useEffect, useState } from "react";

const AdminMember=(props)=>{
    const {eachAdminMember,deleteUser,getUsersDetails}= props
    const [name,setUserName]=useState(eachAdminMember.name)
    const [email,setUserEmail]=useState(eachAdminMember.email)
    const [role,setUserRole]=useState(eachAdminMember.role)
    const [id,setUserId]=useState(eachAdminMember.id)
    const [isChecked,setIsChecked]=useState([])
    
    const contentStyle = {
      maxWidth: "600px",
      width: "90%"
    };

const onDeleteItems=()=>{
  deleteUser(id)
}

const updateuser=(e)=>{
e.preventDefault();
console.log(id,name,email,role)
let items = {id,name,email,role}
console.log("items",items)
fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json/${id}`,{
  method:"PUT",
  headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(items)
}).then((result)=>{
  result.json().then((resp)=>{
    console.log(resp)
    getUsersDetails()
  })
})
}


  return(<>
        <li className={`list-items`}>
            <input type="checkbox" />
            <div className="member-detail">
                <p className="member">{name}</p>
                </div>    
                <div className="member-detail">
                <p className="member">{email}</p>
                </div>    
                <p className="member">{role}</p>   
             
  <div className="delete-container">
              <div>
                <Popup
                  trigger={<button
                    className="delete-button"
                    type="button"
                    testid="update"     
                  >
                  <FiEdit/>
                  </button>}
                  modal
                  contentStyle={contentStyle}
                >
                  {close => (
                    <div className="modal-container">
                      <a className="close" onClick={close}>
                        &times;
                      </a>
                      <div className="header">Update data </div>
                    <form className="form" onSubmit={updateuser}  key={eachAdminMember.id}>
                      <div className="input-container">
                        <label htmlFor="name">NAME:</label>
                      <input className="input" type="text" id="name" value={name} 
                      onChange={(e)=>setUserName(e.target.value)} required/>
                      </div>
                      <div className="input-container">
                        <label htmlFor="email">Email ID:</label>
                      <input  className="input" type="text" id="email" value={email} 
                      onChange={(e)=>setUserEmail(e.target.value)} required/>
                      </div>
                      <div className="input-container">
                        <label htmlFor="role">Role:</label>
                      <input  className="input" type="text" id="role" value={role}
                          onChange={(e)=>setUserRole(e.target.value)} required/>
                      </div>
                    
                      <button onClick={close} type="submit"> Submit</button>
                    
                    </form>
                    </div>
    )}
  </Popup>
  </div>
  <button
          className="delete-button"
          onClick={onDeleteItems}
          type="button"
          testid="delete"
        >
          <img
            className="delete-img"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
         </div>
        </li>
        </>
     )
}

export default AdminMember