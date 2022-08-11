import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import avatar from '../../asstes/user.png'
import Slider from 'react-slick';

export default function PeopleDetalis() {

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

  const [media, setmedia] = useState(null)
  const [detailsloading, setdetailsloading] = useState(true);

  let { id } = useParams();

  let imgPath = "https://image.tmdb.org/t/p/w500/";

  async function getdetails() {
    let { data } = await axios(`https://api.themoviedb.org/3/person/${id}?api_key=f708973a9ad44b00b93dd5ac49f93aa2&language=en-US&append_to_response=combined_credits`);
    setmedia(data);
    setdetailsloading(false)
  }

  useEffect(() => {
    getdetails()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className='container pt-7 mt-5'>
      {detailsloading ?
        <div className='position-absolute top-50 start-50 translate-middle-x'>
          <span className="loader"></span>
        </div>
        :
        media ?
          <div className="row">
            <div className="col-md-3">
              <div className="person-img rounded-2 overflow-hidden">
                <img src={imgPath + media.profile_path} alt="profile_img" className='w-100' />
              </div>
              <div className="Personal-Info mt-4">
                <h4 className='fw-bold'>Personal Info</h4>
                <ul className='mt-4'>
                  <li className='fs-sm my-3'> <h6 className='fw-bold'> Known For </h6> {media.known_for_department} </li>
                  <li className='fs-sm my-3'> <h6 className='fw-bold'> Gender </h6> {(media.gender === 1) ? "female" : "male"} </li>
                  <li className='fs-sm my-3'> <h6 className='fw-bold'> birthday </h6> {media.birthday} </li>
                  <li className='fs-sm my-3'> <h6 className='fw-bold'> deathday </h6> {(media.deathday) ? media.deathday : "Still Alive 😂"} </li>
                  <li className='fs-sm my-3'> <h6 className='fw-bold'> place of birth </h6> {media.place_of_birth} </li>
                  <li className='fs-sm my-3'> <h6 className='fw-bold'> also known as </h6> {media.also_known_as.map((e, i) => { return <div key={i} className='my-1'>{e}</div> })} </li>
                </ul>
              </div>
            </div>
            <div className="col-md-9">
              <h3 className='fw-bold'>{media.name}</h3>
              <div className="Biography my-4">
                {(media.biography) ?
                  <>
                    <h5 className='fw-bold'>Biography</h5>
                    <p>{media.biography}</p>
                  </>
                  : ""}
              </div>
              <div className="credits">
                <h5 className='fw-bold'>Known For</h5>
                <h5 className='my-4'>casting</h5>
                <Slider {...settings} className='row'>
                  {media.combined_credits.cast.slice(0, 10).map((e, i) => {
                    return <div key={i}>
                      <div className="movie cradit mx-1 position-relative">
                        <Link to={`/moviedetalis/${e.id}`}>
                          <div className="movie-img">
                            {(e.poster_path ? <img src={`${imgPath}${e.poster_path}`} alt="profile_photo" className='w-100' /> : <img src={avatar} alt="profile_photo" className='w-100' />)}
                          </div>
                          <div className="movie-text mt-2">
                            <h6 className='fw-bold m-0 fs-xm'>{e.title}</h6>
                          </div>
                        </Link>
                      </div>
                    </div>
                  })}
                </Slider>
                {(media.combined_credits.crew.length > 0) ? <>
                  <h5 className='my-4'>crewing</h5>
                  <Slider {...settings} className='row'>
                    {media.combined_credits.crew.slice(0, 10).map((e, i) => {
                      return <div key={i}>
                        <div className="movie cradit mx-1 position-relative">
                          <Link to={`/moviedetalis/${e.id}`}>
                            <div className="movie-img">
                              {(e.poster_path ? <img src={`${imgPath}${e.poster_path}`} alt="profile_photo" className='w-100' /> : <img src={avatar} alt="profile_photo" className='w-100' />)}
                            </div>
                            <div className="movie-text mt-2">
                              <h6 className='fw-bold m-0 fs-xm'>{e.title}</h6>
                            </div>
                          </Link>
                        </div>
                      </div>
                    })}
                  </Slider>
                </> : ""}
              </div>
              <div className="acting my-4">
                <h5 className='fw-bold'>Acting</h5>
                <ul className="acting-box">
                  {media.combined_credits.cast.map((e, i) => {
                    return <li key={i}>
                      <span className='text-muted fs-sm'>{(e.release_date ? e.release_date.slice(0, 4) : (e.first_air_date ? e.first_air_date.slice(0, 4) : ""))}</span>
                      <Link className='text-decoration-none' to={`/${e.media_type}detalis/${e.id}`}> <span className='fw-bold '>{(e.title ? e.title : e.name)}</span> </Link>
                      <span className='text-muted fs-sm'> {(e.character ? "as " + e.character : "")} </span>
                    </li>
                  })}
                </ul>
              </div>
              <div className="acting my-4">
                <h5 className='fw-bold'>{(media.combined_credits.crew[0]) ? media.combined_credits.crew[0].department : ""}</h5>
                <ul className="acting-box">
                  {media.combined_credits.crew.map((e, i) => {
                    return <li key={i}>
                      <span className='text-muted fs-sm'>{(e.release_date ? e.release_date.slice(0, 4) : (e.first_air_date ? e.first_air_date.slice(0, 4) : ""))}</span>
                      <Link className='text-decoration-none' to={`/${e.media_type}detalis/${e.id}`}> <span className='fw-bold '>{(e.title ? e.title : e.name)}</span> </Link>
                      <span className='text-muted fs-sm'> {(e.character ? "as " + e.character : "")} </span>
                    </li>
                  })}
                </ul>
              </div>
            </div>
          </div>
          : ""
      }
    </div>
  )
}
