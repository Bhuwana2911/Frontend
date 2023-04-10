import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import Navbar1 from './Navbar1';
import { isExpired } from 'react-jwt';

function AddManager() {

    if(isExpired(localStorage.getItem('jwtToken'))){
        alert("Session Timeout. Please  Login");
        window.location.href = "/admin"
    }

    const [isvalidform, setisvalidform] = useState(false);
    const [errors, seterrors] = useState({});

    const [mail, setmail] = useState('');
    const [mid, setmid] = useState('');
    const [mname, setmname] = useState('');
    const [mrole, setmrole] = useState('');
    const [password, setpassword] = useState('');


    


    const handleSubmit = async (e) => {
        e.preventDefault();
         if(isvalidform){
            console.log('submitting form', {mid,mail});
          }
        await axios.post(`http://localhost:9500/manager/setManager`,
            {
                "mail": mail,
                "mid": mid,
                "mname": mname,
                "mrole": mrole,
                "password": password,

            }).then(res => {
                console.log(res.data)
                if (res.status === 400) {
                    alert(res.data)
                }
               else{
                    alert("Submitted successfully");
                    setmail("");
                    setmid("");
                    setmname("");
                    setmrole("");
                    setpassword("");
                    setisvalidform(false);
                }
            })
            .catch(error => {
                console.log(error)
            })

            
    }

    // function validPassword(password){
    //     if(password.length > 6)
    //         return true;
    //     else{
    //         errors.password = "Password 6 chars"
    //         return false;
    //     }
            
    // }

    const validationForm = () => {
        const errors = {};
        if(!mail){
            errors.mail = "Enter mail";
        }  
        else if(!/\S+@\S+.\S+\S+/.test(mail)){
            errors.mail = "Enter valid mail";
        }  
        
         if(!mid){
              errors.mid="Enter manager id";
         }
         if(!mname){
            errors.mname="Enter manager name ";
       }
       if(!mrole){
        errors.mrole="Enter manager role";
       }
       
      if(!password){
        errors.password="Enter manager password";
      }
       else if(password.length <= 6){
        errors.password = "password should be minimum of 6 characters"
      }

        seterrors(errors);
        setisvalidform(Object.keys(errors).length === 0);
    }

    const handleInput1 = (e) => {
        setmail(e.target.value);
    }

    const handleInput2 = (e) => {
        setmid(e.target.value);
    }

    const handleInput3 = (e) => {
        setmname(e.target.value);
    }

    const handleInput4 = (e) => {
        setmrole(e.target.value);
    }
    const handleInput5 = (e) => {
        setpassword(e.target.value);
        // setisvalidform(validPassword(e.target.value));
    }

    return (
        <div>
            <Navbar1 />
            <div style={{padding:'20px'}} className="container">

                <div className="row">
                    <div style={{backgroundColor:"#E8EAF6"}} className="col-md-6 offset-md-3 border rounded p-4 mt-3 shadow">
                        <h2 className="text-center m-4"> Register Manager</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor='mail' className="col-sm-3 col-form-label"> Mail </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"email"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter manager mail"
                                        name="mail"
                                        value={mail}
                                        required
                                        onChange={handleInput1}
                                        
                                         />
                                        {errors.mail && <div style={{color:'red'}}> <p>*{errors.mail}</p></div>}
                                        
                                        <br/>
                                        
                                </div>
                                

                                <label htmlFor='mid' className="col-sm-3 col-form-label"> Id </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter manager id"
                                        name="mid"
                                        value={mid}
                                        onChange={handleInput2}
                                        required
                                         />
                                        {errors.mid && <div style={{color:'red'}}> <p>*{errors.mid}</p></div>}
                                        <br/>
                                        
                                </div>

                                <label htmlFor='mname' className="col-sm-3 col-form-label">Name </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter manager name"
                                        name="mname"
                                        value={mname}
                                        onChange={handleInput3}
                                        required
                                         />
                                        {errors.mname && <div style={{color:'red'}}> <p>*{errors.mname}</p></div>}
                                         <br/>
                                </div>




                                <label htmlFor='mrole' className="col-sm-3 col-form-label"> Role </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter manager role"
                                        name="mrole"
                                        value={mrole}
                                        onChange={handleInput4}
                                        required
                                         />

{errors.mrole && <div style={{color:'red'}}> <p>*{errors.mrole}</p></div>}
                                         <br/>
                                </div>



                                <label htmlFor='password' className="col-sm-3 col-form-label"> Password </label>
                                <div className="col-sm-8">
                                    <input
                                        type={"password"}
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder="Enter manager password"
                                        name="password"
                                        value={password}
                                        onChange={handleInput5}
                                        required
                                         />
                                        {errors.password && <div style={{color:'red'}}> <p>*{errors.password}</p></div>}
                                        {/* {isvalidform ? <p>valid</p> : <p>Not valid</p>} */}

                                         <br/>
                                </div>

                            </div>


                            <button type="submit" onClick={validationForm} className="btn btn-outline-primary mx-2"> Submit </button>
                        </form>


                       
                    </div>



                </div>

            </div >
        </div>
    )
}

export default AddManager