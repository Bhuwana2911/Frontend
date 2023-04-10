import React from 'react'
import Navbar1 from './Navbar1'
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ParticularEmployee from './ParticularEmployee';
import SimpleNavbar from './SimpleNavbar';
import { isExpired } from 'react-jwt';

function Employee() {  

//   if(isExpired(localStorage.getItem('jwtToken'))){
//     alert("Session Timeout. Please  Login");
//    // window.location.href("/admin")
// }

  const navigate = useNavigate();

  const [isvalidform, setisvalidform] = useState(false);
  const [errors, seterrors] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState("false");
  const [employee, setEmployee] = useState({
    employee_mail : "",
    password : ""
   })


   const {employee_mail, password} = employee; //destructing

   const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;    
    setEmployee({ ...employee, [name]: value });
  }

  const validationForm = () => {
    const errors = {};
    if(!employee_mail){
        errors.employee_mail = "Email is required";
    }
     if(!password){
          errors.password="password is required";
     }

    seterrors(errors);
    setisvalidform(Object.keys(errors).length === 0);
}





  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isvalidform){
      console.log('submitting form', {employee_mail,password});
    }
   // try {
      const response = await axios.post(`http://localhost:9501/token`,
        { employee_mail, password }).then(res => {
          localStorage.setItem("jwtToken", res.data.jwtToken);
          console.log(res.data.jwtToken)
          setIsLoggedIn(true);
          console.log(isLoggedIn);

          if (res === 403) {            
            alert("Enter valid credentials..");
          }
          else {           
            alert( "successfully logged in");
          }
          window.location.href = '/particularEmployee';
        })
      //console.log(response);

    //}
    .catch ((error) => {
      console.error(error);
      if(error.respone && error.response.status === 403){
          alert("Incorrect");
      }
    }
    );
    console.log(response);
    
  }
  return(

  <div>
  <SimpleNavbar></SimpleNavbar>
  {/* {errorMessage && <p> {errorMessage}</p>} */}
  <div className="container" style={{padding:'80px', width:'1500px'}}>

    <div className="row">
      <div style={{backgroundColor:"#E8EAF6"}} className="col-md-6 offset-md-3 border rounded p-4 mt-3 shadow">
        <h2 className="text-center m-4"> Employee Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor='employee_mail' className="col-sm-3 col-form-label"> Mail </label>
            <div className="col-sm-8">
            <input
              type={"email"}
              className="form-control"
              autoComplete='off'
              placeholder="Enter your mail"
              name="employee_mail"
              //required
              value={employee_mail}
              onChange={handleInput}
              required
            
            />
            {errors.employee_mail && <div style={{color:'red'}}> <p>*{errors.employee_mail}</p></div>}
            <br></br>
            </div>

            <label htmlFor='password' className="col-sm-3 col-form-label"> Password </label>
            <div className="col-sm-8">
            <input
              type={"password"}
              className="form-control"
              autoComplete='off'
              placeholder="Enter your password"
              name="password"
              // required
              value={password}
              onChange={handleInput}
              required
            />
            {errors.password && <div style={{color:'red'}}> <p>*{errors.password}</p></div>}
            <br></br>
            </div>
          </div>
          {/* <ParticularEmployee mail = {employee_mail}> </ParticularEmployee> */}
          <button type="submit" onClick={validationForm}className="btn btn-outline-primary mx-2" to="/"> Log in </button>
        </form>
      </div>
    </div>
  </div>  
</div>


  )

}

export default Employee