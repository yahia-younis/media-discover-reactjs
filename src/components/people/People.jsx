import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import $ from 'jquery'
import Pagination from 'react-responsive-pagination';
import nullphoto from '../../asstes/pic-error.png'
import empty from '../../asstes/empty.png'

export default function People() {

  let [media, setmedia] = useState(null)
  const [loading, setloading] = useState(true)
  const [nodata, setnodata] = useState(false)
  const [currentpagenum, setcurrentpagenum] = useState(0)

  let { type } = useParams();
  let imgPath = "https://image.tmdb.org/t/p/w500/";

  async function getdata(pagenum = 1) {
    setmedia(null)
    setloading(true)
    if (localStorage.getItem("currentpage")) {
      pagenum = localStorage.getItem("currentpage")
    }
    let { data } = await axios(`https://api.themoviedb.org/3/person/${type}?api_key=f708973a9ad44b00b93dd5ac49f93aa2&language=en-US&page=${pagenum}`);
    let res = data.results;
    setmedia(res);
    setloading(false)
    setcurrentpagenum(data.page)
  }

  async function getsearchdata(query) {
    setmedia(null)
    setloading(true)
    let { data } = await axios(`https://api.themoviedb.org/3/search/person?api_key=f708973a9ad44b00b93dd5ac49f93aa2&language=en-US&query=${query}&page=1&include_adult=false`);
    let res = data.results;
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

    getdata();
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
        <div className="row px-4 pt-4">
          <div className="col-12 d-flex align-items-center flex-wrap">
            <div className='m-box'>
              <div className="line w-50"></div>
              <h1 className="content"> {type} people <br /> to discover now</h1>
              <p className='text-muted'>most {type} people by day</p>
              <div className="input-box position-relative w-100">
                <input id='search_input' type="text" placeholder='Search for people... ' className='form-control rounded-2' />
                <i className='fa-solid fa-search'></i>
              </div>
              <div className="line"></div>
            </div>

            {nodata ?<div className='text-center w-100' ><img className='empty-photo' src={empty} alt="empty pic" /> <h4 className='fw-bold pt-5 ps-5'>no data found</h4> </div> : ""}
            {media ? <>
            {media.map((e, i) => {
              return <div key={i} className="movie-box">
                <div className="movie mx-2 position-relative">
                  <Link to={`/peopledetalis/${(e.id) ? e.id : ""}`}>
                    <div className="movie-img rounded-4 overflow-hidden">
                      <img loading="lazy" src={(e.profile_path ? imgPath + e.profile_path : nullphoto)} alt="moviephoto" className='w-100' />
                    </div>
                    <div className="movie-text mt-3 ms-1">
                      <h6 className='fw-bold'>{e.name}</h6>
                    </div>
                  </Link>
                </div>
              </div>
            })}
          </> : ""}

          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="row media-body mb-5 pt-5 g-2">

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
