import React from 'react'
import _404 from '../../asstes/404.png'
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className='pt-7 d-flex justify-content-center align-items-center vh-100 flex-column'>
      <img src={_404} alt="404 img" className='w-50' />
      <Link to={'/movie/popular'} className='mt-3'> <button className='btn btn-info'>Back To Home Page</button> </Link>
    </div>
  )
}
