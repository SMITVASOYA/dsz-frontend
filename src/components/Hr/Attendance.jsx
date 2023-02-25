import { useEffect } from 'react';
import AttendanceDetails from './AttendanceDetails';
import AttendanceSidebar from './AttendanceSidebar';
import HrSearchbar from './HrSearchbar';
import { useDispatch, useSelector } from 'react-redux';
import { fechEmployeesAttendance, setEmployeeAttendanceID, setMDEASidebar } from '../../Reducer/employeeSlice';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';


function Attendance({ HrInput, HrSearchHandler }) {


    var today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const SearchInput = useSelector((state) => state.filters.HrInput);
    const SortType = useSelector((state) => state.filters.HrSortType);
    const MDEASidebar = useSelector((state) => state.employee.MDEASidebar);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(fechEmployeesAttendance({ mm, yyyy }))

    }, [])

    var employeeAttendance = useSelector((state) => state.employee.employeesAttendance);

    if (SearchInput) {
        employeeAttendance = employeeAttendance.filter(({ employee_name }) => employee_name && employee_name.toLowerCase().includes(SearchInput.toLowerCase()))
        dispatch(setEmployeeAttendanceID(employeeAttendance[0].employee_id));
    }

    if (SortType && employeeAttendance) {

        if (SortType === "A-Z") {

            employeeAttendance = employeeAttendance.slice().sort(function (a, b) {
                const nameA = a.employee_name.toUpperCase();
                const nameB = b.employee_name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
                // console.log(a.employee_name, b.employee_name)
            });

            dispatch(setEmployeeAttendanceID(employeeAttendance[0].employee_id));

        } else if (SortType === "Z-A") {

            employeeAttendance = employeeAttendance.slice().sort(function (a, b) {
                const nameA = a.employee_name.toUpperCase();
                const nameB = b.employee_name.toUpperCase();
                if (nameA < nameB) {
                    return 1;
                }
                if (nameA > nameB) {
                    return -1;
                }
                return 0;
                // console.log(a.employee_name, b.employee_name)
            });

            dispatch(setEmployeeAttendanceID(employeeAttendance[0].employee_id));

        } else if (SortType === "N-O") {

            employeeAttendance = employeeAttendance.slice().sort((x, y) => {
                x = new Date(x.createdAt);
                y = new Date(y.createdAt);
                return y - x;
            });

            dispatch(setEmployeeAttendanceID(employeeAttendance[0].employee_id));

        } else if (SortType === "O-N") {

            employeeAttendance = employeeAttendance.slice().sort((x, y) => {
                x = new Date(x.createdAt);
                y = new Date(y.createdAt);
                return x - y;
            });

            dispatch(setEmployeeAttendanceID(employeeAttendance[0].employee_id));
        }

    }

    return (
        <div className='basis-[100%] md:basis-[83%] flex h-screen'>

            {/* main content  */}

            <div className='w-full relative md:basis-[70%] bg-bg'>

                <HrSearchbar HrInput={HrInput} HrSearchHandler={HrSearchHandler} />

                {/* Staff  */}

                <div className='my-5 overflow-y-scroll h-screen'>


                    {
                        !employeeAttendance ? <div className='flex justify-center items-center text-blue-500 pt-20'>Loading Employees Attendance...</div> :

                            employeeAttendance.map((e, index) => {
                                return (
                                    <AttendanceDetails Name={e.employee_name} Position={e.employee_designation} Attendance={e.attendance_stats.full} Halfleave={e.attendance_stats.half} Leave={e.attendance_stats.leave} key={index} EmployeeId={e.employee_id} />
                                )
                            })

                    }

                    {/* <AttendanceDetails Name={"shreeji sangani"} Position={"Sales Manager"} Attendance={17} Halfleave={6} Leave={3} />
                    <AttendanceDetails Name={"shreeji sangani"} Position={"Sales Manager"} Attendance={23} Halfleave={0} Leave={1} />
                    <AttendanceDetails Name={"shreeji sangani"} Position={"Sales Manager"} Attendance={7} Halfleave={16} Leave={13} />
                    <AttendanceDetails Name={"shreeji sangani"} Position={"Sales Manager"} Attendance={19} Halfleave={4} Leave={0} />
                    <AttendanceDetails Name={"shreeji sangani"} Position={"Sales Manager"} Attendance={21} Halfleave={2} Leave={3} />
                    <AttendanceDetails Name={"shreeji sangani"} Position={"Sales Manager"} Attendance={15} Halfleave={9} Leave={10} />
                    <AttendanceDetails Name={"shreeji sangani"} Position={"Sales Manager"} Attendance={17} Halfleave={6} Leave={3} /> */}
                </div>

            </div>



            {/* Rightsidebar  */}

            <div className='hidden md:block md:basis-[30%] overflow-y-scroll h-screen'>

                <div>
                    <AttendanceSidebar />
                </div>

            </div>


            <div className={MDEASidebar ? 'md:hidden w-[100%] absolute top-0 left-0 right-0 bottom-0 bg-white overflow-y-scroll h-screen' : 'hidden'}>

                <div className='flex justify-start mx-5 mt-5'>

                    <ArrowLongLeftIcon className='w-7 text-blue-500' onClick={() => { dispatch(setMDEASidebar(false)) }} />

                </div>
                <div>
                    <AttendanceSidebar />
                </div>
            </div>

        </div>
    )
}

export default Attendance;