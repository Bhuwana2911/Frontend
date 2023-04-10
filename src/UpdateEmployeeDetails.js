import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import LeaveNavbar from './LeaveNavbar';
import { isExpired } from 'react-jwt';

function UpdateEmployeeDetails(props) {
   
    if(isExpired(localStorage.getItem('jwtToken'))){
        alert("Session Timeout. Please  Login");
        console.log("No updation")
        window.location.href = "/employee";
    }
  
    const [isvalidform, setisvalidform] = useState(false);
    const [errors, seterrors] = useState({});

    const {employeeMail} = useParams();
    const navigate = useNavigate();


    const [updateemployee, setupdateemployee] = useState({
        employeeName: "",
        employeeMobile: "",
        employeeGender: "",
        address: "",
        employeePassword: "",
        // employeeMobile:"",
        // employeeMail:"",
        
        
    });

    useEffect(() => {
        const loadUsers = async () => {
            const result = await axios.get(`http://localhost:9502/viewEmployee/view/${employeeMail}`);
            setupdateemployee(result);
       }
        loadUsers();
    }, 
    []);

 
   
    const { employeeName, employeeMobile, employeeGender, address, employeePassword } = updateemployee;


    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setupdateemployee({
            ...updateemployee, [name]: value
        });
        }  



        const validationForm = () => {
            const errors = {};
            if(!employeeName){
                errors.employeeName = "Enter your name";
            }    
             if(!employeeMobile){
                  errors.employeeMobile="Enter your name";
             }
             else if(employeeMobile.length < 10 || employeeMobile.length > 10){
                //errors.password = "mobile number should be 10 charaters long";
                alert("mobile number should be 10 charaters long");
              }
             if(!employeeGender){
                errors.employeeGender="Enter your mail";
           }
           if(!address){
            errors.address="Enter your department";
           }
          
          if(!employeePassword){
            errors.employeePassword="Enter yourPassword";
          }
          else if(employeePassword.length <= 6){
            //errors.employeePassword = "password should be minimum of 6 characters"
            alert("password should be minimum of 6 characters");
          }
        
            seterrors(errors);
            setisvalidform(Object.keys(errors).length === 0);
        }

    
           

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isvalidform){
            console.log('submitting form', {employeeName,employeeMail});
          }
    
        console.log("hi");
        console.log(updateemployee);
        const result = await axios.put(`http://localhost:9502/updateEmployee/${employeeMail}`,updateemployee);
        navigate('/particularEmployee')
    }



      return (
        <div>
            <LeaveNavbar />
            <div style={{padding:'25px'}} className="container" >
                <div className="row">
                    <div style={{backgroundColor:"#E8EAF6"}} className="col-md-6 offset-md-3 border rounded p-4 mt-3 shadow">
                        <h2 className="text-center m-4"> Edit Employee Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group row">

                            <label htmlFor='employeeMail' className="col-sm-3 col-form-label"> Employee Mail </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"email"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter your password"
                                        name="employeeMail"
                                        value={employeeMail}
                                        //onChange={handleInput} 
                                        //required
                                        />
                                        {/* {errors.employeePassword && <div style={{color:'red'}}> <p>*{errors.employeePassword}</p></div>} */}
                                    <br />
                                </div>


                                <label htmlFor='employeeName' className="col-sm-3 col-form-label"> Name </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter your Name"
                                        name="employeeName"
                                        value={employeeName}
                                        onChange={handleInput} 
                                        required
                                        />
                                        {errors.employeeName && <div style={{color:'red'}}> <p>*{errors.employeeName}</p></div>}
                                    <br />
                                </div>

                                <label htmlFor='employeeMobile' className="col-sm-3 col-form-label"> Mobile </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter your mobile"
                                        name="employeeMobile"
                                        value={employeeMobile}
                                        onChange={handleInput} 
                                        required
                                        />
                                        {errors.employeeMobile && <div style={{color:'red'}}> <p>*{errors.employeeMobile}</p></div>}
                                    <br />
                                </div>


                                <label htmlFor='employeeGender' className="col-sm-3 col-form-label"> Gender </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter your gender"
                                        name="employeeGender"
                                        value={employeeGender}
                                        onChange={handleInput} 
                                        required
                                        />
                                        {errors.employeeGender && <div style={{color:'red'}}> <p>*{errors.employeeGender}</p></div>}
                                    <br />
                                </div>



                                <label htmlFor='address' className="col-sm-3 col-form-label"> Address </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter your address"
                                        name="address"
                                        value={address}
                                        onChange={handleInput} 
                                        required
                                        />
                                        {errors.address && <div style={{color:'red'}}> <p>*{errors.address}</p></div>}
                                    <br />
                                </div>

                                <label htmlFor='employeePassword' className="col-sm-3 col-form-label"> Password </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"password"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter your password"
                                        name="employeePassword"
                                        value={employeePassword}
                                        onChange={handleInput} 
                                        required
                                        />
                                        {errors.employeePassword && <div style={{color:'red'}}> <p>*{errors.employeePassword}</p></div>}
                                    <br />
                                </div>



                               

                            </div>


                            {/* <button type="submit" className="btn btn-outline-primary mx-3" > Submit </button> */}
                            <button type="submit" onClick={validationForm} className="btn btn-outline-primary mx-2" > Submit </button>

                        </form>
                    </div>



                </div>

            </div >



        </div>

    )


    }



export default UpdateEmployeeDetails