import { useEffect } from 'react'
import HrSearchbar from './HrSearchbar'
import StaffDetails from './StaffDetails'
import StaffSidebar from './StaffSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { fechEmployees, setEmployeeID, setMDESidebar } from '../../Reducer/employeeSlice'
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';


function Staff({ HrInput, HrSearchHandler }) {


    const SearchInput = useSelector((state) => state.filters.HrInput);
    const SortType = useSelector((state) => state.filters.HrSortType);
    const MDESidebar = useSelector((state) => state.employee.MDESidebar);


    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(fechEmployees())

    }, [])


    var Employee = useSelector((state) => state.employee.employees);

    if (SearchInput) {
        Employee = Employee.filter(({ employee_name }) => employee_name && employee_name.toLowerCase().includes(SearchInput.toLowerCase()))
        dispatch(setEmployeeID(Employee[0].employee_id));
    }

    if (SortType && Employee) {

        if (SortType === "A-Z") {

            Employee = Employee.slice().sort(function (a, b) {
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

            dispatch(setEmployeeID(Employee[0].employee_id));

        } else if (SortType === "Z-A") {

            Employee = Employee.slice().sort(function (a, b) {
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

            dispatch(setEmployeeID(Employee[0].employee_id));

        } else if (SortType === "N-O") {

            Employee = Employee.slice().sort((x, y) => {
                x = new Date(x.createdAt);
                y = new Date(y.createdAt);
                return y - x;
            });

            dispatch(setEmployeeID(Employee[0].employee_id));

        } else if (SortType === "O-N") {

            Employee = Employee.slice().sort((x, y) => {
                x = new Date(x.createdAt);
                y = new Date(y.createdAt);
                return x - y;
            });

            dispatch(setEmployeeID(Employee[0].employee_id));
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
                        !Employee ? <div className='flex justify-center items-center text-blue-500 pt-20'>Loading Employees...</div> :

                            Employee.map((e, index) => {
                                //console.log(e);
                                return (
                                    <StaffDetails Name={e.employee_name} Position={e.employee_designation} Contact={e.employee_mobile} Email={e.employee_email} key={e.employee_id} EmployeeId={e.employee_id} />
                                )
                            })
                    }

                    {/* <StaffDetails Name={"vishal savaliya"} Position={"Manager"} Contact={"9510342875"} Email={"vsavaliya1106@gmail.com"} key={1} EmployeeId={1} />
                    <StaffDetails Name={"vishal savaliya"} Position={"Manager"} Contact={"9510342875"} Email={"vsavaliya1106@gmail.com"} key={1} EmployeeId={1} />
                    <StaffDetails Name={"vishal savaliya"} Position={"Manager"} Contact={"9510342875"} Email={"vsavaliya1106@gmail.com"} key={1} EmployeeId={1} /> */}

                </div>

            </div>



            {/* Rightsidebar  */}




            <div className='hidden md:block md:basis-[30%] overflow-y-scroll h-screen'>

                <div>
                    <StaffSidebar />
                </div>

            </div>

            <div className={MDESidebar ? 'md:hidden w-[100%] absolute top-0 left-0 right-0 bottom-0 bg-white overflow-y-scroll h-screen' : 'hidden'}>

                <div className='flex justify-start mx-5 mt-5'>

                    <ArrowLongLeftIcon className='w-7 text-blue-500' onClick={() => { dispatch(setMDESidebar(false)) }} />

                </div>
                <div>
                    <StaffSidebar />
                </div>
            </div>





        </div>
    )
}

export default Staff