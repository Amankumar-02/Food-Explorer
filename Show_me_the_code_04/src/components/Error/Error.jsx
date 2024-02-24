import React from 'react';
import './Error.css';
import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  // console.log(error)
  return (
    <div className='error-page'>
        <h1>{error.status} {error.statusText}</h1>
        <h2>Invalid URL {error.data}</h2>
    </div>
  )
}

export default Error