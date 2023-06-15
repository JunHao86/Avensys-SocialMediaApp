import axios from 'axios'
import React, { useEffect, useState } from 'react'
import{addPost_admin,addUsers_admin,socialAppStore} from "./redux.js";
import { useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Adminpanel() {

    const[post,setAllPost] = useState([])
    const[user,setAllUser] = useState([])
    const ud = useDispatch()
    const ud2 = useDispatch()
    const navigate = useNavigate()


    // MyContext.js


   

   

    useEffect(()=>{
        axios.get("http://localhost:8080/admin/allposts")
        .then(response => {
            console.log(response.data)           
            setAllPost(response.data)          
        })
        .catch(error => {
            console.error(`Error fetching user data: ${error}`);
          });

        axios.get("http://localhost:8080/admin/allusers")
          .then(response => {            
              setAllUser(response.data)          
          })
          .catch(error => {
              console.error(`Error fetching user data: ${error}`);
            });

        
    }, [])

    function deletePost(post){

        
        axios.post("http://localhost:8080/admin/delete/post",
           post
          )
          .then(response => { 
            console.log(response.data)           
            window.location.pathname = "/adminpanel"
          })
          .catch(error => {
              console.error(`Error fetching user data: ${error}`);
            });
    }

    function deleteUser(user){

        
        axios.post("http://localhost:8080/admin/delete/user",
           user
          )
          .then(response => { 
            console.log(response.data)           
            window.location.pathname = "/adminpanel"
          })
          .catch(error => {
              console.error(`Error fetching user data: ${error}`);
            });
    }

    function updatePost(post)
    {
        console.log(post)
        
        ud(addPost_admin(post))
        console.log("get socialAppStore.getState()",socialAppStore.getState())
        navigate("/updatemediapost")
       
    }

    function updateUser(user)
    {
        console.log(user)
        
        ud2(addUsers_admin(user))
        console.log("get socialAppStore.getState()",socialAppStore.getState())
        navigate("/updateuser")
       
    }
  return (
    <div>
         <div className="container">
            <div className="row">
                <div className="row-6">
                <h3>MediaPost Records</h3>
                <table className="table">
                <thead>
                    <tr>
                        <th>Post Id</th>
                        <th>Content</th>
                        <th>media_URL</th>
                        <th>Caption</th>
                        <th>Created_At</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {post.length <= 0 && <tr><td>No post Today</td></tr>}
                    {
                      
                    post.map((post) => (

                        <tr key={post.postId}>
                            <td>{post.postId}</td> 
                            <td>{post.content}</td>                             
                            <td>{post.mediaUrl}</td>
                            <td>{post.caption}</td>
                            <td>{post.createdAt}</td> 
                            <td><button onClick={() =>deletePost(post)} className='btn btn-danger'>Delete</button></td> 
                            <td><button onClick={() =>updatePost(post)} className='btn btn-success'>Update</button></td>
                                                  
                        </tr>
                            
                        ))}
                    </tbody>
                </table>
                </div>
                <div className="row-6">
                    <h3>User Records</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>Password</th>
                            <th>Email</th>                            
                            <th>Role</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.length <= 0 && <tr><td>No post Today</td></tr>}
                    {user.map((user)=>
                        (
                            <tr key={user.user_id}>
                                <td>{user.user_id}</td>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>                                
                                <td><button onClick={() =>deleteUser(user)} className='btn btn-danger'>Delete</button></td> 
                            <td><button onClick={() =>updateUser(user)} className='btn btn-success'>Update</button></td>
                            </tr>
                        )
                        )
                        
                    }
                    </tbody>
                </table>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Adminpanel