import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LeaveRequest from './LeaveRequest';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { isExpired } from 'react-jwt';

function LeaveNavbar() {
    // if(isExpired(localStorage.getItem('jwtToken'))){
    //     alert("Session Timeout. Please  Login");
    //    // window.location.href("/admin")
    // }



    const [employee, setEmployee] = useState('');
    useEffect(() => {
        loadUsersMail();
    }, []);

    

    const loadUsersMail = async () => {
        await axios.get(`http://localhost:9501/loginuser/${localStorage.getItem('jwtToken')}`)
        .then(res => {
            console.log(res.data)
             axios.get(`http://localhost:9502/viewEmployee/view/${res.data}`)
            .then(response => {
                setEmployee(response.data)
             console.log(response.data);
            })

            //window.location.href = '/updateDetails';
            
        })
        .catch(error => {
            console.log(error);
        });
        
    };


    const name = employee.employeeName;


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                {/* <Link type="button" className="btn btn-primary me-left" to={'/particularEmployee'}>Home</Link> */}
                {/* <Link type="button" className="btn btn-primary me-left" to={'/leaverequest'}>ApplyLeave</Link> */}

                <DropdownButton 
                 title="MyLeaves" className="custom-dropdown-button">
                    <Dropdown.Item className="btn btn-outline">
                        <Link to="/leaverequest">
                            Apply Leave
                        </Link>
                    </Dropdown.Item>

                    <Dropdown.Item >
                        <Link to="/allemployeeleaves">
                            Leave Status
                        </Link>
                    </Dropdown.Item>
                </DropdownButton>

                <Link type="button" variant = "primary" className="btn btn-outline mx-1 me-left" style={{color:'white'}} to={'/checktasks'}>Checktasks</Link>


                {/* <p>{props.name}</p> */}
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
                    
                    
                    <DropdownButton title={name} style={{ color: 'black' }} className="custom-dropdown-button">
                        <Dropdown.Item >
                            <Link to="/particularEmployee">
                                Home
                            </Link>
                        </Dropdown.Item>

                        <Dropdown.Item >
                            <Link to="/employee">
                                Logout
                            </Link>
                        </Dropdown.Item>
                    </DropdownButton>




                    {/* <Link type="button" className="btn btn-primary" to={'/'}> Logout </Link> */}


                </div>

            </nav>

        </div>
    )
}

export default LeaveNavbar