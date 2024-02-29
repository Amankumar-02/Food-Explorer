import React from 'react'

function Order1({data}) {
  return (
    <>
    <div className='m-2 border border-black'>
    <h1>Name: {data.firstName} {data.lastName}</h1>
    <h2>Age: {data.age}</h2>
    {/* {data.hobbies? (<h1 className=''>Hobbies: {data.hobbies} from highOrderComponent</h1>):null} */}
    </div>
    </>
  )
}


export default Order1