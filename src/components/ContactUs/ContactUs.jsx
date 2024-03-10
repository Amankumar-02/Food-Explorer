import React from 'react'
// import Order1 from './HighOrderComponent/Order1'
// import Order2 from './HighOrderComponent/Order2';

function ContactUs() {
  const arr = [
    {firstName: "Aman", lastName:"Kumar", age:"23", hobbies:"Coding",},
    {firstName: "Neeraj", lastName:"Singh", age:"20", hobbies:"Dancing",},
    {firstName: "Abhay", lastName:"Sharma", age:"23",},
    {firstName: "Rishi", lastName:"Singh", age:"21", hobbies:"Cricket",},
    {firstName: "Anjali", lastName:"Khatri", age:"23",},
  ]
  // const Order2Result = Order2(Order1);
  return (
    <>
      <h1>ContactUs</h1>
      <h2>Heading2</h2>
      <h3>Heading3</h3>
      <h4>Heading4</h4>
      {/* <h1 className='text-xl font-bold'>Example of High Order Component</h1>
      {arr.map((item, index) =>
        // <Order1 key={index} data = {item}/>
        item.hobbies ? (
          <Order2Result key={index} data={item} />
        ) : (
          <Order1 key={index} data={item} />
        )
      )} */}
      <form className='flex gap-2 m-4'>
        <input type="text" className='border border-black p-2' placeholder='Name'/>
        <input type="text" className='border border-black p-2' placeholder='Message'/>
      <input type="submit" className='border border-black p-2 bg-gray-300 rounded-xl' value="Submit"/>
      </form>
    </>
  );
}

export default ContactUs