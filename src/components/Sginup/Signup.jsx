/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi';

export default function Signup(props) {
  useEffect(() => {
    document.querySelector(".navbar .container").classList.remove('max-w-100');
  }, [])
  const [errorlist , seterrorlist] = useState([])
  const [loading , setloading] = useState(false)
  const [errormessage , seterror] = useState(null)
  const [user, setuser] = useState({
    first_name: "",
    last_name:"",
    email: "",
    password: "",
    age: 0
  })
  
  let Navigate = useNavigate();
  function getuserdata (e) {
    let myuser = {...user};
    myuser[e.target.name] = e.target.value;
    setuser(myuser)
  }

  async function submitform (e) {
    e.preventDefault();
    let validtereuslt = vailddata();
    if (validtereuslt.error == null) {
      setloading(true)
      let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signup', user)
      if (data.message === 'success') {
        Navigate("/signin");
        setloading(false)
      } else {
        if (data.message === "citizen validation failed: email: email already registered")
        seterror(data.errors.email.message);
        setloading(false)
      }
    } else {
      seterrorlist(validtereuslt.error.details)
    }
  }

  function vailddata () {
    let vailduser = Joi.object({
      first_name: Joi.string().min(3).max(10).required(),
      last_name: Joi.string().min(3).max(10).required(),
      email: Joi.string().email({tlds: ["net", "com", "org", "eg", "yahoo"]}).required(),
      // This regex will enforce these rules:
          // At least one upper case English letter, (?=.*?[A-Z])
          // At least one lower case English letter, (?=.*?[a-z])
          // At least one digit, (?=.*?[0-9])
          // At least one special character, (?=.*?[#?!@$%^&*-])
          // Minimum eight in length .{8,} (with the anchors)
      password: Joi.string().pattern( new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$") ),
      age: Joi.number().min(16).max(70).required()
    });
    return vailduser.validate(user, {abortEarly:false}); 
  }

  return (
    <>
      <div className='sign-comp'>
      <div className="overlay"></div>
      <div className="d-flex justify-content-center align-items-center sign">
        <div className="sign-box text-center">
            <h5 className='fw-bold'>create your account</h5>
            <form className='mt-4' onSubmit={submitform}>
              <input onChange={getuserdata} id='user_firstname' type="text" name='first_name' placeholder='first name' className='form-control mb-3'/>
              {errorlist.map((e, i) => { 
                if (e.path[0] === 'first_name') {
                  return <p className='text-danger mb-3 text-start fs-sm' key={i}> * {e.message} </p> 
                }} 
              )}
              <input onChange={getuserdata} id='user_lastname' type="text" name='last_name' placeholder='last name' className='form-control mb-3'/>
              {errorlist.map((e, i) => { 
                if (e.path[0] === 'last_name') {
                  return <p className='text-danger mb-3 text-start fs-sm' key={i}> * {e.message} </p> 
                }} 
              )}
              <input onChange={getuserdata} id='user_age' type="number" name='age' placeholder='age' className='form-control mb-3'/>
              {errorlist.map((e, i) => { 
                if (e.path[0] === 'age') {
                  return <p className='text-danger mb-3 text-start fs-sm' key={i}> * {e.message} </p> 
                }} 
              )}
              <input onChange={getuserdata} id='user_email' type="text" name='email' placeholder='Enter Email' className='form-control mb-3'/>
              {errorlist.map((e, i) => { 
                if (e.path[0] === 'email') {
                  return <p className='text-danger mb-3 text-start fs-sm' key={i}> * {e.message} </p> 
                }} 
              )}
              <div className="password-box position-relative">
                <input onChange={getuserdata} id='user_password' type="password" name='password' placeholder='password' className='form-control'/>
                <i id='password-convert' onClick={props.convertpassword} className="fa-solid fa-eye-slash"></i>
              </div>
              {errorlist.map((e, i) => { 
                if (e.path[0] === 'password') {
                  return <p className='text-danger my-3 text-start fs-sm' key={i}> 
                    password must be Minimum eight character <br /> * at least one upper case, <br /> * at least one number and <br /> * at least one special character
                  </p> 
                }} 
              )}
              {errormessage ? <div className="alert alert-danger mt-3 p-2">{errormessage}</div> : ""}
              <button id='btn_signin' className='btn-sign mt-3'> {loading ? <i className='fa-solid fa-spinner fa-spin'></i> : "Sign up" } </button>
              <p className='h-account fs-sm mt-4 mb-0'>already have account ? <Link className='fw-bold' to="/signin"> sign in</Link> </p>
            </form>
        </div>
      </div>
    </div>
    </>
  )
}
