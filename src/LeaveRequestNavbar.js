import React from 'react'
import {Link} from 'react-router-dom';
import { isExpired } from 'react-jwt';

function LeaveRequestNavbar() {
    // if(isExpired(localStorage.getItem('jwtToken'))){
    //     alert("Session Timeout. Please  Login");
    //     window.location.href = "/admin";
    // }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand mx-auto">
                        Welcome
                    </a>
                     <Link type="button" className="btn btn-primary" to={'/allemployeeleaves'}> CheckLeaveStatus </Link> 
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

                    {/* <Link type="button" className="btn btn-primary" to={'/'}> Logout </Link> */}


                </div>

            </nav>

        </div>
    )

  
}

export default LeaveRequestNavbar