import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import axios from 'axios';
import logotext from '../../asstes/logo-text.png';
import $ from 'jquery'

export default function WelcomePage() {
  let settings = {
      mobileFirst:true,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 2,
      swipeToSlide: true,
      initialSlide:1,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            dots: true,
            arrows: false,
            slidesToShow: 4,
            slidesToScroll: 2,
            infinite: true,
          }
        },
        {
          breakpoint: 767,
          settings: {
            dots: true,
            arrows: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 575,
          settings: {
            dots: true,
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 440,
          settings: {
            dots: true,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          }
        }
      ],
    };

  let imgPath = "https://image.tmdb.org/t/p/w500/";
  const [popularmovie, setpopularmovie] = useState([])
  const [populartv, setpopulartv] = useState([])
  const [popularperson, setpopularperson] = useState([])

  const [loadingpopulaer_m, setloadingpopulaer_m] = useState(true)
  const [loadingpopulaer_tv, setloadingpopulaer_tv] = useState(true)
  const [loadingpopulaer_person, setloadingpopulaer_person] = useState(true)

  async function getdata(mediatype, mediaarray, reload_btn) {
    let { data } = await axios(`https://api.themoviedb.org/3/${mediatype}/popular?api_key=f708973a9ad44b00b93dd5ac49f93aa2&language=en-US&page=1`);
    mediaarray(data.results.splice(1, 10));
    reload_btn(false); 
  }

  useEffect(() => {
    getdata("movie", setpopularmovie, setloadingpopulaer_m);
    getdata("tv", setpopulartv, setloadingpopulaer_tv);
    getdata("person", setpopularperson, setloadingpopulaer_person);
    $(".scroll-mouse").on("click", function () {
      $([document.documentElement, document.body]).animate({
        scrollTop: ($(".body").offset().top - 120)
      }, 100, 'swing');
    });
    document.querySelector(".navbar .container").classList.remove('max-w-100');
  }, [])

  return (
    <>
      <div className="header">
        <div className="header-img">
          <div className="overlay"></div>
        </div>
        <div className="header-content">
          <div className="container">
            <div className="header-head">
              <h1 className='mb-0'>welcome</h1>
              <h4 className='my-3'>Millions of movies, TV shows and people to discover. Explore now.</h4>
            </div>
          </div>
          <div className="scroll-mouse">
            <div></div>
          </div>
        </div>
      </div>
      <div className='body mt-5'>
        <div className="container">

          <div className="content-box my-5">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className='fw-bold section-title m-0'>Movies</h3>
              <Link to="/signin" className='watch-more'> watch more <i className='fa-solid fa-arrow-alt-circle-right ms-2'></i> </Link>
            </div>
            <div className="mt-4">
              {loadingpopulaer_m ? <div className='text-center my-5 py-5'>
                <span className="loader"></span>
              </div> : "" }
              <Slider {...settings} className='row'>
                {popularmovie.map((e, i) => {
                  return <div key={i}>
                    <div className="movie mx-2 position-relative">
                      <Link to="/signin">
                        <div className="movie-img rounded-4 overflow-hidden">
                          <img src={`${imgPath}${e.poster_path}`} alt="moviephoto" className='w-100' />
                        </div>
                        <div className="piechart" style={{ 
                          animationDelay: `-${e.vote_average.toFixed(0)}0s`,
                          color: `${(e.vote_average.toFixed(0) < 4) ? "red": (e.vote_average.toFixed(0) < 7) ? "yellow": "#1FB46B"}`,
                          backgroundColor: `${(e.vote_average.toFixed(0) < 4) ? "#ff000027": (e.vote_average.toFixed(0) < 7) ? "#f2ee013b": "#1fb46c44"}`}}>
                          <div className="pie_content">
                            <span className="value"> {e.vote_average} </span>
                          </div>
                        </div>
                        <div className="movie-text my-3 ms-1">
                          <h6 className='fw-bold m-0'>{e.title}</h6>
                          <p className='text-muted fs-sm'>{e.release_date}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                })}
              </Slider>
            </div>
          </div>

          <hr/>
          <div className="content-box my-5">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className='fw-bold section-title m-0'>tv show</h3>
              <Link to="/signin" className='watch-more'> watch more <i className='fa-solid fa-arrow-alt-circle-right ms-2'></i> </Link>
            </div>
            <div className="mt-4">
              {loadingpopulaer_tv ? <div className='text-center my-5 py-5'>
                <span className="loader"></span>
              </div> : "" }
              <Slider {...settings} className='row'>
                {populartv.map((e, i) => {
                  return <div key={i}>
                    <div className="movie mx-2 position-relative">
                      <Link to="/signin">
                        <div className="movie-img rounded-4 overflow-hidden">
                          <img src={`${imgPath}${e.poster_path}`} alt="moviephoto" className='w-100' />
                        </div>
                        <div className="piechart" style={{ 
                          animationDelay: `-${e.vote_average.toFixed(0)}0s`,
                          color: `${(e.vote_average.toFixed(0) < 4) ? "red": (e.vote_average.toFixed(0) < 7) ? "yellow": "#1FB46B"}`,
                          backgroundColor: `${(e.vote_average.toFixed(0) < 4) ? "#ff000027": (e.vote_average.toFixed(0) < 7) ? "#f2ee013b": "#1fb46c44"}`}}>
                          <div className="pie_content">
                            <span className="value"> {e.vote_average} </span>
                          </div>
                        </div>
                        <div className="movie-text my-3 ms-1">
                          <h6 className='fw-bold m-0'>{e.name}</h6>
                          <p className='text-muted fs-sm'>{e.first_air_date}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                })}
              </Slider>
            </div>
          </div>
          <hr/>
          <div className="content-box my-5">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className='fw-bold section-title m-0'>people</h3>
              <Link to="/signin" className='watch-more'> watch more <i className='fa-solid fa-arrow-alt-circle-right ms-2'></i> </Link>
            </div>
            <div className="mt-4">
              {loadingpopulaer_person ? <div className='text-center my-5 py-5'>
                <span className="loader"></span>
              </div> : "" }
              <Slider {...settings} className='row'>
                {popularperson.map((e, i) => {
                  return <div key={i}>
                    <div className="movie mx-2 position-relative">
                      <Link to="/signin">
                        <div className="movie-img rounded-4 overflow-hidden">
                          <img src={`${imgPath}${e.profile_path}`} alt="moviephoto" className='w-100' />
                        </div>
                        <div className="movie-text my-3 ms-1">
                          <h6 className='fw-bold m-0'>{e.name}</h6>
                          <p className='text-muted fs-sm'> popularity {e.popularity}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                })}
              </Slider>
            </div>
          </div>

        </div>
      </div>
      <footer className='pb-4'>
        <div className="container text-center">
          <div className="logo-box">
            <img src={logotext} alt="logo" className='w-100'/>
          </div>
          <ul className='d-flex justify-content-center align-items-center fs-4'>
            <li className='me-3'>
              <a className='text-decoration-none text-white' href='https://github.com/yahia-younis'> <i className="fa-brands fa-github"></i> </a>
            </li>
            <li className='me-3'>
              <a className='text-decoration-none text-white' href="https://www.facebook.com/yahia.yoins"> <i className="fa-brands fa-facebook"></i> </a>
            </li>
            <li>
              <a className='text-decoration-none text-white' href="https://www.linkedin.com/in/yahia-younis/"> <i className="fa-brands fa-linkedin"></i> </a>
            </li>
          </ul>
          <p className='fs-sm m-0 mt-3'> © 2022 movies details. All Rights Reserved. Designed by <a href='https://github.com/yahia-younis' className='text-decoration-none fw-bold text-white'>yahia younis.</a></p>
        </div>
      </footer>
    </>
  )
}
