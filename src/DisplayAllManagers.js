import React ,{useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import NavbarAfterManagerlogin from './NavbarAfterManagerlogin';
import Navbar1 from './Navbar1';
import { isExpired } from 'react-jwt';


function DisplayAllManagers() {

    if(isExpired(localStorage.getItem('jwtToken'))){
        alert("Session Timeout. Please  Login");
        window.location.href = "/admin"
    }
    
    const [allmanagers, setallmanagers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);



    const loadUsers = async () => {
        const result = await axios.get("http://localhost:9500/manager");
        setallmanagers(result.data);
    };




    return (
        <div>
            <Navbar1 />
        
        <div className="container">
            <div className="py-4">
                <table class="table table-striped">
                    <thead>
                        <tr>                           
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Manager Mail</th>
                            {/* <th scope="col">Role</th> */}
                            <th scope="col">password</th>
                            {/* <th scope="com">Manager</th> */}
                            {/* <th scope="col">Action</th> */}

                        </tr>
                    </thead>
                    <tbody>
                        {
                            allmanagers.map(manager => (
                                <tr>
                                    {/* <th scope="row" key={index} > {index + 1} </th> */}                                    
                                    <td>{manager.mid}</td>
                                    <td>{manager.mname}</td>
                                    <td>{manager.mail}</td>
                                    {/* <td>{manager.mrole}</td> */}
                                    <td>{manager.password}</td>
                                    
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

export default DisplayAllManagers