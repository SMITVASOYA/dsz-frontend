import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fechActiveClients } from '../../Reducer/clientSlice';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { Store } from 'react-notifications-component';
import axios from 'axios';
import 'react-notifications-component/dist/theme.css';

function EditClientDitals({ visible, close }) {


    const dispatch = useDispatch()
    const ClientId = useSelector((state) => state.client.activeAClientId);
    const clients = useSelector((state) => state.client.Activeclients);
    const [ClientData, setClientData] = useState({})

    // selecting client clicked on view
    const Client = clients.filter((obj) => {
        return obj.client_id === parseInt(ClientId);
    })

    var ClientDetails = Client[0];

    // console.log(ClientDetails);


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

    // console.log(ClientDetails)

    useEffect(() => {
        setClientData({
            "client_name": ClientDetails.client_name ? ClientDetails.client_name : "",
            "client_mobile": ClientDetails.client_mobile ? ClientDetails.client_mobile : "",
            "client_email": ClientDetails.client_email ? ClientDetails.client_email : "",
            "client_shipping_address": ClientDetails.client_shipping_address ? ClientDetails.client_shipping_address : "",
            "client_billing_address": ClientDetails.client_billing_address ? ClientDetails.client_billing_address : "",
            "client_city": ClientDetails.client_city ? ClientDetails.client_city : "",
            "client_company_name": ClientDetails.client_company_name ? ClientDetails.client_company_name : "",
            "client_country_iso": ClientDetails.client_country_iso ? ClientDetails.client_country_iso : "",
            "client_state": ClientDetails.client_state ? ClientDetails.client_state : "",
            "client_gst_no": ClientDetails.client_gst_no ? ClientDetails.client_gst_no : "",
            "client_alternate_email": ClientDetails.client_alternate_email ? ClientDetails.client_alternate_email : "",
            "client_alternate_mobile": ClientDetails.client_alternate_mobile ? ClientDetails.client_alternate_mobile : ""
        })
        console.log("Details is set")
    }, [ClientDetails])



    console.log(ClientData);

    const HandelClientDetailInput = (e) => {

        var field = e.target.name;

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
            method: 'patch',
            url: `${process.env.REACT_APP_HOST}/api/client/${ClientDetails.client_id}`,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            data: data
        };

        console.log(config.url);

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
                        title: "Client Details Updated Successfully",
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

                    dispatch(fechActiveClients());


                }

            })
            .catch(function (error) {
                console.log(error);

                var resdata = error.response.data;

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

                }
            });
    }


    // const validateClient = (client) => {
    //     const clientSchema = Joi.object({
    //         client_email: Joi.string().email().min(3).max(320).required(),
    //         client_name: Joi.string().max(255),
    //         client_mobile: Joi.string()
    //             .max(255)
    //             .pattern(/^[0-9]+$/)
    //             .required(),
    //         client_shipping_address: Joi.string().max(1024),
    //         client_billing_address: Joi.string().max(1024),
    //         client_city: Joi.string().max(255),
    //         client_state: Joi.string().max(255),
    //         client_country_iso: Joi.string().max(255),
    //         client_company_name: Joi.string().max(255),
    //         client_gst_no: Joi.string().max(255),
    //         client_blocked: Joi.boolean(),
    //         client_alternate_email: Joi.string().max(1024),
    //         client_alternate_mobile: Joi.string().max(255),
    //     })

    //     return clientSchema.validate(client)
    // }

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center">

            <div className='w-[98%] md:w-[1000px] h-[85%] overflow-y-scroll bg-bg rounded-md'>


                <div className='sticky top-0 backdrop-blur-sm bg-bg bg-opacity-20'>
                    <div className='flex justify-between px-5 md:px-20 pt-5 pb-2'>
                        <h1 className='heading'>Add New Client</h1>
                        <XCircleIcon onClick={() => close(false)} className="w-8" />
                    </div>
                </div>

                <div className='md:px-28 px-5 pb-20 md:w-[950px]'>

                    <div className='flex flex-col'>
                        <label className='label'>Client Name</label>
                        <input className='NewEmployeeinput' type="text" name="client_name" onChange={(e) => { HandelClientDetailInput(e) }} value={ClientData.client_name} />
                    </div>

                    <div className='flex flex-col md:flex-row md:justify-between md:pt-3 md:pb-2'>

                        <div className='flex flex-col'>
                            <label className='label'>Email</label>
                            <input className='NewEmployeeinput md:w-[300px]' type="email" name="client_email" value={ClientData.client_email} />
                        </div>
                        <div className='flex flex-col'>
                            <label className='label'>Mobile No</label>
                            <input className='NewEmployeeinput md:w-[300px]' type="tel" name="client_mobile" value={ClientData.client_mobile} />
                        </div>

                    </div>
                    <div className='flex flex-col md:flex-row md:justify-between md:pt-3 md:pb-2'>

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

export default EditClientDitals