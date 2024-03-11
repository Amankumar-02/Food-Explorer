import React from 'react'
// import Logo from '../../../public/logo.png';

function Footer() {
    const data = [
      {
        section: {
          title: "Company",
          list: ["About", "Careers", "Team"],
        },
      },
      {
        section: {
          title: "Contact us",
          list: ["Help & Support", "Partner with us", "Ride with us"],
        },
        section2: {
          title: "Legal",
          list: ["Terms & Conditions", "Cookie Policy", "Privacy Policy"],
        },
      },
      {
        section: {
          title: "We deliver to:",
          list: [
            "Bangalore",
            "Gurgaon",
            "Hyderabad",
            "Delhi",
            "Mumbai",
            "Pune",
          ],
        },
      },
    ];
    
  return (
    <>
    <div className='py-10 px-20 flex gap-4 text-gray-700' style={{background: "linear-gradient(0deg, rgb(201, 188, 244) 0%, rgb(201, 188, 244) 95.83%)"}}>
        <div className='w-[32%] flex flex-col gap-2'>
            <img src="https://food-explorer-002.netlify.app/logo.355b7f2c.png" className='w-[130px]' alt="" />
            <h1 className='text-2xl font-bold'>Food Explorer</h1>
            <h1 className='font-semibold'>&copy; 2024 AmanKr - All Right Reseved</h1>
        </div>
        {data.map(({section, section2}, index)=>(
        <div key={index} className='w-[22%] flex flex-col gap-2'>
            <div>
            <h1 className='text-2xl font-semibold'>
            {section.title}
            </h1>
            <ul>
                {section.list.map((item, index)=>(
                    <li key={index} className='text-gray-500 font-semibold cursor-pointer'>{item}</li>
                    ))}
            </ul>
            </div>
            <div>
            {section2? (<>
            <h1 className='text-2xl font-semibold'>
            {section2.title}
            </h1>
            <ul>
                {section2.list.map((item, index)=>(
                    <li key={index} className='text-gray-500 font-semibold cursor-pointer'>{item}</li>
                    ))}
            </ul>
            </>) : null}
            </div>
        </div>
        ))}
    </div>
    </>
  )
}

export default Footer