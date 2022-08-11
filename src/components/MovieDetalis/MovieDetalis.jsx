import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import $ from "jquery"
import Slider from 'react-slick';
import avatar from '../../asstes/user.png'
import nullphoto from '../../asstes/erorr.jpg'

export default function MovieDetalis() {
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
        breakpoint: 500,
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

  let { id } = useParams();

  const [detailsloading, setdetailsloading] = useState(true)
  const [keywordsloading, setkeywordsloading] = useState(true)
  const [creditsloading, setcreditsloading] = useState(true)
  const [reviewsloading, setreviewsloading] = useState(true)
  const [recommendationsloading, setrecommendationsloading] = useState(true)
  const [similarloading, setsimilarloading] = useState(true)

  const [media, setmedia] = useState(null)
  const [mediakeyword, setmediakeyword] = useState(null)
  const [creditscast, setcreditscast] = useState(null)
  const [creditscrew, setcreditscrew] = useState(null)
  const [reviews, setreviews] = useState([])
  const [recommendations, setrecommendations] = useState([])
  const [similar, setsimilar] = useState([])

  let imgPath = "https://image.tmdb.org/t/p/w500/";
  async function getdetails() {
    let { data } = await axios(`https://api.themoviedb.org/3/movie/${id}?api_key=f708973a9ad44b00b93dd5ac49f93aa2&language=en-US`);
    setmedia(data);
    setdetailsloading(false)
  }
  async function getkeywords() {
    let { data } = await axios(`https://api.themoviedb.org/3/movie/${id}/keywords?api_key=f708973a9ad44b00b93dd5ac49f93aa2`);
    setmediakeyword(data.keywords);
    setkeywordsloading(false)
  }
  async function getcredits() {
    let { data } = await axios(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=f708973a9ad44b00b93dd5ac49f93aa2&language=en-US`);
    setcreditscast(data.cast.splice(0, 15));
    setcreditscrew(data.crew.splice(0, 15));
    setcreditsloading(false)
  }
  async function getreviews() {
    let { data } = await axios(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=f708973a9ad44b00b93dd5ac49f93aa2&language=en-US`);
    setreviews(data.results.slice(0, 5));
    setreviewsloading(false)
  }
  async function getrecommendations() {
    let { data } = await axios(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=f708973a9ad44b00b93dd5ac49f93aa2&language=en-US`);
    setrecommendations(data.results.slice(0, 4));
    setrecommendationsloading(false)
  }
  async function getsimilar() {
    let { data } = await axios(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=f708973a9ad44b00b93dd5ac49f93aa2&language=en-US`);
    setsimilar(data.results.slice(0, 4));
    setsimilarloading(false)
  }

  useEffect(() => {
    getdetails()
    getkeywords()
    getcredits()
    getreviews()
    getsimilar()
    getrecommendations()
    $(".dropdown-item").on("click", function () {
      localStorage.setItem("currentpage", "1");
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {media ?
        <div className="position-relative">
          {detailsloading ?
            <div className='position-absolute top-50 start-50 translate-middle-x'>
              <span className="loader"></span>
            </div> : ""
          }
          <div className="media-details" style={{ backgroundImage: `url(${imgPath}${media.backdrop_path})` }}>
            <div className="overlay"></div>
            <div className="container position-relative py-5">
              <div className="row mt-5 pt-2">
                <div className="col-md-3">
                  <div className="media-box w-100 overflow-hidden rounded-3">
                    <img src={`${imgPath}` + media.poster_path} alt="media poster" className='w-100' />
                  </div>
                </div>
                <div className="col-md-9 ps-5 position-relative">
                  <h3 className='fw-bold' >{media.title} <a href={media.homepage} target="_blank" rel="noreferrer"><i className="fa-solid fa-share-from-square fs-5 ms-2 text-white" ></i></a> </h3>
                  <span className="fs-s">{media.release_date} .</span>
                  {media.genres.map((e, i) => {
                    return <span className='fw-bold fs-s' key={i}> {e.name} .</span>
                  })}
                  {media.production_companies ? <>
                    <h6 className='fw-bold mt-3'>production companies</h6>
                    <div className="d-flex align-items-center flex-wrap">
                      {media.production_companies.map((e, i) => {
                        return <div key={i} className='camponey-logo'> {(e.logo_path ? <img src={imgPath + e.logo_path} alt="camponey logo" /> : "")}</div>
                      })}
                    </div>
                  </> : ""}

                  <div className="piechart" style={{ 
                    animationDelay: `-${media.vote_average.toFixed(0)}0s`,
                    color: `${(media.vote_average.toFixed(0) < 4) ? "red": (media.vote_average.toFixed(0) < 7) ? "yellow": "#1FB46B"}`,
                    backgroundColor: `${(media.vote_average.toFixed(0) < 4) ? "#ff000027": (media.vote_average.toFixed(0) < 7) ? "#f2ee013b": "#1fb46c44"}`}}>
                    <div className="pie_content">
                      <span className="value"> {media.vote_average.toFixed(1)} </span>
                    </div>
                  </div>
                  <p className="my-3 text-muted">{media.tagline}</p>
                  <p>{media.overview}</p>
                  <ul className='d-flex flex-wrap'>
                    <li className="d-flex flex-column fs-sm mb-2 me-5"><span className='fw-bold fs-6'>Status</span>{media.status}</li>
                    <li className="d-flex flex-column fs-sm mb-2 me-5"><span className='fw-bold fs-6'>Original Language</span>{media.original_language}</li>
                    <li className="d-flex flex-column fs-sm mb-2 me-5"><span className='fw-bold fs-6'>Budget</span>$ {media.budget}</li>
                    <li className="d-flex flex-column fs-sm mb-2 me-5"><span className='fw-bold fs-6'>Revenue</span>$ {media.revenue}</li>
                    <li className="d-flex flex-column fs-sm mb-2 me-5"><span className='fw-bold fs-6'>popularity</span>{media.popularity}</li>
                  </ul>

                  {keywordsloading ?
                    <div className='position-absolute top-50 start-50 translate-middle-x'>
                      <span className="loader"></span>
                    </div> : ""
                  }
                  {mediakeyword ? <>
                    <h6 className='fw-bold mt-3'>Keywords</h6>
                    <ul className='Keywords position-relative'>
                      {mediakeyword.map((e, i) => {
                        return <li key={i}> {e.name}</li>
                      })}
                    </ul>
                  </> : ""}

                </div>
              </div>
            </div>
          </div>
        </div>
        : ""}
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div className="position-relative">
              {creditsloading ?
                <div className='position-absolute top-50 start-50 translate-middle-x'>
                  <span className="loader"></span>
                </div> : ""
              }
              {creditscast ?
                <div className="container mt-5 px-5">
                  <h5 className="fw-bold ms-2 mb-4">Top Billed Cast</h5>
                  <Slider {...settings} className='row'>
                    {creditscast.slice(0, 10).map((e, i) => {
                      return <div key={i}>
                        <div className="movie cradit mx-1 position-relative">
                          <Link to={`/peopledetalis/${e.id}`}>
                            <div className="movie-img">
                              {(e.profile_path ? <img src={`${imgPath}${e.profile_path}`} alt="profile_photo" className='w-100' /> : <img src={avatar} alt="profile_photo" className='w-100' />)}
                            </div>
                            <div className="movie-text my-3 ms-1">
                              <h6 className='fw-bold m-0'>{e.original_name}</h6>
                              <p className='text-muted fs-sm'>{e.character}</p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    })}
                  </Slider>
                </div> : ""}
              {creditscrew ?
                <div className="container mt-5 px-5">
                  <h5 className="fw-bold ms-2 mb-4">Top Billed Crew</h5>
                  <Slider {...settings} className='row'>
                    {creditscrew.slice(0, 10).map((e, i) => {
                      return <div key={i}>
                        <div className="movie cradit mx-1 position-relative">
                          <Link to={`/peopledetalis/${e.id}`}>
                            <div className="movie-img">
                              {(e.profile_path ? <img src={`${imgPath}${e.profile_path}`} alt="profile_photo" className='w-100' /> : <img src={avatar} alt="profile_photo" className='w-100' />)}
                            </div>
                            <div className="movie-text my-3 ms-1">
                              <h6 className='fw-bold m-0'>{e.original_name}</h6>
                              <p className='text-muted fs-sm'>{e.department}</p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    })}
                  </Slider>
                </div> : ""}
            </div>
            <div className="position-relative">
              {reviewsloading ?
                <div className='position-absolute top-50 start-50 translate-middle-x'>
                  <span className="loader"></span>
                </div> : ""
              }
            </div>
            {(reviews.length > 0) ? <>
              <div className="container mt-5" >
                <h5 className="fw-bold ms-2 mb-4">top reviews</h5>
                {reviews.map((e, i) => {
                  return <div className="reviews-box" key={i}>
                    <div className="row d-flex">
                      <div className="col-md-1 text-center">
                        <img src={(e.author_details.avatar_path ? e.author_details.avatar_path.slice(1) : avatar)} alt="" />
                      </div>
                      <div className="col-md-11">
                        <h6 className='fw-bold'>A review by {e.author_details.username}</h6>
                        <p className="fs-sm"> Written by {e.author_details.username} on {e.created_at} </p>
                        <p className="mb-0 fs-sm fw-bold"> {e.content.substring(0, 400)} ... </p>
                      </div>
                    </div>
                  </div>
                })}
              </div>
            </> : ""}
          </div>
          <div className="col-md-3">
            <div className="mt-5 px-2">
              <div className="position-relative">
                {recommendationsloading ?
                  <div className='position-absolute top-50 start-50 translate-middle-x'>
                    <span className="loader"></span>
                  </div> : ""
                }
              </div>
              {recommendations ? <>
                <h5 className="fw-bold ms-2 mb-4 pb-3">Recommendations</h5>
                {recommendations.map((e, i) => {
                  return <Link key={i} to={`/moviedetalis/${e.id}`} className="text-decoration-none text-white">
                    <img src={(e.backdrop_path ? imgPath + e.backdrop_path : nullphoto )} alt="moviephoto" className='backdrop_ rounded-2 nullphoto' />
                    <div className="d-flex justify-content-between align-items-center mt-2 mb-4">
                      <h6 className="m-0">{e.original_title}</h6>
                      <span>{String(e.vote_average * 100).substring(0, 2)}% </span>
                    </div>
                  </Link>
                })}
              </> : ""}

              <div className="position-relative">
                {similarloading ?
                  <div className='position-absolute top-50 start-50 translate-middle-x'>
                    <span className="loader"></span>
                  </div> : ""
                }
              </div>

              {similar ? <>
                <h5 className="fw-bold ms-2 mb-4 pb-3 mt-5">similar movies</h5>
                {similar.map((e, i) => {
                  return <Link key={i} to={`/moviedetalis/${e.id}`} className="text-decoration-none text-white">
                    <img src={(e.backdrop_path ? imgPath + e.backdrop_path : nullphoto )} alt="moviephoto" className='backdrop_ rounded-2 nullphoto' />
                    <div className="d-flex justify-content-between align-items-center mt-2 mb-4">
                      <h6 className="m-0">{e.original_title}</h6>
                      <span>{String(e.vote_average * 100).substring(0, 2)}% </span>
                    </div>
                  </Link>
                })}
              </> : ""}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
