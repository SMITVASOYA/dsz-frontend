import { useState, useEffect } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useDispatch } from 'react-redux';
import { fechEmployees, setEmployeeID } from '../../Reducer/employeeSlice';

function EditEmployeeDetails({ visible, close, Employee, Employee_Bank_info }) {



    const dispatch = useDispatch();

    const [EmployeeDetails, setEmployeeDetails] = useState({
        "employee_name": "",
        "employee_designation": "",
        "employee_doj": "",
        "employee_mobile": "",
        "employee_office_email": "",
        "employee_email": "",
        "employee_password": "",
        "employee_dob": "",
        "employee_address": "",
        "employee_relieve_date": "",
        "employee_department": "",
        "employee_isAdmin": false
    });

    const [Employee_Bank_Details, setEmployee_Bank_Details] = useState({
        "employee_name_as_in_bank": "",
        "bank_info_name": "",
        "bank_info_branch_name": "",
        "bank_info_ifsc_code": "",
        "employee_id": "",
        "bank_account_no": ""
    });

    const errorMessages = {
        "Validation Error": {
            title: "Validation Error",
            message: "Please enter Valid Details",
        },
        "Employee Aldready Exists": {
            title: "Employee Aldready Exists",
            message: "Please Enter uniqe MobileNo and EmailId",
        },
    }


    useEffect(() => {


        var preEmployee = {
            "employee_name": Employee.employee_name,
            "employee_designation": Employee.employee_designation,
            "employee_doj": Employee.employee_doj,
            "employee_mobile": Employee.employee_mobile + "",
            "employee_office_email": Employee.employee_office_email,
            "employee_email": Employee.employee_email,
            // "employee_password": Employee.employee_password,
            "employee_password": "",
            "employee_dob": Employee.employee_dob,
            "employee_address": Employee.employee_address,
            "employee_relieve_date": Employee.employee_relieve_date,
            "employee_department": Employee.employee_department,
            "employee_isAdmin": Employee.employee_isAdmin === 0 ? false : true
        }

        setEmployeeDetails(preEmployee);

        var preBankInfo = {
            "employee_name_as_in_bank": Employee_Bank_info.employee_name_as_in_bank,
            "bank_info_name": Employee_Bank_info.bank_info_name,
            "bank_info_branch_name": Employee_Bank_info.bank_info_branch_name,
            "bank_info_ifsc_code": Employee_Bank_info.bank_info_ifsc_code,
            "employee_id": Employee.employee_id,
            "bank_account_no": Employee_Bank_info.bank_account_no
        }

        setEmployee_Bank_Details(preBankInfo);

    }, [visible])


    const HandelEmployeeDetailsInput = (e) => {

        var field = e.target.name;
        var val = e.target.value;

        var preData = { ...EmployeeDetails };
        preData[field] = val;
        setEmployeeDetails(preData);

    }

    const HandelBankInfoInput = (e) => {

        var field = e.target.name;
        var val = e.target.value;

        var preData = { ...Employee_Bank_Details };
        preData[field] = val;
        setEmployee_Bank_Details(preData);

    }

    const HandelSaveEmployeeDetails = () => {

        var data = JSON.stringify({
            "data": EmployeeDetails
        });


        console.log(EmployeeDetails)

        var config = {
            method: 'patch',
            url: `${process.env.REACT_APP_HOST}/api/employee/` + Employee.employee_id,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));

                var resdata = response.data;

                if (resdata.error) {

                    // var errordata = errorMessages[resdata.errorMessage];

                    Store.addNotification({
                        title: resdata.errorMessage,
                        message: "Somthing Went Wrong",
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

                } else {

                    Store.addNotification({
                        title: "Employee Details Updated Successfully",
                        message: "Success",
                        type: "success",
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


    const handelSubmitSaveBankInfo = () => {
        // console.log(BankData);

        var data = JSON.stringify({
            "data": Employee_Bank_Details
        });

        console.log(Employee_Bank_Details);

        var config = {
            method: 'put',
            url: `${process.env.REACT_APP_HOST}/api/employee/bankinfo/`,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.status);
                // console.log(JSON.stringify(response.data));

                var resdata = response.data;

                if (resdata.error) {

                    var errordata = errorMessages[resdata.errorMessage];

                    Store.addNotification({
                        title: errordata.title,
                        message: errordata.message,
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

                } else {

                    Store.addNotification({
                        title: "Bank Details Updated Successfully",
                        message: "Success",
                        type: "success",
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


    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center">

            <div className='w-[1000px] h-[85%] overflow-y-scroll bg-bg rounded-md'>


                <div className='sticky top-0 backdrop-blur-sm bg-bg bg-opacity-20'>
                    <div className='flex justify-between px-20 pt-5 pb-2'>
                        <h1 className='heading'>Edit Employee Details</h1>
                        <XCircleIcon onClick={() => {
                            dispatch(fechEmployees());
                            dispatch(setEmployeeID(Employee.employee_id));
                            close(false)
                        }}
                            className="w-8" />
                    </div>
                </div>

                <div className='px-28 pb-20 w-[950px]'>


                    <div className='flex flex-col'>
                        <label className='label'>Name</label>
                        <input className='NewEmployeeinput' type="text" name="employee_name" value={EmployeeDetails.employee_name} onChange={(e) => { HandelEmployeeDetailsInput(e) }} />
                    </div>

                    <div className='flex flex-col'>
                        <label className='label'>Mobile No</label>
                        <input className='NewEmployeeinput' type="text" name="employee_mobile" value={EmployeeDetails.employee_mobile} onChange={(e) => { HandelEmployeeDetailsInput(e) }} />
                    </div>

                    <div className='flex flex-col'>
                        <label className='label'>Office Mail</label>
                        <input className='NewEmployeeinput' type="email" name="employee_office_email" value={EmployeeDetails.employee_office_email} onChange={(e) => { HandelEmployeeDetailsInput(e) }} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='label'>Email</label>
                        <input className='NewEmployeeinput' type="email" name="employee_email" value={EmployeeDetails.employee_email} onChange={(e) => { HandelEmployeeDetailsInput(e) }} />
                    </div>

                    <div className='flex justify-between pt-3 pb-2'>

                        <div className='flex flex-col'>
                            <label className='label'>Designation</label>
                            <input className='NewEmployeeinput' type="text" name="employee_designation" value={EmployeeDetails.employee_designation} onChange={(e) => { HandelEmployeeDetailsInput(e) }} />
                            {/* <select id="designation" name="employee_designation" className='NewEmployeeinput  w-[300px]'>
                                    <option value="Managing Director">Managing Director</option>
                                    <option value="Sales Manager">Sales Manager</option>
                                    <option value="Sales Executive">Sales Executive</option>
                                    <option value="Account Executive">Account Executive</option>
                                    <option value="Sales Field">Sales Field</option>
                                    <option value="Hr">Hr</option>
                                    <option value="Hr-Admin">Hr-Admin</option>
                                    <option value="Back office ">Back office </option>
                                    <option value="Sales/Field Executive">Sales/Field Executive</option>
                                </select> */}
                        </div>


                        <div className='flex flex-col'>
                            <label className='label'>Date of Birth</label>
                            <input className='NewEmployeeinput w-[300px]' type="date" name="employee_dob" value={EmployeeDetails.employee_dob} onChange={(e) => { HandelEmployeeDetailsInput(e) }} />
                        </div>

                    </div>



                    <div className='flex justify-between py-3'>

                        <div className='flex flex-col'>
                            <label className='label'>Joining Date</label>
                            <input className='NewEmployeeinput w-[300px]' type="date" name="employee_doj" value={EmployeeDetails.employee_doj} onChange={(e) => { HandelEmployeeDetailsInput(e) }} />
                        </div>
                        <div className='flex flex-col'>
                            <label className='label'>Relieve Date</label>
                            <input className='NewEmployeeinput w-[300px]' type="date" name="employee_relieve_date" value={EmployeeDetails.employee_relieve_date} onChange={(e) => { HandelEmployeeDetailsInput(e) }} />
                        </div>

                    </div>

                    <div className='flex flex-col'>
                        <label className='label'>Resident Address</label>
                        <textarea className='NewEmployeeinput h-[100px]' type="text" name="employee_address" value={EmployeeDetails.employee_address} onChange={(e) => { HandelEmployeeDetailsInput(e) }}></textarea>
                    </div>

                    <div className='flex flex-col'>
                        <label className='label'>Password</label>
                        <input className='NewEmployeeinput' type="text" name="employee_password" value={EmployeeDetails.employee_password} onChange={(e) => { HandelEmployeeDetailsInput(e) }} />
                    </div>

                    <div>
                        <button className='py-2 px-6 mt-10 bg-blue-500 text-white font-medium rounded-md shadow-sm' onClick={() => { HandelSaveEmployeeDetails() }}>Save</button>
                    </div>

                    <h1 className='headline text-[18px] pt-9 pb-4'>Bank Details</h1>

                    <div className='flex flex-col'>
                        <label className='label'>Name (given in bank)</label>
                        <input className='NewEmployeeinput' type="text" name="employee_name_as_in_bank" value={Employee_Bank_Details.employee_name_as_in_bank} onChange={(e) => { HandelBankInfoInput(e) }} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='label'>Bank Name</label>
                        <input className='NewEmployeeinput' type="text" name="bank_info_name" value={Employee_Bank_Details.bank_info_name} onChange={(e) => { HandelBankInfoInput(e) }} />
                    </div>

                    <div className='flex flex-col'>
                        <label className='label'>Branch Name</label>
                        <input className='NewEmployeeinput' type="text" name="bank_info_branch_name" value={Employee_Bank_Details.bank_info_branch_name} onChange={(e) => { HandelBankInfoInput(e) }} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='label'>Account No</label>
                        <input className='NewEmployeeinput' type="text" name="bank_account_no" value={Employee_Bank_Details.bank_account_no} onChange={(e) => { HandelBankInfoInput(e) }} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='label'>ISFC Code</label>
                        <input className='NewEmployeeinput' type="text" name="bank_info_ifsc_code" value={Employee_Bank_Details.bank_info_ifsc_code} onChange={(e) => { HandelBankInfoInput(e) }} />
                    </div>

                    <div>
                        <button className='py-2 px-6 mt-10 bg-blue-500 text-white font-medium rounded-md shadow-sm' onClick={() => { handelSubmitSaveBankInfo() }}>Save</button>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default EditEmployeeDetails;