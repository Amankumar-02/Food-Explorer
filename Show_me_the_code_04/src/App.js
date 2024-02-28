import React from 'react'
import {Header,Body} from './components/index';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <div className='app relative'>
        <Header/>
        {/* <Body/> */}
        <Outlet/>
      </div>
    </>
  )
}

export default App