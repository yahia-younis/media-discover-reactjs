import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import $ from 'jquery'
import Pagination from 'react-responsive-pagination';
import nullphoto from '../../asstes/pic-error.png'
import nullphoto2 from '../../asstes/cursorphotoerror.jpg'
import empty from '../../asstes/empty.png'

export default function Movie() {

  let [media, setmedia] = useState(null)
  let [caursol, setcaursol] = useState([])
  const [loading, setloading] = useState(true)
  const [nodata, setnodata] = useState(false)
  const [currentpagenum, setcurrentpagenum] = useState(0)

  let { type } = useParams();
  let imgPath = "https://image.tmdb.org/t/p/w500/";

  async function getdata(pagenum = 1) {
    setmedia(null)
    setcaursol([])
    setloading(true)
    if (localStorage.getItem("currentpage")) {
      pagenum = localStorage.getItem("currentpage")
    }
    let { data } = await axios(`https://api.themoviedb.org/3/movie/${type}?api_key=f708973a9ad44b00b93dd5ac49f93aa2&language=en-US&page=${pagenum}`);
    let res = data.results;
    setcaursol(res);
    setmedia(res);
    setloading(false)
    setcurrentpagenum(data.page)
  }

  async function getsearchdata(query) {
    setmedia(null)
    setloading(true)
    let { data } = await axios(`https://api.themoviedb.org/3/search/movie?api_key=f708973a9ad44b00b93dd5ac49f93aa2&language=en-US&query=${query}&page=1&include_adult=false`);
    let res = data.results;
    setcaursol(res);
    setmedia(res);
    setloading(false)
    if (res.length === 0) {
      setnodata(true)
    } else {
      setnodata(false)
    }
  }

  function getnewdata(num) {
    $('html').scrollTop(0);
    localStorage.setItem("currentpage", num);
    getdata(num)
  }

  useEffect(() => {
    getdata();

    $("#search_input").on("keyup", function () {
      if ($(this).val().length > 0) {
        getsearchdata($(this).val())
        $("#pagination").css("display", "none")
      } else {
        getdata()
        setnodata(false)
        $("#pagination").css("display", "flex")
      }
    });

    $(".input-box").css("display", "flex");
    $(".dropdown-item").on("click", function () {
      localStorage.setItem("currentpage", "1");
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='pt-7 vh-100'>
      <div className="container h-100">
        {loading ?
          <div className='position-absolute top-50 start-50 translate-middle-x'>
            <span className="loader"></span>
          </div> : ""
        }
        <div className="row pt-4">
          <div className="col-lg-5 col-md-12 d-flex align-items-center">
            <div className='w-100'>
              <div className="line w-25"></div>
              <h1 className="content"> {type} movies <br /> to discover now</h1>
              <p className='text-muted'>most watched {type} movie by day</p>
              <div className="input-box position-relative w-100">
                <input id='search_input' type="text" placeholder='Search for a movie... ' className='form-control rounded-2' />
                <i className='fa-solid fa-search'></i>
              </div>
              <div className="line"></div>
            </div>
          </div>
          <div className="col-lg-7 col-md-12">
            {nodata ? <div className='text-center' ><img className='empty-photo' src={empty} alt="empty pic" /> <h4 className='fw-bold pt-5 ps-5'>no data found</h4> </div> : ""}
            {caursol.slice(0, 5).length > 0 ?

              <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <Link to={`/moviedetalis/${(caursol[0].id) ? caursol[0].id : ""}`}>
                      <img loading="lazy" src={(caursol[0].backdrop_path ? imgPath + caursol[0].backdrop_path : nullphoto2)} alt="moviephoto" className='w-100' />
                      <div className="carousel-caption ">
                        <h5 className='fw-bolde'>{caursol[0].title}</h5>
                        <p className='fw-bold fs-sm d-none d-md-block'>{caursol[0].overview.substring(0, 90)}</p>
                      </div>
                    </Link>
                  </div>
                  <div className="carousel-item">
                    <Link to={`/moviedetalis/${(caursol[1].id) ? caursol[1].id : ""}`}>
                      <img src={imgPath + caursol[1].backdrop_path} className="d-block w-100" alt="backdrop" />
                      <div className="carousel-caption ">
                        <h5 className='fw-bolde'>{caursol[1].title}</h5>
                        <p className='fw-bold fs-sm d-none d-md-block'>{caursol[1].overview.substring(0, 90)}</p>
                      </div>
                    </Link>
                  </div>
                  <div className="carousel-item">
                    <Link to={`/moviedetalis/${(caursol[2].id) ? caursol[2].id : ""}`}>
                      <img loading="lazy" src={(caursol[2].backdrop_path ? imgPath + caursol[2].backdrop_path : nullphoto2)} alt="moviephoto" className='w-100' />
                      <div className="carousel-caption ">
                        <h5 className='fw-bolde'>{caursol[2].title}</h5>
                        <p className='fw-bold fs-sm d-none d-md-block'>{caursol[2].overview.substring(0, 90)}</p>
                      </div>
                    </Link>
                  </div>
                  <div className="carousel-item">
                    <Link to={`/moviedetalis/${(caursol[3].id) ? caursol[3].id : ""}`}>
                      <img loading="lazy" src={(caursol[3].backdrop_path ? imgPath + caursol[3].backdrop_path : nullphoto2)} alt="moviephoto" className='w-100' />
                      <div className="carousel-caption ">
                        <h5 className='fw-bolde'>{caursol[3].title}</h5>
                        <p className='fw-bold fs-sm d-none d-md-block'>{caursol[3].overview.substring(0, 90)}</p>
                      </div>
                    </Link>
                  </div>
                  <div className="carousel-item">
                    <Link to={`/moviedetalis/${(caursol[4].id) ? caursol[4].id : ""}`}>
                      <img loading="lazy" src={(caursol[4].backdrop_path ? imgPath + caursol[4].backdrop_path : nullphoto2)} alt="moviephoto" className='w-100' />
                      <div className="carousel-caption ">
                        <h5 className='fw-bolde'>{caursol[4].title}</h5>
                        <p className='fw-bold fs-sm d-none d-md-block'>{caursol[4].overview.substring(0, 90)}</p>
                      </div>
                    </Link>
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>

              : ""}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="row media-body mb-5 pt-5 g-2">
              {media ? <>
                {media.slice(5, 20).map((e, i) => {
                  return <div key={i} className="movie-box mb-3">
                    <div className="movie mx-2 position-relative">
                      <Link to={`/moviedetalis/${(e.id) ? e.id : ""}`}>
                        <div className="movie-img rounded-4 overflow-hidden">
                          <img loading="lazy" src={(e.poster_path ? imgPath + e.poster_path : nullphoto)} alt="moviephoto" className='w-100' />
                        </div>
                        <div className="piechart" style={{ 
                          animationDelay: `-${e.vote_average.toFixed(0)}0s`,
                          color: `${(e.vote_average.toFixed(0) < 4) ? "red": (e.vote_average.toFixed(0) < 7) ? "yellow": "#1FB46B"}`,
                          backgroundColor: `${(e.vote_average.toFixed(0) < 4) ? "#ff000027": (e.vote_average.toFixed(0) < 7) ? "#f2ee013b": "#1fb46c44"}`}}>
                          <div className="pie_content">
                            <span className="value"> {e.vote_average.toFixed(1)} </span>
                          </div>
                        </div>
                        <div className="movie-text mt-3 ms-1">
                          <h6 className='fw-bold'>{e.title}</h6>
                          <p className='text-muted fs-sm m-0'>{e.release_date}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                })}
              </> : ""}
            </div>
          </div>
          <div id='pagination' className='pagination pb-5'>
            <Pagination
              current={currentpagenum}
              total={450}
              onPageChange={getnewdata}
              maxWidth={200}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
