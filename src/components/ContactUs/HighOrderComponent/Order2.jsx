import React from 'react'

function Order2(Order1) {
  return ({data})=>{
    return(
        <>
        <div className='border border-red-500 m-2'>
        <Order1 data={data}/>
        <h1 className='ms-2'>Hobbies: {data.hobbies} from highOrderComponent</h1>
        </div>
        </>
    )
  }
}

export default Order2