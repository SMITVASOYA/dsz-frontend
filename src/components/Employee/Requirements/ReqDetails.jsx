import React from 'react'

function ReqDetails({ Date, Time, Message, Location, Source, Company, Address, BillingAddress }) {
    return (
        <div className='max-h-[350px] overflow-y-scroll'>

            {/* section No 2 */}

            <div className='pb-1'>

                <div>
                    <h1 className='text-gray-400'>Inquiry on</h1>
                    <p>{Date} {Time}</p>
                </div>

                <div className='pt-2'>
                    <h1 className='text-gray-400'>Message</h1>
                    <p className='text-[14px] text-justify pr-4'>{Message}</p>
                </div>


            </div>

            {/* section no 3 */}

            {/* <hr className='mx-auto my-2 mb-3 w-[60%] bg-blue-500 h-[2px]' /> */}

            <div>
                <div className='flex justify-between w-[90%] py-2'>
                    <div>
                        <h1 className='text-gray-400'>Location</h1>
                        <p>{Location}</p>
                    </div>

                    <div>
                        <h1 className='text-gray-400'>Source</h1>
                        <p>{Source}</p>
                    </div>
                </div>

                <div className='pt-2'>
                    <h1 className='text-gray-400'>Company</h1>
                    <p className='text-black'>{Company}</p>
                </div>

                <div className='pt-2'>
                    <h1 className='text-gray-400'>Shipping Address</h1>
                    <p className='text-black pr-4'>{Address}</p>
                </div>

                <div className='py-2'>
                    <h1 className='text-gray-400'>Billing Address</h1>
                    <p className='text-black pr-4'>{BillingAddress}</p>
                </div>
            </div>

        </div>
    )
}

export default ReqDetails