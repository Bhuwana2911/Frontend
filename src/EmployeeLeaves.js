import React, {useState, useEffect } from 'react'
import{Link} from 'react-router-dom'
import axios from 'axios'
import { isExpired } from 'react-jwt';

import LeaveNavbar from './LeaveNavbar';


function EmployeeLeaves() {
    if(isExpired(localStorage.getItem('jwtToken'))){
        alert("Session Timeout. Please  Login");
        window.location.href = "/employee";
    }

    const [alleaves, setallleaves] = useState([]);
    
    useEffect(() => {
        loadUsersMail();
    }, []);



    const loadUsersMail = async () => {        
        await axios.get(`http://localhost:9504/loginmanager/${localStorage.getItem('jwtToken')}`)
            .then(res => {
                console.log(res.data)
                axios.get(`http://localhost:9505/leave/leaves/${res.data}`)
                    .then(response => {
                        setallleaves(response.data)
                        console.log(response.data);
                    })
                })
            .catch(error => {
                console.log(error);
            });

    };
    return (
        <div>
            <LeaveNavbar/>
            <div className="container">
                <div className="py-4">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">startDate</th>
                                <th scope="col">EndDate</th>
                                <th scope="col">Reason</th>
                                <th scope = "">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                alleaves.map(leaves => (
                                    <tr>
                                        {/* <th scope="row" key={index} > {index + 1} </th> */}

                                       <td>{leaves.id}</td>
                                       <td>{leaves.sdate}</td>
                                        <td>{leaves.edate}</td>
                                        <td>{leaves.reason}</td>
                                        <td>{leaves.status}</td>
                                         
                                        {/* <td>
                                        <Link type="button" className="btn btn-primary me-left">UpdateTask</Link>
                                        </td> */}

                                        
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

export default EmployeeLeaves