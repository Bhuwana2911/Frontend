import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from "react-router-dom";
import NavbarAfterManagerlogin from './NavbarAfterManagerlogin';
import Navbar1 from './Navbar1';
import { isExpired } from 'react-jwt';

function DisplayAllEmployees() {

    if(isExpired(localStorage.getItem('jwtToken'))){
        alert("Session Timeout. Please  Login");
        window.location.href = "/admin";
    }

    const [employee, setEmployee] = useState([]);


    useEffect(() => {
        loadUsers();
    }, []);

    const { employeeMail } = useParams();

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:9500/employees/allEmployees");
        setEmployee(result.data);
    };




    return (
        <div>
        <Navbar1/>
        <div className="container">
            <div className="py-4">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Employee Name</th>
                            <th scope="col">Employee Mail</th>
                            <th scope="col">Department</th>
                            <th scope="col">Role</th>
                            <th scope="col">Mobile</th>
                            <th scope="com">Manager mail</th>
                            {/* <th scope="col">Action</th> */}

                        </tr>
                    </thead>
                    <tbody>
                        {
                            employee.map(employee => (
                                <tr>
                                    {/* <th scope="row" key={index} > {index + 1} </th> */}
                                    <td>{employee.employeeId}</td>
                                    <td>{employee.employeeName}</td>
                                    <td>{employee.employeeMail}</td>
                                    <td>{employee.employeeDepartment}</td>
                                    <td>{employee.employeeRole}</td>
                                    <td>{employee.employeeMobile}</td>
                                    <td>{employee.mail}</td>
                                </tr>
                            )
                        )
                    }

                    </tbody>
                </table>
            </div>
        </div >
        </div>

    )


}

export default DisplayAllEmployees;