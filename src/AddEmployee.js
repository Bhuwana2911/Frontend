import { useState } from 'react'
import Navbar1 from './Navbar1'
import axios from 'axios';
import React from 'react'
import {isExpired} from 'react-jwt';


function AddEmployee() {
    if(isExpired(localStorage.getItem('jwtToken'))){
        alert("Session Timeout. Please  Login");
        window.location.href = "/admin"
    }


    const [isvalidform, setisvalidform] = useState(false);
    const [errors, seterrors] = useState({});
    const [submitted, setsubmitted] = useState(false);

    const [employeeId, setemployeeId] = useState('');
    const [employeeName, setemployeeName] = useState('');
    const [employeeMail, setemployeeMail] = useState('');
    const [employeeDepartment, setemployeeDepartment] = useState('');
    const [employeeRole, setemployeeRole] = useState('');
    const [employeePassword, setemployeePassword] = useState('');
    const [mail, setmail] = useState('');


    
    
   
    
    function handleSubmit(e) {
        e.preventDefault();
        if(isvalidform){
            console.log('submitting form', {employeeName,employeeMail});
        }
        axios.post("http://localhost:9500/employees/setEmployees",
            {
                "employeeId": employeeId,
                "employeeName": employeeName,
                "employeeMail": employeeMail,
                "employeeDepartment": employeeDepartment,
                "employeeRole": employeeRole,
                "employeePassword": "",
                "mail" : mail,

            }).then(res => {
                //console.log(res.data)
                if (res.status === 400) {
                    alert(res.data)
                }
                else{
                    alert("Submitted successfully");
                    setemployeeId("");
                    setemployeeName("");
                    setemployeeMail("");
                    setemployeeDepartment("");
                    setemployeeRole("");
                    setemployeePassword("");
                    setmail("");
                    setisvalidform(false);
                }
                //window.location.href = '/viewEmployees';
            })
            .catch(error => {
                console.log(error)
            })
            setsubmitted(true);
            
    }

        


    const validationForm = () => {
        const errors = {};
        if(!employeeId){
            errors.employeeId = "Enter id";
        }  
        if(!employeeMail){
            errors.employeeMail="Enter employee mail ";            
        }
        else if(!/\S+@\S+\.\S+/.test(employeeMail)){
            errors.employeeMail = "Enter valid mail";
        }

         if(!employeeName){
              errors.employeeName="Enter employee name";
         }
        
       if(!employeeDepartment){
        errors.employeeDepartment="Enter employee department";
       }
       if(!employeeRole){
        errors.employeeRole="Enter employee role";
      }
   
      if(!mail){
        errors.mail="Enter employee mail";
      } 
      else if(!/\S+@\S+\.\S+/.test(mail)){
        errors.mail = "Enter valid mail";
    }   
        seterrors(errors);
        setisvalidform(Object.keys(errors).length === 0);
    }

    const handleInput1 = (e) => {
        setemployeeId(e.target.value);

    }

    const handleInput2 = (e) => {
        setemployeeName(e.target.value);
    }

    const handleInput3 = (e) => {
        const emailValue = e.target.value;
        setemployeeMail(e.target.value);
      

    }

    const handleInput4 = (e) => {
        setemployeeDepartment(e.target.value);

    }
    const handleInput5 = (e) => {
        setemployeeRole(e.target.value);
    }

    const handleInput6 = (e) => {
        setmail(e.target.value);
    }


    // const resetForm = () => {
    //     setemployeeId("");
    //     setemployeeName("");
    //     setemployeeMail("");
    //     setemployeeDepartment("");
    //     setemployeeRole("");
    //     setemployeePassword("");
    //     setmail("");
    //     setisvalidform(false);
    //   };

    return (
        <div>
            <Navbar1></Navbar1>
            <div style={{padding:'5x'}} className="container">
                <div className="row">
                    <div style={{backgroundColor:"#E8EAF6"}} className="col-md-6 offset-md-3 border rounded p-4 mt-3 shadow">
                        <h2 className="text-center m-4"> Register Employee</h2>
                        {/* <div>
                            {submitted ? (
                                <div>Form submitted </div>
                                
                            ) : null}
                        </div> */}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor='employeeId' className="col-sm-3 col-form-label"> Id </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter employee Id"
                                        name="employeeId"
                                        value={employeeId}
                                        onChange={handleInput1} />
                                         {errors.employeeId && <div style={{color:'red'}}> <p>*{errors.employeeId}</p></div>}
                                    <br />
                                </div>

                                <label htmlFor='employeeMail' className="col-sm-3 col-form-label"> Employee Mail </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"email"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter employee Mail"
                                        name="employeeMail"
                                        value={employeeMail}
                                        onChange={handleInput3} />
                                        {errors.employeeMail && <div style={{color:'red'}}> <p>*{errors.employeeMail}</p></div>} 
                                         
                                    <br />
                                </div>

                                <label htmlFor='employeeName' className="col-sm-3 col-form-label"> Name </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter employee Name"
                                        name="employeeName"
                                        value={employeeName}
                                        onChange={handleInput2} />
                                         {errors.employeeName && <div style={{color:'red'}}> <p>*{errors.employeeName}</p></div>}
                                    <br />
                                </div>


                                <label htmlFor='employeeDepartment' className="col-sm-3 col-form-label"> Department </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter employee Department"
                                        name="employeeDepartment"
                                        value={employeeDepartment}
                                        onChange={handleInput4} />
                                         {errors.employeeDepartment && <div style={{color:'red'}}> <p>*{errors.employeeDepartment}</p></div>}
                                    <br />
                                </div>

                                <label htmlFor='employeeRole' className="col-sm-3 col-form-label"> Role </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter employee Role"
                                        name="employeeRole"
                                        value={employeeRole}
                                        onChange={handleInput5} />
                                         {errors.employeeRole && <div style={{color:'red'}}> <p>*{errors.employeeRole}</p></div>}
                                    <br />
                                </div>

                                <label htmlFor='mail' className="col-sm-3 col-form-label"> Manager mail </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"email"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter manager's mail"
                                        name="mail"
                                        value={mail}
                                        onChange={handleInput6} />
                                         {errors.mail && <div style={{color:'red'}}> <p>*{errors.mail}</p></div>}
                                    <br />
                                </div>

                            </div>


                            <button type="submit" onClick={validationForm} className="btn btn-outline-primary mx-3" > Submit </button>
                            {/* <button type="reset" onClick={resetForm} className="btn btn-outline-primary mx-3" > Reset </button> */}
                            {/* <Link className="btn btn-outline-danger mx-2" to="/"> Cancel </Link> */}

                        </form>
                    </div>



                </div>

            </div >
        </div>
    )
}

export default AddEmployee







