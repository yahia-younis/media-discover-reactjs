import React, {useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery'
import  axios from 'axios';

export default function Signin (props) {

  useEffect(() => {
    document.querySelector(".navbar .container").classList.remove('max-w-100');
  }, [])
  
  const [loading , setloading] = useState(false)
  const [errormessage , seterror] = useState(null)
  const [user, setuser] = useState({
    email: "",
    password: "",
  })

  let Navigate = useNavigate();

  function getuserdata (e) {
    let myuser = {...user};
    myuser[e.target.name] = e.target.value;
    setuser(myuser)
  }

  async function submitform (e) {
    e.preventDefault();
    setloading(true)
    let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signin', user)
    if (data.message === 'success') {
      Navigate("/movie/popular");
      setloading(false)
      localStorage.setItem("userToken", data.token);
      props.userData();
      $(".navbar-collapse").removeClass("show")
    } else {
      seterror("email doesn't exist or incorrect password");
      setloading(false)
    }
  }


  return (
    <div className='sign-comp' onSubmit={submitform}>
      <div className="overlay"></div>
      <div className="d-flex justify-content-center align-items-center sign">
        <div className="sign-box text-center">
            <h5 className='fw-bold'>welcome back</h5>
            {errormessage ? <div className="alert alert-danger fs-sm mt-3 p-2">{errormessage}</div> : ""}
            <form className='mt-4'>
              <input onChange={getuserdata} id='user_email' type="text" name='email' placeholder='Enter Email' className='form-control mb-3'/>
              <div className="password-box position-relative">
                <input onChange={getuserdata} id='user_password' type="password" name='password' placeholder='password' className='form-control'/>
                <i onClick={props.convertpassword} id='password-convert' className="fa-solid fa-eye-slash"></i>
              </div>
              <button id='btn_signin' className='btn-sign mt-3'> {loading ? <i className='fa-solid fa-spinner fa-spin'></i> : "Sign in" } </button>
              <p className='h-account fs-sm mt-4 mb-0'>don't have an account ? <Link className='fw-bold' to="/signup"> sign up</Link> </p>
            </form>
        </div>
      </div>
    </div>
  )
}
