import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Admin from './Admin';
import pic from './image.png'
import axios from 'axios';
import { isExpired } from 'react-jwt';


function Navbar() {
    // if(isExpired(localStorage.getItem('jwtToken'))){
    //     alert("Session Timeout. Please  Login");
    //     //window.location.href("/admin")
    // }
    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand mx-auto">
                        Employee Management Portal
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* <Link className="btn btn-outline-light" to="addUser"> Add user </Link>
                    <Link className = "btn btn-outline-light" to="logout"> Logout</Link> */}



                    <Link type="button" class="btn btn-outline mx-2"
                        style={{ color: 'white' }}
                        to={'/admin'}>
                        Admin
                    </Link>

                    <Link type="button" class="btn btn-outline mx-2"
                        style={{ color: 'white' }}
                        to={'/manager'}>
                        Manager
                    </Link>


                    <Link type="button" class="btn btn-outline mx-2"
                        style={{ color: 'white' }}
                        to={'/employee'}>
                        Employee
                    </Link>
                </div>
            </nav>

        <div>
           
                <div  className = "Imagecontainer" style={{paddingLeft:"200px"}}>
                    <img className="Image" src={pic} alt="office" />
                </div>  
          
        </div>
        </div>
    )
}

export default Navbar