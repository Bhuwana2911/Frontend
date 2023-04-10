import React, { useState, useEffect } from 'react'
import axios from 'axios';
import  NavbarAfterManagerlogin from './NavbarAfterManagerlogin';
import { Link, useParams } from 'react-router-dom'
import { isExpired } from 'react-jwt';

function UnderManager() {
    if(isExpired(localStorage.getItem('jwtToken'))){
        alert("Session Timeout. Please  Login");
        window.location.href = "/manager";
    }
    
    const [Manageremployees, setManageremployees] = useState([]);
    
    useEffect(() => {
        loadUsersMail();
    }, []);


    // const {mail} = useParams();

    const loadUsersMail = async () => {        
        await axios.get(`http://localhost:9504/loginmanager/${localStorage.getItem('jwtToken')}`)
            .then(res => {
                console.log(res.data)
                axios.get(`http://localhost:9520/manager/${res.data}`)
                    .then(response => {
                        setManageremployees(response.data)
                        console.log(response.data);
                        // <NavbarAfterManagerlogin mailId = {res.data}/>
                    })
                   
                })
            .catch(error => {
                console.log(error);
            });


    };
    
    return (
        <div>
            <NavbarAfterManagerlogin/>
            <div className="container">
                <div className="py-4">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Mail</th>
                                <th scope="col">Department</th>
                                <th scope="col">Role</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Button</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                Manageremployees.map(employee => (
                                    <tr>
                                        {/* <th scope="row" key={index} > {index + 1} </th> */}

                                       <td>{employee.employeeId}</td>
                                       <td>{employee.employeeName}</td>
                                        <td>{employee.employeeMail}</td>
                                        <td>{employee.employeeDepartment}</td>
                                        <td>{employee.employeeRole}</td>
                                        <td>{employee.employeeMobile}</td>
                                        {/* <td>{employee.mail}</td>   */}
                                        <td>
                                        <Link className="btn btn-outline-primary mx-1 me-left" to={`/allemployeetasks/${employee.employeeMail}`}>check Progress</Link>
                                        </td>

                                        
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

export default UnderManager