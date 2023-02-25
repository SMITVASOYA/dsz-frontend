import { useState, useEffect } from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fechAttendance } from '../../Reducer/employeeSlice';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function AttendanceSidebar() {


    const dispatch = useDispatch();

    const EmployeeId = useSelector((state) => state.employee.employeeAttendanceId)
    const Employees = useSelector((state) => state.employee.employeesAttendance);
    const AttendanceData = useSelector((state) => state.employee.Attendance);


    var today = new Date();
    const [Interval, setInterval] = useState({
        "mm": String(today.getMonth() + 1).padStart(2, '0'),
        "yyyy": today.getFullYear()
    })

    useEffect(() => {
        dispatch(fechAttendance({ ...Interval, EmployeeId }))
    }, [EmployeeId, Interval,])

    if (!EmployeeId || !Employees) {
        return <div className='flex justify-center items-center text-blue-500 pt-20'>Loading Employees Attendance...</div>
    }

    const Employee = Employees.filter((obj) => {
        return obj.employee_id === parseInt(EmployeeId);
    })


    const Data = Employee[0];

    // setAttendanceData(Data.attendance_array);
    // console.log(AttendanceData)

    var date = new Date(`${Interval.yyyy}-${Interval.mm}-1`);

    const Day = (date.getDay() + 6) % 7;


    const HandelEditAttendace = (e) => {

        var date_of_attendace = e.target.value;

        if (parseInt(date_of_attendace) < 11) {
            date_of_attendace = "0" + date_of_attendace;
            console.log(date_of_attendace);
        }

        var data = JSON.stringify({

            "data": {
                "attendance_status": `${e.target.innerText}`,
                "date_of_attendance": `${Interval.yyyy}-${Interval.mm}-${date_of_attendace}`,
            }
        });

        console.log(data)

        var config = {
            method: 'put',
            url: `${process.env.REACT_APP_HOST}/api/auth/attendance/` + EmployeeId,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));

                var resData = response.data;

                if (resData.error) {

                } else {
                    dispatch(fechAttendance({ ...Interval, EmployeeId }));
                }
            })
            .catch(function (error) {
                var result = error.response.data;

                // console.log(result);

                if (result) {
                    if (result.error) {

                        Store.addNotification({
                            title: result.errorType ? result.errorType : "Error!",
                            message: result.errorMessage ? result.errorMessage : "Error While Processing Request!",
                            type: "warning",
                            insert: "top",
                            container: "top-right",
                            animationIn: ["animate__animated", "animate__fadeIn"],
                            animationOut: ["animate__animated", "animate__fadeOut"],
                            dismiss: {
                                duration: 5000,
                                onScreen: true
                            }
                        });
                    }


                }
            });
    }





    return (
        <div className='mx-6 mt-10 flex flex-col text-[14px] text-black'>

            <div>

                <span className='flex items-center justify-between'>
                    <h1 className="headline">{Data.employee_name}</h1>
                    {/* <p className='w-5 mr-3'><EllipsisVerticalIcon /> </p> */}
                </span>

                <div className='pt-2 text-gray-400'>
                    <p>{Data.employee_email}</p>
                    <p>{Data.employee_mobile}</p>
                </div>

            </div>


            <hr className='mx-auto my-4 mb-3 w-[60%] bg-indigo-500 h-[2px]' />


            <div className=''>

                {/* section No 2 */}


                <div className='grid grid-cols-7 pb-1 mt-7'>

                    <div className='font-medium text-center text-[#878787]'>MON</div>
                    <div className='font-medium text-center text-[#878787]'>TUE</div>
                    <div className='font-medium text-center text-[#878787]'>WED</div>
                    <div className='font-medium text-center text-[#878787]'>THU</div>
                    <div className='font-medium text-center text-[#878787]'>FRI</div>
                    <div className='font-medium text-center text-[#878787]'>SAT</div>
                    <div className='font-medium text-center text-[#878787]'>SUN</div>

                    {
                        Array.from(Array(Day), (e, i) => {
                            return <div className="text-gray-500 text-center py-2" > </div>
                        })
                    }

                    {

                        AttendanceData.map((data, i) => {

                            let div;

                            if (data === "full") {
                                div = < div className="text-green-500 text-center py-2 group relative" >
                                    <span className='hover:cursor-pointer hover:text-lg'>{i + 1}</span>
                                    <div className='hidden group-hover:block absolute top-8  mx-auto bg-white shadow-lg rounded-sm w-[100px] z-40'>
                                        <div className='m-1 text-sm'>
                                            <li className='dropdownList'>{i + 1}</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>leave</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>half</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>absent</li>
                                        </div>
                                    </div>
                                </div>
                            }
                            else if (data === "half") {
                                div = < div className="text-purple-500 text-center py-2 group relative" >
                                    <span className='hover:cursor-pointer hover:text-lg'>{i + 1}</span>
                                    <div className='hidden group-hover:block absolute top-8  mx-auto bg-white shadow-lg rounded-sm w-[100px] z-40'>
                                        <div className='m-1 text-sm'>
                                            <li className='dropdownList'>{i + 1}</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>full</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>leave</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>absent</li>
                                        </div>
                                    </div>
                                </div>
                            }
                            else if (data === "absent") {

                                div = < div className="text-red-500 text-center py-2 group relative" >
                                    <span className='hover:cursor-pointer hover:text-lg'>{i + 1}</span>
                                    <div className='hidden group-hover:block absolute top-8  mx-auto bg-white shadow-lg rounded-sm w-[100px] z-40'>
                                        <div className='m-1 text-sm'>
                                            <li className='dropdownList'>{i + 1}</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>full</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>leave</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>half</li>
                                        </div>
                                    </div></div>
                            }
                            else if (data === "leave") {

                                div = < div className="text-orange-400 text-center py-2 group relative" >
                                    <span className='hover:cursor-pointer hover:text-lg'>{i + 1}</span>
                                    <div className='hidden group-hover:block absolute top-8  mx-auto bg-white shadow-lg rounded-sm w-[100px] z-40'>
                                        <div className='m-1 text-sm'>
                                            <li className='dropdownList'>{i + 1}</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>full</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>half</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>absent</li>
                                        </div>
                                    </div>
                                </div>
                            }
                            else if (data === "NA") {
                                div = < div className="text-gray-500 text-center py-2 group relative" >
                                    <span className='hover:cursor-pointer hover:text-lg'>{i + 1}</span>
                                    <div className='hidden group-hover:block absolute top-8  mx-auto bg-white shadow-lg rounded-sm w-[100px] z-40'>
                                        <div className='m-1 text-sm'>
                                            <li className='dropdownList'>{i + 1}</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>full</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>leave</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>half</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>absent</li>
                                        </div>
                                    </div>
                                </div>
                            } else {
                                div = < div className="text-gray-500 text-center py-2 group relative" >
                                    <span className='hover:cursor-pointer hover:text-lg'>{i + 1}</span>
                                    <div className='hidden group-hover:block absolute top-8  mx-auto bg-white shadow-lg rounded-sm w-[100px] z-40'>
                                        <div className='m-1 text-sm'>
                                            <li className='dropdownList'>{i + 1}</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>full</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>leave</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>half</li>
                                            <li className='dropdownList text-left text-black' onClick={(e) => { HandelEditAttendace(e) }} value={i + 1}>absent</li>
                                        </div>
                                    </div>
                                </div>
                            }

                            return (
                                <>
                                    {div}
                                </>

                            )
                        })
                    }

                </div>

                <div className='flex justify-center mt-3 mb-10'>
                    <div className=''>
                        <input name="date" type="month" max={`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`} value={`${Interval.yyyy}-${Interval.mm}`} onChange={(e) => {
                            var val = e.target.value;
                            val = val.split("-");

                            setInterval({
                                yyyy: val[0],
                                mm: val[1]
                            })
                        }} className="text-sm outline-none" />
                        {/* <input name='Interval.yyyy' type="year" value={Interval.yyyy} /> */}
                    </div>
                </div>

                {/* section no 3 */}

                <hr className='mx-auto my-3 w-[60%] bg-indigo-500 h-[2px]' />

                <div className='flex items-center justify-between mt-6'>

                    <div>
                        <p className='text-blue-500 text-lg text-center font-medium'>{Data.attendance_stats.full}</p>
                        <h1 className='text-xs font-400'>Total Attendance</h1>
                    </div>

                    <div>
                        <p className='text-purple-500 text-lg text-center font-medium'>{Data.attendance_stats.half}</p>
                        <h1 className='text-xs font-400'>Half Leave</h1>
                    </div>

                    <div>
                        <p className='text-rose-500 text-lg text-center font-medium'>{Data.attendance_stats.leave}</p>
                        <h1 className='text-xs font-400'>Total Leave</h1>
                    </div>

                </div>

            </div>

            {/* <div className='my-6 mx-auto w-[-webkit-fill-available]  text-[14px]  fixed bottom-2'>

                <button className='px-4 py-2 w-[85%] mx-auto bg-primary text-white font-medium rounded-md shadow-md' >Edit</button>

            </div> */}

        </div>
    )
}

export default AttendanceSidebar