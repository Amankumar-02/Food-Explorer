import React from 'react'
import Logo from '../../../public/logo.png';

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
    {/* <div className='py-10 px-20 flex gap-4 text-gray-700' style={{background: "linear-gradient(0deg, rgb(201, 188, 244) 0%, rgb(201, 188, 244) 95.83%)"}}>
        <div className='w-[32%] flex flex-col gap-2'>
            <img src={Logo} className='w-[130px]' alt="" />
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
    </div> */}
    <div
        className="py-10 px-6 lg:px-20 flex flex-col lg:flex-row gap-8 text-gray-700"
        style={{ background: "linear-gradient(0deg, rgb(201, 188, 244) 0%, rgb(201, 188, 244) 95.83%)" }}
      >
        {/* Logo Section */}
        <div className="w-full lg:w-[32%] flex flex-col gap-4 text-center lg:text-left">
          <img src={Logo} className="w-[130px] mx-auto lg:mx-0" alt="Logo" />
          <h1 className="text-2xl font-bold">Food Explorer</h1>
          <h1 className="font-semibold">&copy; 2024 AmanKr - All Rights Reserved</h1>
        </div>

        {/* Dynamic Section Rendering */}
        <div className="flex flex-wrap sm:flex-nowrap lg:flex-row justify-between w-full lg:w-[68%] gap-8">
          {data.map(({ section, section2 }, index) => (
            <div key={index} className="w-full sm:w-[48%] lg:w-[22%] flex flex-col gap-4">
              {/* Section 1 */}
              <div>
                <h1 className="text-xl lg:text-2xl font-semibold">{section.title}</h1>
                <ul className="mt-2">
                  {section.list.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-500 font-semibold cursor-pointer hover:text-gray-800 transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Section 2 (Optional) */}
              {section2 && (
                <div>
                  <h1 className="text-xl lg:text-2xl font-semibold">{section2.title}</h1>
                  <ul className="mt-2">
                    {section2.list.map((item, index) => (
                      <li
                        key={index}
                        className="text-gray-500 font-semibold cursor-pointer hover:text-gray-800 transition-colors"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Footer