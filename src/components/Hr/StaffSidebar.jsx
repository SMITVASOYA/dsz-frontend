import { useState, useEffect } from 'react'
import {
    EllipsisVerticalIcon,
} from '@heroicons/react/24/outline'
import { usePopups } from '../PopupsContext';
import EditEmployeeDetails from '../Popups/EditEmployeeDetails';
import axios from 'axios';
import { useSelector } from 'react-redux';


function StaffSidebar() {


    const { employee } = usePopups();
    const [EditStaffDetails, SetEditStaffDetails] = employee;



    const EmployeeId = useSelector((state) => state.employee.employeeId)
    const Employees = useSelector((state) => state.employee.employees);

    const [BankDetails, setBankDetails] = useState({})

    useEffect(() => {

        var config = {
            method: 'get',
            url: `${process.env.REACT_APP_HOST}/api/employee/bankinfo/` + EmployeeId,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        };

        // console.log(config.url)
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                var resData = response.data;
                if (resData.error) {
                    console.log(resData.errorMessage);
                    setBankDetails({});
                } else {
                    setBankDetails(resData.data);
                }
            })
            .catch(function (error) {
                // console.log(error);
                setBankDetails({});
            });

    }, [EmployeeId])


    if (!EmployeeId || !Employees) {
        return <div className='flex justify-center items-center text-blue-500 pt-20'>Loading Employees...</div>
    }

    const Employee = Employees.filter((obj) => {
        return obj.employee_id === parseInt(EmployeeId);
    })

    const Data = Employee[0];

    // console.log(Data)

    if (!Data) {
        return <div className='flex justify-center items-center text-blue-500 pt-20'>Loading Employees...</div>
    }


    return (
        <div className='mx-6 mt-10 felx flex-col text-[14px] text-black'>

            <div>

                <span className='flex items-center justify-between'>
                    <h1 className="headline">{Data.employee_name}</h1>
                    <p className='w-5 mr-3'><EllipsisVerticalIcon /> </p>
                </span>

                <div className='pt-2 text-gray-400'>
                    <p>{Data.employee_email}</p>
                    <p>{Data.employee_mobile}</p>
                </div>

            </div>


            <hr className='mx-auto my-4 mb-3 w-[60%] bg-indigo-500 h-[2px]' />



            <div className=''>

                {/* section No 2 */}

                <div className='pb-1 mt-7'>

                    <div className='flex justify-between w-[90%] py-2'>
                        <div>
                            <h1 className='text-gray-400'>Date of Joinonig</h1>
                            <p>{Data.employee_doj}</p>
                        </div>

                        <div>
                            <h1 className='text-gray-400'>Relieve Date</h1>
                            <p>--</p>
                        </div>
                    </div>

                    <div className='pt-2'>
                        <h1 className='text-gray-400'>Office Mail</h1>
                        <p className='text-black'>{Data.employee_office_email}</p>
                    </div>

                </div>

                {/* section no 3 */}

                <hr className='mx-auto my-3 w-[60%] bg-indigo-500 h-[2px]' />

                <div className='mt-7'>
                    <div className='flex justify-between w-[90%] py-2'>
                        <div>
                            <h1 className='text-gray-400'>DOB</h1>
                            <p>{Data.employee_dob}</p>
                        </div>

                        <div>
                            <h1 className='text-gray-400'>Mobile No</h1>
                            <p>{Data.employee_mobile}</p>
                        </div>
                    </div>

                    <div className='pt-2'>
                        <h1 className='text-gray-400'>Email</h1>
                        <p className='text-black'>{Data.employee_email}</p>
                    </div>

                    <div className='py-2'>
                        <h1 className='text-gray-400'>Address</h1>
                        <p className='text-black pr-4'>{Data.employee_address}</p>
                    </div>
                </div>



                <hr className='mx-auto my-3 w-[60%] bg-indigo-500 h-[2px]' />

                <div className='mt-7 mb-8'>

                    <div className='py-1'>
                        <h1 className='text-gray-400'>Name (Given in Bank)</h1>
                        <p className='text-black'>{BankDetails.employee_name_as_in_bank}</p>
                    </div>

                    <div className='py-1'>
                        <h1 className='text-gray-400'>Bank Name</h1>
                        <p className='text-black'>{BankDetails.bank_info_name}</p>
                    </div>

                    <div className='py-1'>
                        <h1 className='text-gray-400'>Branch Name</h1>
                        <p className='text-black'>{BankDetails.bank_info_branch_name}</p>
                    </div>

                    <div className='py-1'>
                        <h1 className='text-gray-400'>Account No</h1>
                        <p className='text-black'>{BankDetails.bank_account_no}</p>
                    </div>
                    <div className='py-1'>
                        <h1 className='text-gray-400'>IFSC Code</h1>
                        <p className='text-black'>{BankDetails.bank_info_ifsc_code}</p>
                    </div>
                </div>

            </div>

            <div className='my-6 mx-auto text-[14px]'>

                <button className='px-4 py-2 w-[95%] mx-auto bg-primary text-white font-medium rounded-md shadow-md' onClick={() => { SetEditStaffDetails(true) }} >Edit</button>

            </div>

            <EditEmployeeDetails visible={EditStaffDetails} close={SetEditStaffDetails} Employee={Data} Employee_Bank_info={BankDetails} />


        </div>
    )
}

export default StaffSidebar