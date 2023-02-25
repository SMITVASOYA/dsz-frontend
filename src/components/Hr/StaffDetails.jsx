import React from 'react'
import { useDispatch } from 'react-redux'
import { setEmployeeID, setMDESidebar } from '../../Reducer/employeeSlice';

function StaffDetails({ Name, Email, Position, Contact, EmployeeId }) {


    const dispatch = useDispatch();


    return (

        <>
            <div className='hidden px-4 py-2 mx-4 my-2 md:flex justify-between items-center bg-white shadow-md  rounded-md' id={EmployeeId}>

                <div className='w-[30%]'>
                    <h1 className='text-base font-400'>
                        {Name}
                    </h1>
                    <p className='text-gray-400 text-sm'>{Position}</p>
                </div>

                {/* <h1 className='border-l-2 h-10 w-5 border-gray-300'></h1> */}

                <div className='flex flex-col w-[55%] justify-start'>
                    <h1 className='text-base font-400'>{Email}</h1>
                    <p className='text-gray-400 text-sm'>{Contact}</p>
                </div>


                {/* <h1 className='border-l-2 h-10 w-5 border-gray-300'></h1> */}

                <div className='w-[15%]'>
                    <button className='px-4 py-1 h-8 bg-blue-500 text-base font-[400] text-white rounded-[4px] shadow-sm' onClick={(e) => { dispatch(setEmployeeID(EmployeeId)) }} id={EmployeeId}> View </button>
                </div>

            </div>


            {/* for mobile */}

            <div className='md:hidden px-4 py-2 mx-4 my-2 flex flex-col bg-white shadow-md  rounded-md' id={EmployeeId}>

                <div className=''>
                    <h1 className='text-base font-400'>
                        {Name}
                    </h1>
                    <p className='text-gray-400 text-sm'>{Position}</p>
                </div>

                {/* <h1 className='border-l-2 h-10 w-5 border-gray-300'></h1> */}


                <div className='flex justify-between'>

                    <div className='flex flex-col justify-start'>
                        <h1 className='text-base font-400'>{Email}</h1>
                        <p className='text-gray-400 text-sm'>{Contact}</p>
                    </div>

                    {/* <h1 className='border-l-2 h-10 w-5 border-gray-300'></h1> */}

                    <div className='my-auto h-[99%]'>
                        <button className='float-right px-4 py-1 h-8 bg-blue-500 text-base font-[400] text-white rounded-[4px] shadow-sm' onClick={(e) => { dispatch(setEmployeeID(EmployeeId)); dispatch(setMDESidebar(true)) }} id={EmployeeId}> View </button>
                    </div>

                </div>


            </div>



        </>

    )
}

export default StaffDetails