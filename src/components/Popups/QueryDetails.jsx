import React, { useState, useEffect } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import ViewQuotation from './ViewQuotation';
import Followup from '../Employee/Requirements/Followup';
import axios from 'axios'
import ReqDetails from '../Employee/Requirements/ReqDetails';

function QueryDetails({ visible, close, QueryId, Query, Client }) {

    const [followups, setfollowups] = useState([]);
    const [Quotation, setQuotation] = useState([]);

    // for view Quotation 
    const [visibleQuotatoin, setvisible] = useState(false);
    const [QuotationFileName, setQuotationFileName] = useState("")
    const [QuotationData, setQuotationData] = useState({});




    useEffect(() => {
        var config = {
            method: 'get',
            url: `${process.env.REACT_APP_HOST}/api/followup/all/${QueryId}`,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                const resData = response.data;

                if (resData.error) {
                    // console.log(resData.error);
                } else {
                    setfollowups(resData.data);
                    // console.log(resData)
                }
            })
            .catch(function (error) {
                // console.log(error);
            });

    }, [QueryId]);


    //fatching Quotaions
    useEffect(() => {

        var config = {
            method: 'get',
            url: `${process.env.REACT_APP_HOST}/api/quotation/all/${QueryId}`,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                const resData = response.data;

                if (resData.error) {
                    // console.log(resData.error);
                    setQuotation([])
                } else {
                    setQuotation(resData.data)
                }
            })
            .catch(function (error) {
                // console.log(error);
                setQuotation([])
            });

    }, [QueryId])

    if (!visible || !Query) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center">

            <div className='w-[98%] md:w-[1000px] h-[82%] md:h-[85%] overflow-y-scroll bg-bg rounded-md'>


                <div className='sticky top-0 backdrop-blur-sm bg-bg bg-opacity-20'>
                    <div className='flex justify-between px-5 md:px-20 pt-5 pb-2'>
                        <h1 className='heading'>Query Details</h1>
                        <XCircleIcon onClick={() => close(false)} className="w-8" />
                    </div>
                </div>

                <div className='mx-10 my-3 mt-10 font-normal'>

                    <div>

                        <div>
                            <span className='flex items-center justify-between'>

                                <div className='flex'>
                                    <h1 className="headline">{Client.client_name}</h1>
                                    <p className='mx-6 bg-gray-400  text-white px-2 rounded-sm font-medium'>
                                        New
                                    </p>
                                </div>
                            </span>

                            <div className='pt-2 text-gray-400'>
                                <p className=''>{Client.client_email}</p>
                                <p>{Client.client_mobile}</p>
                            </div>
                        </div>

                        <div className='pt-5'>
                            <h1 className='text-primary font-medium py-3 mt-5'>Requirement</h1>
                            <h1 className='text-sm text-black'>{Query.query_subject}</h1>
                        </div>
                    </div>


                    <hr className='mx-auto mt-4 mb-3 w-[10%] bg-blue-500 h-[2px]' />

                    <h1 className='text-primary font-medium py-3 mt-5 pb-4'>Requirement Details</h1>


                    {/* <h1 className='text-black font-medium py-2'>Query Details</h1> */}

                    <div className='md:mr-14'>



                        {/* section No 2 */}

                        <div className='pb-1'>

                            <div>
                                <h1 className='text-gray-400'>Inquiry on</h1>
                                <p>{Query.query_create_time.split("T")[0]} {Query.query_create_time.split("T")[1].split(".")[0]}</p>
                            </div>

                            <div className='pt-2'>
                                <h1 className='text-gray-400'>Message</h1>
                                <p className='text-[14px] text-justify pr-4'>{Query.query_message}</p>
                            </div>


                        </div>

                        {/* section no 3 */}

                        {/* <hr className='mx-auto my-2 mb-3 w-[60%] bg-blue-500 h-[2px]' /> */}

                        <div>
                            <div className='flex justify-between w-[90%] py-3'>
                                <div>
                                    <h1 className='text-gray-400'>Location</h1>
                                    <p>{Client.client_city}</p>
                                </div>

                                <div>
                                    <h1 className='text-gray-400'>Source</h1>
                                    <p>{Query.query_source}</p>
                                </div>
                            </div>

                            <div className='pt-2'>
                                <h1 className='text-gray-400'>Company Name</h1>
                                <p className='text-black'>{Client.client_company_name}</p>
                            </div>

                            <div className='pt-2'>
                                <h1 className='text-gray-400'>Shipping Address</h1>
                                <p className='text-black pr-4'>{Client.client_shipping_address}</p>
                            </div>

                            <div className='py-2'>
                                <h1 className='text-gray-400'>Billing Address</h1>
                                <p className='text-black pr-4'>{Client.client_billing_address}</p>
                            </div>
                        </div>


                    </div>

                    <hr className='mx-auto mt-10 mb-1 w-[10%] bg-blue-500 h-[2px]' />


                    <h1 className='text-primary font-medium py-3'>Follow Ups</h1>

                    <div className='grid md:grid-cols-3'>

                        {
                            followups.length === 0 ? <div className='flex justify-center items-center text-black h-[100px]'>No Followups...</div> :

                                (followups.map((fup, id) => {
                                    return (
                                        <Followup Date={fup.createdAt.split("T")[0]} Detail={fup.followup_text} key={id} FollowupNo={id + 1} State="Lost" />
                                    )
                                }))
                        }

                    </div>

                    <hr className='mx-auto mt-10 mb-1 w-[10%] bg-blue-500 h-[2px]' />

                    <h1 className='text-primary font-medium py-3'>Quotations</h1>

                    <div className='grid md:grid-cols-3'>

                        {
                            Quotation.length === 0 ? <div className='flex justify-center items-center text-black h-[100px]'>No Quotation...</div> :

                                (Quotation.map((q, id) => {
                                    return (
                                        <div className='text-sm flex flex-col bg-blue-100 text-blue-500 shadow-sm rounded-md my-2 mr-4 px-4 py-1' onClick={() => {
                                            setQuotationFileName(q.generatedQuotationNumber.split("/")[0] + "-" + q.generatedQuotationNumber.split("/")[1]);
                                            setQuotationData(q);
                                            setvisible(true);
                                        }}>
                                            <p className='py-1'>{q.createdAt.split("T")[0]}</p>
                                            <div>
                                                <p>{q.generatedQuotationNumber}</p>
                                            </div>
                                        </div>
                                    )
                                }))
                        }

                    </div>

                </div>

            </div>

            <ViewQuotation visible={visibleQuotatoin} file={QuotationFileName} close={setvisible} data={QuotationData} />

        </div>
    )
}

export default QueryDetails