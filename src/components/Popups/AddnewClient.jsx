import { useState } from 'react'
import {
    XCircleIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useDispatch } from 'react-redux';
import { fechActiveClients } from '../../Reducer/clientSlice';

function AddnewClient({ visible, close }) {


    const dispatch = useDispatch()


    const errorMessages = {
        "Validation Error": {
            title: "Validation Error",
            message: "Please enter Valid Details",
        },
        "Client Already Exists": {
            title: "Client Already Exists",
            message: "Please Enter uniqe MobileNo and EmailId",
        },
        "Server Error": {
            title: "Server Error",
            message: "Internal Server Error"
        }
    }

    const [MobileExist, setMobileExist] = useState(false)
    const [EmailExist, setEmailExist] = useState(false)
    const [ClientData, setClientData] = useState({
        "client_name": "",
        "client_mobile": "",
        "client_email": "",
        "client_shipping_address": "",
        "client_billing_address": "",
        "client_city": "",
        "client_company_name": "",
        "client_country_iso": "",
        "client_state": "",
        "client_gst_no": "",
        "client_alternate_email": "",
        "client_alternate_mobile": "",

    })

    const HandelClientDetailInput = (e) => {

        var field = e.target.name;

        if (field === "client_mobile") {
            var config = {
                method: 'get',
                url: `${process.env.REACT_APP_HOST}/api/client/check?client_mobile=${e.target.value}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    if (response.data.error) {
                        if (response.data.errorType === "Conflict") {
                            setMobileExist(true);
                        } else {
                            setMobileExist(false);
                        }
                    } else {
                        setMobileExist(false);
                    }
                })
                .catch(function (error) {
                    console.log(error.response.data);
                    if (error.response.data.error) {
                        if (error.response.data.errorType === "Conflict") {
                            setMobileExist(true);
                        } else {
                            setMobileExist(false);
                        }
                    } else {
                        setMobileExist(false);
                    }
                });
        }

        if (field === "client_email") {
            var config = {
                method: 'get',
                url: `${process.env.REACT_APP_HOST}/api/client/check?client_email=${e.target.value}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    if (response.data.error) {
                        if (response.data.errorType === "Conflict") {
                            setEmailExist(true);
                        } else {
                            setEmailExist(false);
                        }
                    } else {
                        setEmailExist(false);
                    }
                })
                .catch(function (error) {
                    console.log(error.response.data);
                    if (error.response.data.error) {
                        if (error.response.data.errorType === "Conflict") {
                            setEmailExist(true);
                        } else {
                            setEmailExist(false);
                        }
                    } else {
                        setEmailExist(false);
                    }
                });
        }

        var preData = { ...ClientData };
        preData[field] = e.target.value;
        setClientData(preData);

        // console.log(ClientData)

    }

    const HandelCreateClient = () => {
        // console.log(ClientData);

        var data = JSON.stringify({
            "data": ClientData
        });

        var config = {
            method: 'post',
            url: `${process.env.REACT_APP_HOST}/api/client`,
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

                    Store.addNotification({
                        title: "Client Created Successfully",
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

                    setClientData({
                        "client_name": "",
                        "client_mobile": "",
                        "client_email": "",
                        "client_shipping_address": "",
                        "client_billing_address": "",
                        "client_city": "",
                        "client_industry": "",
                        "client_country_iso": "",
                        "client_state": "",
                        "client_gst_no": "",
                        "client_alternate_email": "",
                        "client_alternate_mobile": "",
                    })

                    dispatch(fechActiveClients());


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

            <div className='w-[95%] md:w-[1000px] h-[80%] md:h-[85%] overflow-y-scroll bg-bg rounded-md'>

                <div className='sticky top-0 backdrop-blur-sm bg-bg bg-opacity-20'>
                    <div className='flex justify-between px-3 md:px-20 pt-5 pb-2'>
                        <h1 className='heading'>Add New Client</h1>
                        <XCircleIcon onClick={() => close(false)} className="w-8" />
                    </div>
                </div>

                <div className='w-[95%] px-5 md:px-28 pb-20 md:w-[950px]'>

                    <div className='flex flex-col'>
                        <label className='label'>Client Name</label>
                        <input className='NewEmployeeinput' type="text" name="client_name" onChange={(e) => { HandelClientDetailInput(e) }} value={ClientData.client_name} />
                    </div>

                    <div className='flex flex-col md:flex-row md:justify-between pt-3 pb-2'>

                        <div className='flex flex-col'>
                            <label className='label'>Email {EmailExist ? <span className='pl-3 text-xs text-red-500'>"Email Id Already Exists"</span> : null}</label>
                            <input className='NewEmployeeinput md:w-[300px]' type="email" name="client_email" onChange={(e) => { HandelClientDetailInput(e) }} value={ClientData.client_email} />
                        </div>
                        <div className='flex flex-col'>
                            <label className='label'>Mobile No {MobileExist ? <span className='pl-3 text-xs text-red-500'>"Mobile No Already Exists"</span> : null}</label>
                            <input className='NewEmployeeinput md:w-[300px]' type="tel" name="client_mobile" onChange={(e) => { HandelClientDetailInput(e) }} value={ClientData.client_mobile} />
                        </div>

                    </div>
                    <div className='flex flex-col md:flex-row md:justify-between  pt-2 pb-3'>

                        <div className='flex flex-col'>
                            <label className='label'>Alternate Email</label>
                            <input className='NewEmployeeinput md:w-[300px]' type="email" name="client_alternate_email" onChange={(e) => { HandelClientDetailInput(e) }} value={ClientData.client_alternate_email} />
                        </div>
                        <div className='flex flex-col'>
                            <label className='label'>Alternate Mobile No</label>
                            <input className='NewEmployeeinput md:w-[300px]' type="tel" name="client_alternate_mobile" onChange={(e) => { HandelClientDetailInput(e) }} value={ClientData.client_alternate_mobile} />
                        </div>

                    </div>

                    <div className='flex flex-col'>
                        <label className='label'>City</label>
                        <input className='NewEmployeeinput' type="text" name="client_city" onChange={(e) => { HandelClientDetailInput(e) }} value={ClientData.client_city} />
                    </div>

                    <div className='flex flex-col'>
                        <label className='label'>State</label>
                        <input className='NewEmployeeinput' type="text" name="client_state" onChange={(e) => { HandelClientDetailInput(e) }} value={ClientData.client_state} />
                    </div>

                    <div className='flex flex-col'>
                        <label className='label'>Client Country ISO</label>
                        <input className='NewEmployeeinput' type="text" name="client_country_iso" onChange={(e) => { HandelClientDetailInput(e) }} value={ClientData.client_country_iso} />
                    </div>

                    <div className='flex flex-col'>
                        <label className='label'>Company Name</label>
                        <input className='NewEmployeeinput' type="text" name="client_company_name" onChange={(e) => { HandelClientDetailInput(e) }} value={ClientData.client_company_name} />
                    </div>

                    <div className='flex flex-col'>
                        <label className='label'>GSTN</label>
                        <input className='NewEmployeeinput' type="text" name="client_gst_no" onChange={(e) => { HandelClientDetailInput(e) }} value={ClientData.client_gst_no} />
                    </div>

                    <div className='flex flex-col'>
                        <label className='label'>Shipping Address</label>
                        <textarea className='NewEmployeeinput h-[100px]' type="text" name="client_shipping_address" onChange={(e) => { HandelClientDetailInput(e) }} value={ClientData.client_shipping_address} ></textarea>
                    </div>
                    <div className='flex flex-col'>
                        <label className='label'>Billing Address</label>
                        <textarea className='NewEmployeeinput h-[100px]' type="text" name="client_billing_address" onChange={(e) => { HandelClientDetailInput(e) }} value={ClientData.client_billing_address} ></textarea>
                    </div>

                    <div>
                        <button className='py-2 px-6 mt-10 bg-green-500 text-white font-medium rounded-md shadow-sm' onClick={() => { HandelCreateClient() }} >Submit</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default AddnewClient