import React, { useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavbarAfterManagerlogin from './NavbarAfterManagerlogin';
import { isExpired } from 'react-jwt';

function TaskAssigning() {
    if(isExpired(localStorage.getItem('jwtToken'))){
        alert("Session Timeout. Please  Login");
        window.location.href = "/manager";
    }

     const [isvalidform, setisvalidform] = useState(false);
     const [errors, seterrors] = useState({});



    const [taskassign, settaskassign] = useState({
        deadline : "",
        description : "",
        employeeMail : "",
        mail : "",
        eprogress : "",
        submissiondate : ""
    })

    const {deadline, description, employeeMail, mail ,eprogress, submissiondate} = taskassign
    

 
    function handleSubmit(e) {
        e.preventDefault();  
         if(isvalidform){
            console.log('submitting form', {employeeMail});
          }    
        axios.post("http://localhost:9507/task/assign",taskassign)
        .then(res => {
                console.log(res.data)
                
                if (res.status === 400) {
                    alert(res.data)
                }
                else{
                    //alert("Submitted successfully")
                    settaskassign({
                        deadline : "",
                        description : "",
                        employeeMail : "",
                        mail : "",
                        eprogress : "",
                        submissiondate : ""
                    })

                }
            })

            .catch(error => {
                console.log(error)
            })
    }

     const validationForm = () => {
        const errors = {};
        if(!employeeMail){
            errors.employeeMail = "Enter employee mail";
        }
        else if(!/\S+@\S+\.\S+/.test(employeeMail)){
            errors.employeeMail = "Enter valid mail";
        }

         if(!mail){
              errors.mail="Enter your mail";
         }
         else if(!/\S+@\S+\.\S+/.test(mail)){
            errors.mail = "Enter valid mail";
        }

         if(!description){
            errors.description="Enter task desciption ";
       }
       if(!deadline){
        errors.deadline="Enter task deadline";
       }

        seterrors(errors);
        setisvalidform(Object.keys(errors).length === 0);
    }


    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        settaskassign({
            ...taskassign, [name] : value
        })
    }


    

    return (
        <div>
            <NavbarAfterManagerlogin/>
            <div style={{padding:'30px'}} className="container">

                <div className="row">
                    <div style={{backgroundColor:"#E8EAF6"}} className="col-md-6 offset-md-3 border rounded p-4 mt-3 shadow">
                        <h2 className="text-center m-4"> Assiging task</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor='employeeMail' className="col-sm-3 col-form-label"> To </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter employeeMail"
                                        name="employeeMail"
                                        value={employeeMail}
                                        onChange={handleInput} 
                                        required
                                        />
                                        {errors.employeeMail && <div style={{color:'red'}}> <p>*{errors.employeeMail}</p></div>}
                                    <br />
                                </div>

                                <label htmlFor='description' className="col-sm-3 col-form-label"> Title </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="task title"
                                        name="description"
                                        value={description}
                                        onChange={handleInput}
                                        required
                                         />
                                        {errors.description && <div style={{color:'red'}}> <p>*{errors.description}</p></div>}
                                    <br />
                                </div>

                                <label htmlFor='deadline' className="col-sm-3 col-form-label"> Deadline </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"Date"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter deadline for task"
                                        name="deadline"
                                        value={deadline}
                                        onChange={handleInput}
                                        required
                                         />
                                        {errors.deadline && <div style={{color:'red'}}> <p>*{errors.deadline}</p></div>}
                                    <br />
                                </div>



                                <label htmlFor='mail' className="col-sm-3 col-form-label"> From</label>
                                <div className="col-sm-8">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter manager mail"
                                        name="mail"
                                        value={mail}
                                        onChange={handleInput}
                                        required />
                                        {errors.mail && <div style={{color:'red'}}> <p>*{errors.mail}</p></div>}
                                    <br />
                                </div>

                                {/* <label htmlFor='tstatus' className="col-sm-3 col-form-label"> Status </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter task status"
                                        name="tstatus"
                                        value={tstatus}
                                        onChange={handleInput} />
                                    <br />
                                </div> */}

                                {/* <label htmlFor='eprogress' className="col-sm-3 col-form-label"> EmployeeProgress </label>
                                <div className="col-sm-10">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="progress by employee"
                                        name="eprogress"
                                        value={eprogress}
                                        onChange={handleInput} />
                                    <br />
                                </div> */}

                                
                                {/* <label htmlFor='submissiondate' className="col-sm-3 col-form-label"> SubmissionDate </label>
                                <div className="col-sm-10">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        // placeholder="Enter Role"
                                        name="submissiondate"
                                        value={submissiondate}
                                        // onChange={handleInput}
                                        />
                                    <br />
                                </div> */}

                            </div>


                            <button type="submit" onClick={validationForm} className="btn btn-outline-primary mx-2" > Submit </button>
                            {/* <Link className="btn btn-outline-danger mx-2" to="/"> Cancel </Link> */}

                        </form>
                    </div>



                </div>

            </div >
        </div>
    )

}

export default TaskAssigning