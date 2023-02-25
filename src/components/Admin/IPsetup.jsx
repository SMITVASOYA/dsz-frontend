import { useState, useEffect } from 'react';
import axios from 'axios';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function IPsetup() {


    const [Ip, setIp] = useState("");
    const [Ips, setIps] = useState([]);


    const fetchIps = () => {
        var config = {
            method: 'get',
            url: `${process.env.REACT_APP_HOST}/api/admin/ipAddresses`,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                var resData = response.data;

                if (resData.error) {
                    setIps([])
                } else {
                    setIps(resData.data);
                }
            })
            .catch(function (error) {
                // console.log(error);
                setIps([]);

            });
    }


    useEffect(() => {
        fetchIps();
    }, [])


    const AddIp = () => {
        var data = JSON.stringify({
            "data": {
                "ip_address": Ip
            }
        });

        var config = {
            method: 'post',
            url: `${process.env.REACT_APP_HOST}/api/admin/ipAddress`,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            data: data
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                var resdata = response.data;

                if (resdata.error) {

                    // var errordata = errorMessages[resdata.errorMessage];

                    Store.addNotification({
                        title: resdata.errorType,
                        message: resdata.errorMessage,
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
                        title: "Ip Added Successfully",
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

                    setIp("");
                    fetchIps();
                }

            })
            .catch(function (error) {
                // console.log(error);
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

    const HandelRemoveIp = (id) => {

        var config = {
            method: 'delete',
            url: `${process.env.REACT_APP_HOST}/api/admin/ipAddress/${id}`,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));

                var resdata = response.data;

                if (resdata.error) {

                    // var errordata = errorMessages[resdata.errorMessage];

                    Store.addNotification({
                        title: resdata.errorType,
                        message: resdata.errorMessage,
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
                        title: "Ip Removed Successfully",
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

                    fetchIps();
                }


            })
            .catch(function (error) {
                // console.log(error);
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
        <div className='py-5 px-5 bg-bg basis-[100%] md:basis-[83%]  overflow-y-scroll h-screen'>

            <h1 className='text-base'>Ip SetUp</h1>

            <div className='pt-5'>

                <div className='flex flex-col'>
                    <label className='label'>Add Ip Address</label>
                    <div>
                        <input className='md:w-[300px] Qinput' type="text" name="Ip" value={Ip} onChange={(e) => { setIp(e.target.value) }} />
                        <button className='px-4 py-1 bg-blue-500 text-white shadow-sm rounded-sm ml-2' onClick={() => { AddIp() }}>Add</button>
                    </div>
                </div>

            </div>

            <div className='pt-5'>

                <div className='flex flex-col'>
                    <label className='label'>Ip Address</label>
                    <div className='grid grid-cols-1 md:grid-cols-3 py-2'>
                        {
                            Ips && Ips.map((ip, index) => {
                                return (
                                    <div className='bg-white shadow-sm rounded-sm flex py-1 px-2 mx-2 my-1' key={index}>
                                        <p className='px-2 w-[10%]'>{ip.ip_addr_id}</p>
                                        <p className='w-[80%]'>{ip.ip_address}</p>
                                        <p className='w-[10%] text-red-500' onClick={() => { HandelRemoveIp(ip.ip_addr_id) }}>X</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}

export default IPsetup