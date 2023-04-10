import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavbarAfterManagerlogin from './NavbarAfterManagerlogin';
import SimpleNavbar from './SimpleNavbar';
import LeaveNavbar from './LeaveNavbar';
import { isExpired } from 'react-jwt';

function CheckTasks() {

    if(isExpired(localStorage.getItem('jwtToken'))){
        alert("Session Timeout. Please  Login");
        window.location.href = "/employee";
    }

    const [checktasks, setchecktasks] = useState([]);
    

    useEffect(() => {
        const loadUsersMail = async () => {
            await axios.get(`http://localhost:9504/loginmanager/${localStorage.getItem('jwtToken')}`)
                .then(res => {
                    console.log(res.data)
                    axios.get(`http://localhost:9508/checkAndupdate/tasks/${res.data}`)
                        .then(response => {
                            setchecktasks(response.data)
                            console.log(response.data);
                        })
                })
                .catch(error => {
                    console.log(error);
                });   
        };    
        loadUsersMail();
    }, []);


    useEffect(() => {
        console.log(checktasks);
    }, [checktasks]);

   

    const handleTaskStatus = (taskId) => {
        axios.put(`http://localhost:9508/checkAndupdate/progress/${taskId}`, {eprogess: 'Yet to finish'})
        .then(response => {
            const updatedTasks = checktasks.map(status => {
                if(status.id === taskId){
                    return response.data;
                }
                else{
                    return status;
                }
            });
            setchecktasks(updatedTasks);
        })
        .catch(error => {
            console.log(error);
        })
    };




    return (
        <div>
            <LeaveNavbar />
            <div className="container">
                <div className="py-4">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                {/* <th scope="col">EmployeeMail</th>
                                <th scope="col">Mail</th> */}
                                <th scope="col">Description</th>
                                {/* <th scope="">Deadline</th> */}
                                <th scope="col">Task status</th>
                                <th scope="col">Task Progress</th>
                                <th scope="col">Action</th>
                                {/* <th scope="col">submission Date</th> */}

                            </tr>
                        </thead>
                        <tbody>
                            {
                                checktasks.map(checktasks => (
                                    <tr>
                                        <td>{checktasks.id}</td>
                                        {/* <td>{checktasks.employeeMail}</td>
                                        <td>{checktasks.mail}</td> */}
                                        <td>{checktasks.description}</td>
                                        {/* <td>{checktasks.deadline}</td> */}
                                        <td>{checktasks.tstatus}</td>
                                        <td>{checktasks.eprogress}</td> 
                                        {/* <td>{checktasks.submissiondate}</td>    */}
                                        <td>
                                            {/* <div> */}
                                            <button onClick={() => handleTaskStatus(checktasks.id)}
                                            type="submit" className="btn btn-outline-primary mx-2"
                                             >update progress</button>                                        
                                            {/* <button onClick={() => handleTaskStatus(checktasks.id)}
                                            type="submit" className="btn btn-outline-primary mx-2"
                                             >Complete</button> */}
                                            {/* </div> */}
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

export default CheckTasks