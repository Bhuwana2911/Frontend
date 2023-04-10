import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SimpleNavbar from './SimpleNavbar';
import NavbarAfterManagerlogin from './NavbarAfterManagerlogin';
import { isExpired } from 'react-jwt';

function AllLeavesUnderManager() {

    if(isExpired(localStorage.getItem('jwtToken'))){
        alert("Session Timeout. Please  Login");
        window.location.href = "/manager";
    }


    const [allleaverequests, setallleaverequests] = useState([]);

    useEffect(() => {
        loadUsersMail();
    }, []);



    const loadUsersMail = async () => {
        await axios.get(`http://localhost:9504/loginmanager/${localStorage.getItem('jwtToken')}`)
            .then(res => {
                console.log(res.data)
                axios.get(`http://localhost:9506/ar/${res.data}`)
                    .then(response => {
                        setallleaverequests(response.data)
                        console.log(response.data);
                    })
            })
            .catch(error => {
                console.log(error);
            });
    };


    const handleReject = (leaveId) => {
        axios.put(`http://localhost:9506/ar/reject/${leaveId}`, { status: 'Rejected' })
            .then(response => {
                const updatedLeaveRequests = allleaverequests.map(request => {
                    if (request.employeeMail === leaveId) {
                        return { ...request, status: 'Rejected' };
                    }
                    else {
                        return request;
                    }
                });
                setallleaverequests(updatedLeaveRequests);
            })
            .catch(error => {
                console.error(error);
            })
    }




    const handleAccept = (leaveId) => {
        axios.put(`http://localhost:9506/ar/accept/${leaveId}`, { status: 'Accepted' })
            .then(response => {
                const updatedLeaveRequests = allleaverequests.map(request => {
                    if (request.employeeMail === leaveId) {
                        return { ...request, status: 'Accepted' };
                    }
                    else {
                        return request;
                    }
                });
                setallleaverequests(updatedLeaveRequests);
            })
            .catch(error => {
                console.error(error);
            })
    }



    return (
        <div>
            <NavbarAfterManagerlogin />
            <div className="container">
                <div className="py-4">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">EmployeeMail</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Reason</th>
                                <th scope="col">status</th>
                                <th scope="col">Accept</th>
                                <th scope="col">Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allleaverequests.map(leaverequests => (
                                    <tr>
                                        {/* <th scope="row" key={index} > {index + 1} </th> */}

                                        <td>{leaverequests.id}</td>
                                        <td>{leaverequests.employeeMail}</td>
                                        <td>{leaverequests.sdate}</td>
                                        <td>{leaverequests.edate}</td>
                                        <td>{leaverequests.reason}</td>
                                        <td>{leaverequests.status}</td>


                                        <td>
                                            {leaverequests.status === 'Pending' && (
                                                <>
                                                    <button type="submit" className="btn btn-outline-success mx-1"
                                                        onClick={() => handleAccept(leaverequests.employeeMail)}>
                                                        Accept</button>
                                                </>
                                            )}
                                            {leaverequests.status === 'Accepted' || leaverequests.status === 'Rejected' && (
                                                <>
                                                     <button type="submit" className="btn btn-outline-success mx-1"
                                                        onClick={() => handleAccept(leaverequests.employeeMail)} disabled>
                                                        Accept</button>

                                                </>
                                            )}
                                        </td>

                                        <td>
                                            {(leaverequests.status === 'Pending' || leaverequests.status === 'Accepted') && (
                                                <>
                                                    <button type="submit" className="btn btn-outline-danger mx-1"
                                                        onClick={() => handleReject(leaverequests.employeeMail)} >
                                                        Reject</button>
                                                </>
                                            )}
                                            {leaverequests.status === 'Accepted' || leaverequests.status === 'Rejected' && (
                                                <>
                                                    {/* <button type="text" className="btn btn-outline-success mx-1">                                                        
                                                            Blocked</button> */}

                                                    <button type="submit" className="btn btn-outline-danger mx-1"
                                                        onClick={() => handleReject(leaverequests.employeeMail)} disabled>
                                                        Reject</button>

                                                </>

                                            )}
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

export default AllLeavesUnderManager