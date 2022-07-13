import ReactPaginate from "react-paginate";
import AdminMember from "../AdminMember"
import {FiSearch} from "react-icons/fi"
import React, { useEffect, useState } from "react";
import './index.css'

function Paginate(){
    const [users, setUsers] = useState([]);
    const [searchUser, setSearchUser] = useState("");
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [role,setRole]=useState("")
    const [userId,setuserId]=useState(null)
  
    // Pagination Start
    const [pageCount, setPageCount] = useState(0);
    console.log("Page Count:", pageCount);
  
    const itemPerPage = 10;
    let pageVisited = pageCount * itemPerPage;
  
    const totalPages = Math.ceil(users.length / itemPerPage);
    const pageChange = ({ selected }) => {
      setPageCount(selected);
    };
  
   
    useEffect(() => {
      getUsersDetails();
    }, []);

    const getUsersDetails = () => {
      fetch(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      )
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          setName(data[0].name)
          setEmail(data[0].email)
          setRole(data[0].role)
          setuserId(data[0].id)
          // console.log(data);
          
        })
        // error
        .catch((err) => {
          console.log("Error:", err);
        });
    };

    const deleteUser = (id) => {
        let userAfterDeletion = users.filter((eachItem) => {
          return eachItem.id !== id;
        });
        setUsers(userAfterDeletion);
      };
    

      const onChangeSearchInput=event=>{
        setSearchUser(event.target.value) 
      } 



    return(
    <>  
        <div className="search-container">
        <h1 className="title">Admin Dashboard</h1>
          <div className="search-item-containter"> 
            <div className="search-icon">
              <FiSearch/>
            </div>
        <div className="input-search-container">
          <input type="search" placeholder="Search by name email or role" className="input-search"  
           onChange={onChangeSearchInput}/>
        </div>
        </div>
        </div>
        <div className="admin-container">
            <ul className="list-container">
           
              <li className="table-header">
                <div className="select-all-option-container">
                  <input type="checkbox"/>        
                </div>
                <p className="table-header-cell">Name</p>
                <p className="table-header-cell">Email</p>
                <p className="table-header-cell">Role</p>
                <p className="table-header-cell">Actions</p>
              </li>
              {users
              .filter((user) => {
               if (searchUser === "") return user;
            else if (
              user.name.includes(searchUser) ||
              user.email.includes(searchUser) ||
              user.role.includes(searchUser)
            ) {
              return user;
            }
          })   
          .slice(pageVisited, pageVisited + itemPerPage)
          .map((eachItem) => (
            <AdminMember eachAdminMember={eachItem}  deleteUser={deleteUser} getUsersDetails={getUsersDetails} 
                    key={eachItem.id} />
          ))}
         </ul>   
        </div>
     
        <div className="paginate">
            <ReactPaginate
            previousLabel={`<<`}
            nextLabel={`>>`}
            breakLabel={`...`}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={pageChange}
            containerClassName={"pagination justify-content-center"}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
            />
        </div>
        </>
    )
}

export default Paginate;