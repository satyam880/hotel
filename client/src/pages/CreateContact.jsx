import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useGetAllUsersQuery } from '../rtk/services';
import {get_user, edit_user,delete_user} from '../store/slices'

export const CreateContact = () => {
  const navigate = useNavigate();
  const dispatch= useDispatch();

  const data= useSelector((state)=>{
    return state.userStore.list
  });
  console.log(data);

  const getAllUsers=async()=>{
    
      const response = await fetch ("http://localhost:7000/api/show",{
        headers:{
          'Content-Type':'application.json',
        },
        method:"GET"
      })

      if(response.ok){
        const data= await response.json();
        dispatch(get_user(data));
      }
  }

  useEffect(()=>{
    getAllUsers()
  },[])
  const handleEdit = (userId) => {

    dispatch(edit_user(userId));
    navigate("/ecs");
    

  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:7000/api/delete/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data=await response.json();
        alert(`${data.message}`)
        dispatch(delete_user(userId))
        navigate("/")
      } else {
         alert("Failed to delete user");
      }
    } catch (error) {
      alert(error +"from delete");
    }
  };

  return (
    <div className="contact-page bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="contact-box p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-blue-500">Create Contact</h1>
        <div className="content-wrapper max-w-screen-lg flex">
          <div className="left w-1/2 p-4">
            <div className="topics">
              <ul>
                <li><a href="#" className="text-blue-500 hover:underline">Contact</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Charts</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Map</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Sidebar</a></li>
              </ul>
            </div>
          </div>
          <div className="right w-1/2 p-4">
            <div className="create-contact-btn mb-4">
              <button onClick={() => navigate("/ccs")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Create Contact
              </button>
            </div>
            {data.length > 0 ? (
              <div className="users">
                <h2 className="text-xl font-bold mb-4">Users</h2>
                <div className="grid grid-cols-3 gap-4">
                  {data.map((user,id) =>
                   
                  { 
                    // console.log(user)
                    const {_id,fname,lname}=user;
                  console.log(_id,fname,lname)
                    return (
                    <div key={id} id={user._id} className="user-box bg-gray-200 p-4 rounded">
                      <p>{fname} {lname}</p>

                      <p>{user.status ? 'Active' : 'Inactive'}</p>
                      <div className="flex-column justify-between mt-2">
                        <button onClick={() => handleEdit(user._id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(user._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                          Delete
                        </button>
                      </div>
                    </div>
                )})}
                </div>
              </div>
            ) : (
              <div>No user present. Please click on "Create Contact" to add users</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
