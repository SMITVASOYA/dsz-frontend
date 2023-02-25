import React from 'react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import AddEmplotyee from '../components/Hr/AddEmplotyee'
import Attendance from '../components/Hr/Attendance'
import HrSidebar from '../components/Hr/HrSidebar'
import LeaveReq from '../components/Hr/LeaveReq'
import Staff from '../components/Hr/Staff'

import { PopupProvider } from '../components/PopupsContext'

function Hr() {

    const [HrInput, setHrInput] = useState(true);

    const HrSearchHandler = () => {
        setHrInput(!HrInput)
        // console.log(Input)
    }

    return (
        <PopupProvider >

            <div className='flex'>

                <HrSidebar />

                <Routes>
                    <Route path="/" element={<Staff HrInput={HrInput} HrSearchHandler={HrSearchHandler} />} />
                    <Route path="/Staff" element={<Staff HrInput={HrInput} HrSearchHandler={HrSearchHandler} />} />
                    <Route path="/Addmember" element={<AddEmplotyee />} />
                    <Route path="/Attendance" element={<Attendance HrInput={HrInput} HrSearchHandler={HrSearchHandler} />} />
                    <Route path="/leave" element={<LeaveReq />} />
                </Routes>
            </div>
        </PopupProvider>
    )
}

export default Hr