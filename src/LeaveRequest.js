import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SimpleNavbar from './SimpleNavbar'
import LeaveRequestNavbar from './LeaveRequestNavbar'
import LeaveNavbar from './LeaveNavbar'
import { isExpired } from 'react-jwt'

function LeaveRequest() {
    

    // const [employeeId, setemployeeId] = useState('');
    // const [employeeName, setemployeeName] = useState('');
    // const [employeeMail, setemployeeMail] = useState('');
    // const [employeeDepartment, setemployeeDepartment] = useState('');
    // const [employeeRole, setemployeeRole] = useState('');

    const [isvalidform, setisvalidform] = useState(false);
    const [errors, seterrors] = useState({});


    const [leaverequest, setleaverequest] = useState({
        mail: "",
        employeeMail: "",
        reason: "",
        sdate: "",
        edate: ""
    })

    const navigate = useNavigate();
    const { mail, employeeMail, reason, sdate, edate } = leaverequest

    const validationForm = () => {
        const errors = {};
        if (!employeeMail) {
            errors.employeeMail = "Enter your mail";
        }
        else if (!/\S+@\S+\.\S+/.test(employeeMail)) {
            errors.employeeMail = "Enter valid mail";
        }

        if (!mail) {
            errors.mail = "Enter your manager mail";
        }
        else if (!/\S+@\S+\.\S+/.test(mail)) {
            errors.mail = "Enter valid mail";
        }
        if (!reason) {
            errors.reason = "Enter leave reason";
        }
        if (sdate > edate) {
             //errors.edate = "End date should be greater than start date"
            alert("start date should be less than end date");
        }
        if (!sdate) {
            errors.sdate = "Enter start date of leave";
        }
        if (!edate) {
            errors.edate = "Enter end date of leave";
        }
      
        seterrors(errors);
        setisvalidform(Object.keys(errors).length === 0);
    }

    
    if (isExpired(localStorage.getItem('jwtToken'))) {
        alert("Session Timeout. Please  Login");
        window.location.href = "/emloyee";
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isvalidform) {
            console.log('submitting form', { employeeMail });
        }
        await axios.post("http://localhost:9505/leave/request", leaverequest)
            .then(res => {
                console.log(res.data)
                if (res.status === 400) {
                    alert(res.data)
                }
                // window.location.href = '/viewEmployees';
                else {
                    setleaverequest({
                        mail: "",
                        employeeMail: "",
                        reason: "",
                        sdate: "",
                        edate: ""
                    })

                }
            })
            .catch(error => {
                console.log(error)
            })
        //navigate("/allemployeeleaves")
    }


    

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setleaverequest({
            ...leaverequest, [name]: value
        })
    }

    return (
        <div>
            <LeaveNavbar />
            <div style={{ padding: '20px' }} className="container">
                <div className="row">
                    <div style={{ backgroundColor: "#E8EAF6" }} className="col-md-6 offset-md-3 border rounded p-4 mt-3 shadow">
                        <h2 className="text-center m-4"> Leave Request Form</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor='mail' className="col-sm-3 col-form-label"> To </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"email"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter manager mail"
                                        name="mail"
                                        value={mail}
                                        onChange={handleInput}
                                        required
                                         />
                                    {errors.mail && <div style={{ color: 'red' }}> <p>*{errors.mail}</p></div>}
                                    <br />
                                </div>

                                <label htmlFor='employeeMail' className="col-sm-3 col-form-label"> From </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"email"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter your mail"
                                        name="employeeMail"
                                        value={employeeMail}
                                        onChange={handleInput}
                                        required
                                         />
                                    {errors.employeeMail && <div style={{ color: 'red' }}> <p>*{errors.employeeMail}</p></div>}
                                    <br />
                                </div>

                                <label htmlFor='reason' className="col-sm-3 col-form-label"> Reason </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter reason for leave"
                                        name="reason"
                                        value={reason}
                                        onChange={handleInput}
                                        required
                                         />
                                    {errors.reason && <div style={{ color: 'red' }}> <p>*{errors.reason}</p></div>}
                                    <br />
                                </div>



                                <label htmlFor='sdate' className="col-sm-3 col-form-label"> start date </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"date"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter start date"
                                        name="sdate"
                                        value={sdate}
                                        onChange={handleInput}
                                        required
                                         />
                                    {errors.sdate && <div style={{ color: 'red' }}> <p>*{errors.sdate}</p></div>}
                                    <br />
                                </div>

                                <label htmlFor='edate' className="col-sm-3 col-form-label"> End date </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"date"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter Role"
                                        name="edate"
                                        value={edate}
                                        onChange={handleInput}
                                        required
                                         />
                                    {errors.edate && <div style={{ color: 'red' }}> <p>*{errors.edate}</p></div>}
                                    <br />
                                </div>

                            </div>


                            <button type="submit" onClick={validationForm} className="btn btn-outline-primary mx-2" to={'/leaverequest'}> Submit </button>
                            {/* <Link className="btn btn-outline-danger mx-2" to="/"> Cancel </Link> */}

                        </form>
                    </div>



                </div>

            </div >
        </div>
    )

}

export default LeaveRequest