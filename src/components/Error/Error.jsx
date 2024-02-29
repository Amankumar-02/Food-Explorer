import React from 'react';
import './Error.css';
import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  // console.log(error)
  return (
    <div className='error-page w-full h-[100vh] flex items-center justify-center flex-col'>
        <h1>{error.status} {error.statusText}</h1>
        <h2>Invalid URL {error.data}</h2>
    </div>
  )
}

export default Error