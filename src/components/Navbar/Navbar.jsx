import React from 'react'
import logo from '../../asstes/logo.png';
import { Link, NavLink } from 'react-router-dom';
import useravatar from '../../asstes/user_avatar.png';

export default function Navbar({userinfo, signOut}) {

  // toggle between class on navbar when scroll 
  document.addEventListener('scroll', function() {
    let navbar = document.querySelector(".navbar");
    if (window.pageYOffset > 50) {
      navbar.classList.add('nav_c');
    } else {
      navbar.classList.remove('nav_c');
    }
  });
  

  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-lg bg-transparent py-2 fixed-top">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img className='w-100' src={logo} alt="logo" />
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {(userinfo ? 
            <div className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item dropdown">
                <span className="nav-link active" data-bs-toggle="dropdown" aria-expanded="false">movies</span>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="movie/popular">popular</Link></li>
                  <li><Link className="dropdown-item" to="movie/now_playing">now playing</Link></li>
                  <li><Link className="dropdown-item" to="movie/upcoming">upcoming</Link></li>
                  <li><Link className="dropdown-item" to="movie/top_rated">top rated</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <span className="nav-link active" data-bs-toggle="dropdown" aria-expanded="false">tv show</span>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="tvshow/popular">popular</Link></li>
                  <li><Link className="dropdown-item" to="tvshow/airing_today">airing today</Link></li>
                  <li><Link className="dropdown-item" to="tvshow/on_the_air">on tv</Link></li>
                  <li><Link className="dropdown-item" to="tvshow/top_rated">top rated</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <span className="nav-link active" data-bs-toggle="dropdown" aria-expanded="false">people</span>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="people/popular">popular people</Link></li>
                </ul>
              </li>
            </div> : "" )}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              
              {(userinfo ? 
              <>
                <li className='p-2'> 
                <span> welcome {userinfo.first_name}</span> 
                </li>
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img className='useravater' src={useravatar} alt="useravater" />
                  </span>
                  <ul className="dropdown-menu text-center pb-0 overflow-hidden p-ddropdown">
                    <p className="dropdown-item fw-bold mb-0"> {userinfo.first_name + " " + userinfo.last_name} </p>
                    <li><button onClick={signOut} className="dropdown-item Sign-out">Sign out</button></li>
                  </ul>
                </li>
              </> :
              <>
                <li className="nav-item">
                  <NavLink className="nav-link active" to="Signin">sgin in</NavLink>
                </li>
                <li className="nav-item sginup-btn">
                  <NavLink className="nav-link text-white" to="signup">sign up</NavLink>
                </li>
              </> )}

            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
