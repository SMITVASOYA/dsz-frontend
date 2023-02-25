import { useState } from 'react';
import axios from 'axios'
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useSelector } from 'react-redux';

function AddEmplotyee() {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var date = yyyy + "-" + mm + "-" + dd;

    const [BankDetails, setBankDetails] = useState(false);
    const Auth = useSelector((state) => state.user.auth);

    const [IsAdmin, setIsAdmin] = useState(false);
    const [IsHr, setIsHr] = useState(false);


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

    const [Data, setData] = useState({
        "employee_name": "",
        "employee_designation": "Managing Director",
        "employee_doj": "",
        "employee_mobile": "",
        "employee_office_email": "",
        "employee_email": "",
        "employee_password": "",
        "employee_dob": "",
        "employee_address": "",
        "employee_relieve_date": date,
        "employee_department": "Employee",
        "employee_isAdmin": IsAdmin,
        "employee_isHR": IsHr,
    })


    const [BankData, setBankData] = useState({
        "bank_info_name": "",
        "bank_info_branch_name": "",
        "bank_info_ifsc_code": "",
        "employee_name_as_in_bank": "",
        "bank_account_no": "",
        "employee_id": "",
    })

    const HandelEmployeeDetailInput = (e) => {

        var field = e.target.name;
        // console.log(field);

        var preData = { ...Data };
        preData[field] = e.target.value;
        setData(preData);

        // console.log(Data);
    }

    const HandelBankDetailInput = (e) => {
        var field = e.target.name;
        var preData = { ...BankData };
        preData[field] = e.target.value;
        setBankData(preData);
    }


    const handelSubmitCreateEmployee = () => {

        console.log(Data);

        var data = JSON.stringify({
            "data": Data
        });

        var config = {
            method: 'post',
            url: `${process.env.REACT_APP_HOST}/api/employee`,
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

                    var preData = { ...BankData };
                    preData.employee_id = resdata.data.employee_id;
                    setBankData(preData);

                    Store.addNotification({
                        title: "Please Add bank Details of Employee",
                        message: "  ",
                        type: "default",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                    });

                    Store.addNotification({
                        title: "Employee Created Successfully",
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

                    setBankDetails(true);

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

    const HandelOnCheck = (e) => {
        var field = e.target.name;

        console.log(field);

        var preData = { ...Data };
        if (field === "employee_isAdmin") {
            preData[field] = !IsAdmin;
            setIsAdmin(!IsAdmin);

        } else {
            preData[field] = !IsHr;
            setIsHr(!IsHr);
        }
        setData(preData);

    }

    // console.log(Data);


    const handelSubmitAddBankInfo = () => {
        // console.log(BankData);

        var data = JSON.stringify({
            "data": BankData
        });

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
                        title: "Bank Details Added Successfully",
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

                    // setBankDetails(true);

                    setBankData({
                        "bank_info_name": "",
                        "bank_info_branch_name": "",
                        "bank_info_ifsc_code": "",
                        "employee_name_as_in_bank": "",
                        "bank_account_no": "",
                        "employee_id": "",
                    });

                    setData({
                        "employee_name": "",
                        "employee_designation": "Managing Director",
                        "employee_doj": "",
                        "employee_mobile": "",
                        "employee_office_email": "",
                        "employee_email": "",
                        "employee_password": "",
                        "employee_dob": "",
                        "employee_address": "",
                        "employee_relieve_date": date,
                        "employee_department": "Employee",
                        "employee_isAdmin": false,
                        "employee_isHR": false
                    });

                }

            })
            .catch(function (error) {
                console.log(error);

                console.log(error.response.data)
                console.log(error.response.status)

                Store.addNotification({
                    title: "Somting Went Wrong...",
                    message: "Server Side Error",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
            });
    }


    return (
        <div className='basis-[100%]  md:basis-[83%] bg-bg overflow-y-scroll h-screen'>

            <h1 className='px-5 md:px-14 pt-9 pb-4 headline'>Create New Employee</h1>

            <div className='px-5 md:px-28 pb-20 md:w-[950px]'>

                <>
                    <div className='flex flex-col'>
                        <label className='label'>Name</label>
                        <input className='NewEmployeeinput' type="text" name="employee_name" onChange={(e) => { HandelEmployeeDetailInput(e) }} value={Data.employee_name} />
                    </div>

                    <div className='flex flex-col'>
                        <label className='label'>Mobile No</label>
                        <input className='NewEmployeeinput' type="text" name="employee_mobile" onChange={(e) => { HandelEmployeeDetailInput(e) }} value={Data.employee_mobile} />
                    </div>

                    <div className='flex flex-col'>
                        <label className='label'>Office Mail</label>
                        <input className='NewEmployeeinput' type="email" name="employee_office_email" onChange={(e) => { HandelEmployeeDetailInput(e) }} value={Data.employee_office_email} />
                    </div>

                    <div className='flex flex-col'>
                        <label className='label'>Email</label>
                        <input className='NewEmployeeinput' type="email" name="employee_email" onChange={(e) => { HandelEmployeeDetailInput(e) }} value={Data.employee_email} />
                    </div>

                    <div className='flex flex-col'>
                        <label className='label'>Login Password</label>
                        <input className='NewEmployeeinput' type="text" name="employee_password" onChange={(e) => { HandelEmployeeDetailInput(e) }} value={Data.employee_password} />
                    </div>

                    <div className='flex flex-col md:flex-row md:justify-between md:pt-3 md:pb-2'>

                        <div className='flex flex-col'>
                            <label className='label'>Designation</label>
                            <input className='NewEmployeeinput' type="text" name="employee_designation" onChange={(e) => { HandelEmployeeDetailInput(e) }} value={Data.employee_designation} />
                        </div>


                        <div className='flex flex-col'>
                            <label className='label'>Department</label>
                            <select id="department" name="employee_department" className='NewEmployeeinput w-full bg-white md:w-[300px]' onChange={(e) => { HandelEmployeeDetailInput(e) }} value={Data.employee_department}>
                                <option value="Employee">Employee</option>
                                <option value="hr">Hr Department</option>
                                <option value="Not Required">Not Required</option>
                            </select>
                        </div>

                    </div>


                    {
                        Auth === "Admin" ?

                            <div className='flex flex-col md:flex-row md:justify-start pt-5 md:pb-2'>

                                <div className='flex items-center'>
                                    <input className='ml-2' type="checkbox" value={Data.employee_isAdmin} name="employee_isAdmin" defaultChecked={false} onChange={(e) => { HandelOnCheck(e) }} />
                                    <label className='label py-0'>Is Admin</label>
                                </div>

                                <div className='flex items-center md:ml-20 mt-3 md:mt-0'>
                                    <input type="checkbox" value={Data.employee_isHR} name="employee_isHR" defaultChecked={false} onChange={(e) => { HandelOnCheck(e) }} className="ml-2" />
                                    <label className='label py-0'>Is Hr</label>
                                </div>

                            </div> : <div className='flex items-center py-3 '>
                                <input type="checkbox" value={Data.employee_isHR} name="employee_isHR" defaultChecked={false} onChange={(e) => { HandelOnCheck(e) }} className="ml-2" />
                                <label className='label py-0'>Is Hr</label>
                            </div>

                    }

                    <div className='flex flex-col md:flex-row md:justify-between md:py-3'>

                        <div className='flex flex-col'>
                            <label className='label'>Joining Date</label>
                            <input className='NewEmployeeinput bg-white w-full md:w-[300px]' type="date" name="employee_doj" onChange={(e) => { HandelEmployeeDetailInput(e) }} value={Data.employee_doj} />
                        </div>

                        <div className='flex flex-col'>
                            <label className='label'>Date of Birth</label>
                            <input className='NewEmployeeinput bg-white w-full md:w-[300px]' type="date" name="employee_dob" onChange={(e) => { HandelEmployeeDetailInput(e) }} value={Data.employee_dob} />
                        </div>

                    </div>

                    <div className='flex flex-col'>
                        <label className='label'>Resident Address</label>
                        <textarea className='NewEmployeeinput h-[100px]' type="text" name="employee_address" onChange={(e) => { HandelEmployeeDetailInput(e) }} value={Data.employee_address}></textarea>
                    </div>

                    <div>
                        <button className='py-2 px-6 mt-10 bg-green-500 text-white font-medium rounded-md shadow-sm' onClick={() => { handelSubmitCreateEmployee() }}>Create Employee</button>
                    </div>

                    {
                        BankDetails && (

                            <>
                                <h1 className='headline text-[18px] pt-9 pb-4'>Bank Details</h1>

                                <div className='flex flex-col'>
                                    <label className='label'>Name (given in bank)</label>
                                    <input className='NewEmployeeinput' type="text" name="employee_name_as_in_bank" onChange={(e) => { HandelBankDetailInput(e) }} value={BankData.employee_name_as_in_bank} />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='label'>Bank Name</label>
                                    <input className='NewEmployeeinput' type="text" name="bank_info_name" onChange={(e) => { HandelBankDetailInput(e) }} value={BankData.bank_info_name} />
                                </div>

                                <div className='flex flex-col'>
                                    <label className='label'>Branch Name</label>
                                    <input className='NewEmployeeinput' type="text" name="bank_info_branch_name" onChange={(e) => { HandelBankDetailInput(e) }} value={BankData.bank_info_branch_name} />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='label'>Account No</label>
                                    <input className='NewEmployeeinput' type="text" name="bank_account_no" onChange={(e) => { HandelBankDetailInput(e) }} value={BankData.bank_account_no} />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='label'>ISFC Code</label>
                                    <input className='NewEmployeeinput' type="text" name="bank_info_ifsc_code" onChange={(e) => { HandelBankDetailInput(e) }} value={BankData.bank_info_ifsc_code} />
                                </div>

                                <div>
                                    <button className='pb-10 md:pb-2 py-2 px-6 mt-10 bg-green-500 text-white font-medium rounded-md shadow-sm ' onClick={() => { handelSubmitAddBankInfo() }}>Submit</button>
                                </div>
                            </>

                        )
                    }


                </>

            </div>
        </div>
    )
}

export default AddEmplotyee