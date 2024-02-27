import React, { useEffect, useState } from 'react';
import UserClass from './Users/UserClass';

function AboutUs() {
  // useEffect(()=>{
  //   console.log('useEffect');
    // const timer = setInterval(()=>{console.log("Interval of 1s")}, 1000)
  //   return()=>{
  //     //clearing the useEffect/ componentWillMount / Unmount
  //     console.log("useEffect unMount")
      // clearInterval(timer);
  //   }
  // }, [])
  // console.log("render")
  return (
  <>
    <div>AboutUs</div>
    <UserClass name={"Aman Kumar"} location={"New Delhi"}/>
  </>
  )
}

export default AboutUs