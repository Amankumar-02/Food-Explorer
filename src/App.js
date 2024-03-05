import React, { useEffect, useState } from 'react'
import {Header,Body, Footer} from './components/index';
import { Outlet } from 'react-router-dom';
// import { useContext } from 'react';
// import { UserContextStore } from './utils/UserContextStore';
import { reduxStore } from './utils/reduxStore';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

function App() {

  // const [authUserName, setAuthUserName] = useState("");

  // //dummy fetch Api
  // useEffect(()=>{
  //   const data = {
  //     name:"Aman Kumar",
  //   }
  //   setAuthUserName(data.name);
  // }, [])


  return (
    <>
    {/* <UserContextStore.Provider value={{logginName: authUserName, setAuthUserName, hobbies:"Coding2"}}> */}
    <Provider store={reduxStore}>

      <div className='app relative'>
        <Header/>
        {/* <Body/> */}
        <Outlet/>
        <Toaster />
        <Footer/>
      </div>
    </Provider>
    {/* </UserContextStore.Provider> */}
    </>
  )
}

export default App