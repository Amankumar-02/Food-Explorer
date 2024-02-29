import React from 'react'
import Order1 from './HighOrderComponent/Order1'
import Order2 from './HighOrderComponent/Order2';

function ContactUs() {
  const arr = [
    {firstName: "Aman", lastName:"Kumar", age:"23", hobbies:"Coding",},
    {firstName: "Neeraj", lastName:"Singh", age:"20", hobbies:"Dancing",},
    {firstName: "Abhay", lastName:"Sharma", age:"23",},
    {firstName: "Rishi", lastName:"Singh", age:"21", hobbies:"Cricket",},
    {firstName: "Anjali", lastName:"Khatri", age:"23",},
  ]
  const Order2Result = Order2(Order1);
  return (
    <>
      <div>ContactUs</div>
      <h1 className='text-xl font-bold'>Example of High Order Component</h1>
      {arr.map((item, index) =>
        // <Order1 key={index} data = {item}/>
        item.hobbies ? (
          <Order2Result key={index} data={item} />
        ) : (
          <Order1 key={index} data={item} />
        )
      )}
    </>
  );
}

export default ContactUs