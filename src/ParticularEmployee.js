import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import SimpleNavbar from './SimpleNavbar';
import LeaveNavbar from './LeaveNavbar';
import { isExpired } from 'react-jwt';

function ParticularEmployee() {
  if(isExpired(localStorage.getItem('jwtToken'))){
    alert("Session Timeout. Please  Login");
    window.location.href = "/employee";
}

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

   
    return (

      <div>  
        <LeaveNavbar/>
    <div className="container">
    
    <div className="row">
      <div className="col-md-6 offset-md-3 border rounded p-6 mt-2 shadow">
        <h2 className="text-center m-4">Employee Details</h2>
        <div className="card">
          <div className="card-header">
            {/* Details of employee : {employee.employeeName} */}
            <ul className="list-group list-group-flush">

            <li className="list-group-item">
                <b>Id :</b>
                {employee.employeeId}
              </li>


              

              <li className="list-group-item">
                <b>Manager mail :</b>
                {employee.mail}
              </li>



              <li className="list-group-item">
                <b>Employee Mail :</b>
                {employee.employeeMail}
              </li>

              <li className="list-group-item">
                <b>Name :</b>
                {employee.employeeName}
              </li>


              <li className="list-group-item">
                <b>Department :</b>
                {employee.employeeDepartment}
              </li>


              <li className="list-group-item">
                <b>Role :</b>
                {employee.employeeRole}
              </li>

              <li className="list-group-item">
                <b>Mobile :</b>
                {employee.employeeMobile}
              </li>

              <li className="list-group-item">
                <b>Address    : </b>
                {employee.address}
              </li>

              <li className="list-group-item">
                <b>Gender :</b>
                {employee.employeeGender}
              </li>


               


            </ul>
          </div>
        </div>
        
        <Link className = "btn btn-primary my-2" to ={`/updateDetails/${employee.employeeMail}`}>Edit Details</Link>
      </div>
    </div>
  </div>
  </div>

);


 
    

  


}

export default ParticularEmployee