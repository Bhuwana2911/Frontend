import React from 'react'
import Navbar1 from './Navbar1'
import { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleNavbar from './SimpleNavbar';
import { Link } from 'react-router-dom';
import NavbarAfterManagerlogin from './NavbarAfterManagerlogin';
import { isExpired } from 'react-jwt';

function Manager() {
  //   if(isExpired(localStorage.getItem('jwtToken'))){
  //     alert("Session Timeout. Please  Login");
  //     window.location.href = "/admin";
  // }

  const [isvalidform, setisvalidform] = useState(false);
  const [errors, seterrors] = useState({});

  // const[credentials, setcredentials] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState("false");

  const [manager, setManager] = useState({
    mail: "",
    password: ""
  });

  const { mail, password } = manager;

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;


    setManager({ ...manager, [name]: value });
  }


  const validationForm = () => {
    const errors = {};
    if (!mail) {
      errors.mail = "Email is required";
    }
    if (!password) {
      errors.password = "password is required";
    }

    seterrors(errors);
    setisvalidform(Object.keys(errors).length === 0);
  }

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isvalidform) {
      console.log('submitting form', { mail, password });
    }
    // try {
    const response = await axios.post(`http://localhost:9504/token`,
      { mail, password }).then(res => {
        localStorage.setItem("jwtToken", res.data.jwtToken);
        console.log(res.data.jwtToken)
        setIsLoggedIn(true);
        console.log(isLoggedIn);

        if (res === 403) {
          alert("Enter valid credentials..");
        }
        else {
          alert("successfully logged in");
        }
        window.location.href = '/assignedEmployessOfManager';
      })
      //console.log(response);

      //}
      .catch((error) => {
        console.error(error);
        if (error.respone && error.response.status === 403) {
          alert("Incorrect");
        }
      }
      );
    console.log(response);
  }






  return (


    <div>
      <SimpleNavbar></SimpleNavbar>

      <div className="container" style={{ padding: '80px', width: '1500px' }}>
        <div className="row">
          <div style={{ backgroundColor: "#E8EAF6" }} className="col-md-6 offset-md-3 border rounded p-4 mt-3 shadow">
            <h2 className="text-center m-4"> Manager Login</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group row">

                <label htmlFor='mail' className="col-sm-3 col-form-label"> Mail </label>
                <div className="col-sm-8">

                  <input
                    type={"email"}
                    className="form-control"
                    autoComplete='off'
                    placeholder="Enter your mail"
                    name="mail"
                    //required
                    value={mail}
                    onChange={handleInput}
                    required
                  />
                  {errors.mail && <div style={{ color: 'red' }}> <p>*{errors.mail}</p></div>}
                  <br></br>
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
                    required
                  />
                  {errors.password && <div style={{ color: 'red' }}> <p>*{errors.password}</p></div>}
                  <br></br>
                </div>
              </div>



              <button type="submit" onClick={validationForm}  className="btn btn-outline-primary mx-2" to={"/assignedEmployessOfManager"}> Log in </button>
              {/* {credentials && <div style={{color:'red'}}> <p>*{credentials}</p></div>} */}
              {/* <i class="fa-solid fa-right-to-bracket"></i> */}
            </form>
          </div>

        </div>
      </div>
    </div>


  )

}

export default Manager



