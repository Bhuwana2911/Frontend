import React,{useState, useEffect} from 'react'
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import SimpleNavbar from './SimpleNavbar';
import NavbarAfterManagerlogin from './NavbarAfterManagerlogin';
import { isExpired } from 'react-jwt';


function AllTasksOfEmployee() {
    if(isExpired(localStorage.getItem('jwtToken'))){
        alert("Session Timeout. Please  Login");
        window.location.href = "/employee"
    }
  

    const[alltasks, setalltasks] = useState([]);

    const {employeeMail} = useParams()

    useEffect(() => {
        const loadUsersMail = async () => {
            // await axios.get(`http://localhost:9504/loginmanager/${localStorage.getItem('jwtToken')}`)
            //     .then(res => {
                    console.log("hi hello")
                    //console.log(res.data)
                    axios.get(`http://localhost:9507/task/listofemployeetasks/${employeeMail}`)
                        .then(response => {
                            setalltasks(response.data)
                            console.log(response.data);
                        })
               // })
                .catch(error => {
                    console.log(error);
                });   
        };    
        loadUsersMail();
    }, []);


    // useEffect(() => {
    //     console.log(alltasks);
    // }, [alltasks]);

   

   




    return (
        <div>
            <NavbarAfterManagerlogin/>
            <div className="container">
                <div className="py-4">
                    <h5>All tasks of {employeeMail}</h5>
                    <br></br>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                {/* <th scope="col">EmployeeMail</th> */}
                                {/* <th scope="col">Mail</th> */}
                                <th scope="col">Description</th>
                                {/* <th scope="">Deadline</th> */}
                                <th scope="col">status</th>
                                <th scope="col">Progress</th>
                                {/* <th scope="col">submission Date</th> */}

                            </tr>
                        </thead>
                        <tbody>
                            {
                                alltasks.map(alltask => (
                                    <tr>
                                        <td>{alltask.id}</td>
                                        {/* <td>{alltask.employeeMail}</td> */}
                                        {/* <td>{alltask.mail}</td> */}
                                        <td>{alltask.description}</td>
                                        {/* <td>{alltask.deadline}</td> */}
                                        <td>{alltask.tstatus}</td>
                                        <td>{alltask.eprogress}</td> 
                                        {/* <td>{checktasks.submissiondate}</td>    */}
                                       


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

export default AllTasksOfEmployee