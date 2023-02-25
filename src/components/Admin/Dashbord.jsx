import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function Dashbord() {


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hours = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    var minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();

    var date = yyyy + '-' + mm + '-' + dd;

    const [Data, setData] = useState({});
    const [Dates, setDates] = useState({
        "starting_date": date,
        "end_date": date,
        "end_time": hours + ":" + minutes + ":00"
    })

    const HandelClickOnDate = (e) => {
        var val = e.target.innerText;
        var starting_date = date;
        var end_date = "";

        if (val === "Today") {
            end_date = date;
        } else if (val === "Weekly") {

            var _today = new Date();

            var day = _today.getDay() || 7;
            if (day !== 1)
                _today.setHours(-24 * (day - 1));

            // _today = _today.setDate(diff);
            var _dd = String(_today.getDate()).padStart(2, '0');
            var _mm = String(_today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var _yyyy = _today.getFullYear();

            starting_date = _yyyy + "-" + _mm + "-" + _dd;
            end_date = date;
        }
        else if (val === "Monthly") {
            starting_date = yyyy + '-' + mm + '-01';
            end_date = date;

        } else if (val === "Yearly") {
            starting_date = yyyy + '-01-01';
            end_date = date;
        }

        setDates({
            "starting_date": starting_date,
            "end_date": end_date,
            "end_time": hours + ":" + minutes + ":00"
        })

        console.log(Dates);
    }


    useEffect(() => {

        var config = {
            method: 'get',
            url: `${process.env.REACT_APP_HOST}/api/admin/stats?start_time=${Dates.starting_date} 00:00:00&end_time=${Dates.end_date} ${Dates.end_time}`,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        };

        // console.log(config.url);

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));

                var resdata = response.data;

                if (resdata.error) {

                    Store.addNotification({
                        title: resdata.errorType,
                        message: resdata.errorMessage,
                        type: "warning",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 4000,
                            onScreen: true
                        }
                    });

                } else {
                    setData(resdata.data);
                    console.log(resdata.data);
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

    }, [Dates])




    return (
        <div className='basis-[100%] pb-20 md:mb-0 md:basis-[83%] flex flex-col bg-bg h-screen'>

            <h1 className='text-xl font-medium text-black pt-5 pb-3 pl-3 mt-5 border-b border-gray-400 mx-7'>DashBoard</h1>

            <div className='w-auto bg-[#ffffffa2] mx-5  md:mx-7 my-6 rounded-lg shadow-sm h-full md:w-auto'>

                <div className='text-sm flex justify-start mx-4 mt-3 md:text-base'>

                    <div className='group'>
                        <button className='text-gray-700 px-2 md:px-5 pt-3 pb-2 focus:text-black focus:font-medium focus:border-b border-blue-500 hover:cursor-pointer focus' onClick={(e) => { HandelClickOnDate(e) }}>Today</button>
                    </div>
                    <div className='group'>
                        <button className='text-gray-700 px-2 md:px-5 pt-3 pb-2 focus:text-black focus:font-medium focus:border-b border-blue-500 hover:cursor-pointer' onClick={(e) => { HandelClickOnDate(e) }}>Weekly</button>
                    </div>
                    <div className='group'>
                        <button className='text-gray-700 px-2 md:px-5 pt-3 pb-2 focus:text-black focus:font-medium focus:border-b border-blue-500 hover:cursor-pointer' onClick={(e) => { HandelClickOnDate(e) }}>Monthly</button>
                    </div>
                    <div className='group'>
                        <button className='text-gray-700 px-2 md:px-5 pt-3 pb-2 focus:text-black focus:font-medium focus:border-b border-blue-500 hover:cursor-pointer' onClick={(e) => { HandelClickOnDate(e) }}>Yearly</button>
                    </div>

                </div>

                <div className='ml-5 flex flex-col justify-start items-start mt-10 h-[70%] overflow-y-scroll'>


                    <h1 className='text-black text-lg mx-1 py-2'>Requirements</h1>
                    <div className='flex justify-start flex-wrap'>
                        {
                            Data.no_of_queries !== undefined && Data.no_of_queries.reverse().map((obj, id) => {
                                return (
                                    <div className='w-[150px] h-[100px] shadow-md rounded-md flex flex-col justify-center items-center mx-2 my-4 flex-nowrap bg-[#ffffff]' key={id}>
                                        <p className='text-blue-400 text-4xl'>{obj.count}</p>
                                        <h1 className='text-2xl text-blue-500'>{obj.query_state}</h1>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <h1 className='text-black text-lg mx-1 py-2'>Clients</h1>
                    <div className='flex justify-start flex-wrap'>

                        {
                            Data.no_of_clients !== undefined && Data.no_of_clients.reverse().map((obj, id) => {
                                return (
                                    <div className='w-[150px] h-[100px] shadow-md rounded-md flex flex-col justify-center items-center mx-2 my-4 flex-nowrap bg-[#ffffff]' key={id}>
                                        <p className='text-indigo-400 text-4xl'>{obj.count}</p>
                                        <h1 className='text-lg text-indigo-500'>{obj.client_blocked === 1 ? "Active Clients" : "Blocked Clients"}</h1>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <h1 className='text-black text-lg mx-1 py-2'>Quotations</h1>
                    <div className='flex justify-start'>

                        <div className='w-[150px] h-[100px] shadow-md rounded-md flex flex-col justify-center items-center mx-2 my-4 flex-nowrap bg-[#ffffff]'>
                            <p className='text-green-400 text-4xl'>{Data.no_of_quotations}</p>
                            <h1 className='text-lg text-green-500'>Quotations</h1>
                        </div>

                    </div>



                </div>
            </div>

        </div>
    )
}

export default Dashbord