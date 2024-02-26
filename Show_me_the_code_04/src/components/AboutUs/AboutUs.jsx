import React, { useEffect, useState } from 'react';
import UserClass from './Users/UserClass';
import { RESTAURANT_HOME } from '../../utils/constants';

function AboutUs() {
  return (
  <>
    <div>AboutUs</div>
    <UserClass name={"Aman Kumar"} location={"New Delhi"}/>
  </>
  )
}

export default AboutUs