import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Notfound() {
  let Navigate=useNavigate()
  return<>
  <div className='d-flex justify-content-center align-items-center p-5 mt-5 flex-column'>
    <h1>404 Not Found !</h1>
    <h6>You visited page not found you may go home page</h6>
    <Link className='bg-danger text-white p-2 w-25 text-center rounded-2 fs-6 mt-4' to={'/'}>Back To Home</Link>
  </div>
  </>
}
