import React from 'react'
import Navbar1 from './Navbar1'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SimpleNavbar from './SimpleNavbar';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { isExpired } from 'react-jwt';

function Admin() {

//   if(isExpired(localStorage.getItem('jwtToken'))){
//     alert("Session Timeout. Please  Login");
//     window.location.href = "/"
// }

  

  const [admin, setAdmin] = useState({
    username: "",
    password: ""
  });


  const [isvalidform, setisvalidform] = useState(false);
  const [errors, seterrors] = useState({});
 const [isLoggedIn, setIsLoggedIn] = useState(false);


  const { username, password } = admin; //destructuring

 


  const validationForm = () => {
    const errors = {};
    if(!username){
        errors.username = "Name is required";
    }

     if(!password){
          errors.password="password is required";
     }

    seterrors(errors);
    setisvalidform(Object.keys(errors).length === 0);
}





  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isvalidform){
      console.log('submitting form', {username,password});
    }
    //try {
      const response = await axios.post(`http://localhost:9500/token`,
        { username, password }).then(res => {
          localStorage.setItem("jwtToken", res.data.jwtToken);
          console.log(res.data.jwtToken)
          setIsLoggedIn(true);
          console.log(isLoggedIn);
          
          if (res === 400) {
            //alert("Enter valid credentials..");
             toast.success("Valid");
          }

          else {           
            alert("successfully logged in");
            //toast.success("Logged in successfully")
          }

          window.location.href = '/addEmployeeByAdmin';
        })
      // console.log(response);

    //}
    .catch ((error) => {
      console.error(error);   
      if(error.response && error.response.status === 500){
        alert("Incorrect username and password");
      } 
    });
    console.log(response);
    
  }


  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAdmin({ ...admin, [name]: value });
  }

  
  return (
    <div>
      <SimpleNavbar></SimpleNavbar>
      <div className="container" 
        style={{padding:'80px', width:'1500px'}} >
        <div className="row">
          <div style={{backgroundColor:"#E8EAF6"}} className="col-md-6 offset-md-3 border rounded p-4 mt-3 shadow">
            <h2 className="text-center m-4"> Admin Login</h2>

            <form  onSubmit={handleSubmit} >
              <div className="form-group row">
                <label htmlFor='username' className="col-sm-3 col-form-label"> Username </label>
                <div className="col-sm-8">
                <input
                  type={"text"}
                  className="form-control"
                  autoComplete='off'
                  placeholder="Enter username"
                  name="username"
                  //required
                  value={username}
                  onChange={handleInput}
                /> 
                {errors.username && <div style={{color:'red'}}> <p>*{errors.username}</p></div>}
                <br/>
                </div>

                <label htmlFor='password' className="col-sm-3 col-form-label"> Password </label>
                <div className="col-sm-8">
                <input
                  type={"password"}
                  className="form-control"
                  autoComplete='off'
                  placeholder="Enter your password"
                  name="password"
                  //required
                  value={password}
                  onChange={handleInput}
                  />
                   {errors.password && <div style={{color:'red'}}> <p>*{errors.password}</p></div>}
                <br/>
                </div>
              </div>


              <button type="submit" onClick={validationForm} className="btn btn-outline-primary mx-6" > Log in </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Admin;