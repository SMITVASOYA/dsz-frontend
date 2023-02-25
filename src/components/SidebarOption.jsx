import React from 'react'
import { Link } from 'react-router-dom'

function SidebarOption({ Active, Icon, Title, link }) {
    return (

        <div className={`flex justify-start md:pl-5 my-4 align-baseline text-[#b2b2b4] focus:text-blue-500 focus:border-blue-500`}>
            <Link to={link} className="flex focus:text-blue-500" >
                <Icon className='w-6' />
                <p className='hidden md:block pl-4 text-base font-medium'>{Title}</p>
            </Link>
        </div>
    )
}

export default SidebarOption