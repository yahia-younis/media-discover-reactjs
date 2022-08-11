import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Movie from './components/Movie/Movie';
import Navbar from './components/Navbar/Navbar';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Signin from './components/signin/Signin';
import Signup from './components/Sginup/Signup';
import PageNotFound from './components/PageNotFound/PageNotFound';
import jwtDecode from 'jwt-decode';
import $ from "jquery";
import { useState, useEffect } from 'react';
import Tvshow from './components/Tvshow/Tvshow';
import People from './components/people/People';
import MovieDetalis from './components/MovieDetalis/MovieDetalis';
import TvDetalis from './components/TvDetalis/TvDetalis';
import PeopleDetalis from './components/PeopleDetalis/PeopleDetalis';

export default function App () {
  // function to convert password input to text 
  function convertpassword () {
    let input = $("#password-convert").parent(".password-box").find("input");
    if (input.attr("type") === "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
    $("#password-convert").toggleClass("fa-eye-slash fa-eye");
  }
  
  const [userinfo, setuserinfo] = useState(null)
  let navigatem = useNavigate();
  useEffect(()=>{
    if (localStorage.getItem("userToken") != null) {
      saveUserData ()
    }
  },[navigatem])

  function saveUserData () {
    let token = localStorage.getItem("userToken");
    let decode = jwtDecode(token)
    setuserinfo(decode);
  }

  function ProdectData ({children}) {
    if (localStorage.getItem("userToken") == null ) {
      return <Navigate to="/Signin"/>
    } else {
      return children;
    }
  }

  function ProdectRegister ({children}) {
    if (localStorage.getItem("userToken") != null) {
      return <Navigate to='/movie/popular'/>
    } else {
      return children;
    }
  }

  function signOut () {
    localStorage.removeItem("userToken");
    localStorage.removeItem("currentpage");
    setuserinfo(null)
    navigatem("/")
  }

  return (
    <>
      <Navbar userinfo={userinfo} signOut={signOut}/>
      <Routes>
        <Route path='/' element={ <ProdectRegister> <WelcomePage/> </ProdectRegister> } />
        <Route path='movie' element={ <ProdectData><Movie/></ProdectData>}>
          <Route path=':type' element={ <ProdectData><Movie/></ProdectData>}/>
        </Route>
        <Route path='tvshow' element={ <ProdectData><Tvshow/></ProdectData>}>
          <Route path=':type' element={ <ProdectData><Tvshow/></ProdectData>}/>
        </Route>
        <Route path='people' element={ <ProdectData><People/></ProdectData>}>
          <Route path=':type' element={ <ProdectData><People/></ProdectData>}/>
        </Route>
        <Route path='moviedetalis' element={ <ProdectData><MovieDetalis/></ProdectData>} >
          <Route path=':id' element={ <ProdectData><MovieDetalis/></ProdectData>}/>
        </Route>
        <Route path='TvDetalis' element={ <ProdectData><TvDetalis/></ProdectData>} >
          <Route path=':id' element={ <ProdectData><TvDetalis/></ProdectData>}/>
        </Route>
        <Route path='PeopleDetalis' element={ <ProdectData><PeopleDetalis/></ProdectData>} >
          <Route path=':id' element={ <ProdectData><PeopleDetalis/></ProdectData>}/>
        </Route>
        <Route path='signin' element={ <ProdectRegister><Signin userData = {saveUserData} convertpassword={convertpassword}/></ProdectRegister>} />
        <Route path='signup' element={ <ProdectRegister><Signup convertpassword={convertpassword}/></ProdectRegister> } />
        <Route path='*' element={ <PageNotFound/> } />
      </Routes>
    </>
  );
}