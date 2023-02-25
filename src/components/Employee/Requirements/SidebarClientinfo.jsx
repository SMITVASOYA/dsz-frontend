import React from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'

function SidebarClientinfo({ Name, Email, Mobile, Status }) {
    return (
        <>
            <span className='flex items-center justify-between'>

                <div className='flex'>
                    <h1 className="headline">{Name}</h1>
                    <p className='mx-6 bg-gray-400  text-white px-2 rounded-sm font-medium'>
                        {Status}
                    </p>
                </div>

                <div className='group relative' >
                    <p className='w-5 mr-3 hover:cursor-pointer'><EllipsisVerticalIcon /> </p>
                    <div className='hidden group-hover:block absolute top-2 right-3 bg-white shadow-md rounded-sm w-[150px]'>
                        <div className='py-1'>
                            <li className='hover:bg-blue-400 hover:text-white hover:cursor-pointer list-none px-2'>Send to Lost</li>
                            <li className='hover:bg-blue-400 hover:text-white hover:cursor-pointer list-none px-2'>Send to Done</li>
                            <li className='hover:bg-blue-400 hover:text-white hover:cursor-pointer list-none px-2'>Send Quotaion</li>
                        </div>
                    </div>
                </div>

            </span>

            <div className='pt-2 text-gray-400'>
                <p className=''>{Email}</p>
                <p>{Mobile}</p>
            </div>
        </>
    )
}

export default SidebarClientinfo