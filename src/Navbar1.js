import React from 'react'
import { Link } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { isExpired } from 'react-jwt';

function Navbar1() {
    // if(isExpired(localStorage.getItem('jwtToken'))){
    //     alert("Session Timeout. Please  Login");
    //    // window.location.href("/admin")
    // }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link type="button" className="btn btn-otline me-left" style={{color:'white'}} to={'/addManagerByAdmin'}>AddManager</Link>
            <Link type="button" className="btn btn-otline  me-left" style={{color:'white'}} to={'/addEmployeeByAdmin'}>AddEmployee </Link>




            <DropdownButton title="View" style={{ color: 'black' }} className="custom-dropdown-button">
                        <Dropdown.Item >
                            <Link to="/viewEmployees">
                                All employees
                            </Link>
                        </Dropdown.Item>

                        <Dropdown.Item >
                            <Link to="/viewManagers">
                                All managers
                            </Link>
                        </Dropdown.Item>
                    </DropdownButton>



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

                  

                    <Link type="button" className="btn btn-primary" to={'/admin'}> Logout </Link>


                </div>

            </nav>

        </div>
    )
}

export default Navbar1;