import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { isExpired } from 'react-jwt';

function NavbarAfterManagerlogin(props) {
    // if(isExpired(localStorage.getItem('jwtToken'))){
    //     alert("Session Timeout. Please  Login");
    //     //window.location.href("/admin")
    // }


    const [manager, setmanager] = useState('');
    // const [manager1, setmanager1] = useState(null);

    // const { mail } = useParams();



    useEffect(() => {
        const loadUsersMail = async () => {        
            await axios.get(`http://localhost:9504/loginmanager/${localStorage.getItem('jwtToken')}`)
                .then(res => {
                    console.log(res.data)
                    axios.get(`http://localhost:9520/manager/${res.data}`)
                        .then(response => {
                            setmanager(response.data)
                            console.log(response.data);
                             <NavbarAfterManagerlogin mail = {res.data}/>
                             return res.data;
                        })
                       
                    })
                .catch(error => {
                    console.log(error);
                });
    
    
        };
        loadUsersMail();
         
    }, []); 


    return (
        <div>
           
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
           
                {/* <Link type="button" className="btn btn-primary me-left" to={'/assignedEmployessOfManager'}>Home</Link> */}
                <Link type="button" className="btn btn-otline mx-2 me-left" style={{ color: 'white' }} to={'/assigntask'}>AssignTask</Link>
                <Link type="button" className="btn btn-outline mx-2 me-left" style={{ color: 'white' }} to={'/leavesundermanager'}>CheckLeaves</Link>

                <div className="container-fluid">
                    <a className="navbar-brand mx-auto">
                        Employee Management Portal {props.mailId}
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


                    <DropdownButton title = "Manager" style={{ color: 'black' }} className="custom-dropdown-button">
                        
                        <Dropdown.Item >
                            <Link to="/assignedEmployessOfManager">
                                Home
                            </Link>
                        </Dropdown.Item>

                        <Dropdown.Item >
                            <Link to="/manager">
                                Logout
                            </Link>
                        </Dropdown.Item>
                    </DropdownButton>



                    {/* <Link type="button" className="btn btn-primary" > Logout </Link> */}



                </div>

            </nav>

        </div>
    )
}

export default NavbarAfterManagerlogin