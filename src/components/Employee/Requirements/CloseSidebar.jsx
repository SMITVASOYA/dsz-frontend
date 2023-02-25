import { useState, useEffect } from 'react'
import Followup from './Followup'
import { usePopups } from '../../PopupsContext'
import SidebarClientinfo from './SidebarClientinfo';
import { fechCloseQuery, fechAssignQuery, fechLostQuery, fetchQuotations } from '../../../Reducer/querySclice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ReqDetails from './ReqDetails';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import ViewQuotation from '../../Popups/ViewQuotation';

function CloseSidebar({ EmployeeId }) {

    const dispatch = useDispatch();
    // const { chat } = usePopups();
    // const [ChatPopup, SetChatPopup] = chat;

    const [followups, setfollowups] = useState([]);

    // for view Quotation 
    const [visible, setvisible] = useState(false);
    const [QuotationFileName, setQuotationFileName] = useState("")



    const Querys = useSelector((state) => state.query.CloseQuery);
    const CQID = useSelector((state) => state.query.CQID);
    const Quotation = useSelector((state) => state.query.Quotations);
    const [QuotationData, setQuotationData] = useState({});

    useEffect(() => {

        var config = {
            method: 'get',
            url: `${process.env.REACT_APP_HOST}/api/followup/all/${CQID}`,
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
                    setfollowups([]);
                } else {
                    setfollowups(resData.data);
                    // console.log(resData)
                }
            })
            .catch(function (error) {
                // console.log(error);
                setfollowups([]);
            });

    }, [CQID]);

    //fatching Quotaions
    useEffect(() => {
        dispatch(fetchQuotations(CQID));
    }, [CQID])

    const HandelSendToRunning = () => {

        var data = JSON.stringify({
            "data": {
                "query_state": "running"
            }
        });

        var config = {
            method: 'patch',
            url: `${process.env.REACT_APP_HOST}/api/query/status/${CQID}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));

                var resdata = response.data;

                if (resdata.error) {

                    Store.addNotification({
                        title: "Not Able Updating Status Of Request",
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
                        title: "Request Sended To Running Successfully",
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
                    dispatch(fechCloseQuery(EmployeeId));
                    dispatch(fechAssignQuery(EmployeeId));
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

    const HandelSendToLost = () => {

        var data = JSON.stringify({
            "data": {
                "query_state": "lost"
            }
        });

        var config = {
            method: 'patch',
            url: `${process.env.REACT_APP_HOST}/api/query/status/${CQID}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));

                var resdata = response.data;

                if (resdata.error) {

                    Store.addNotification({
                        title: "Not Able updating status of request",
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
                        title: "Request sended in Lost Successfully",
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
                    dispatch(fechCloseQuery(EmployeeId));
                    dispatch(fechLostQuery(EmployeeId));
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

    if (!CQID || !Querys) {
        return <div className='flex justify-center items-center text-blue-500 mt-20'>Loading Requirement Details... </div>
    }


    const req = Querys.filter((obj) => {
        return obj.query_id === parseInt(CQID);
    })

    if (req.length === 0) {
        return <div className='flex justify-center items-center pt-20 text-blue-500'>No Requirement...</div>;
    }

    // console.log(req[0].client);

    return (
        <div className='mx-6 mt-10 flex flex-col text-[14px] text-black'>

            <div>

                <div>
                    <span className='flex items-center justify-between'>

                        <div className='flex'>
                            <h1 className="headline">{req[0].client.client_name}</h1>
                            <p className='mx-6 bg-gray-400  text-white px-2 rounded-sm font-medium'>
                                New
                            </p>
                        </div>

                        <div className='group relative' >
                            <p className='w-5 mr-3 hover:cursor-pointer'><EllipsisVerticalIcon /> </p>
                            <div className='hidden group-hover:block absolute top-2 right-3 bg-white shadow-md rounded-sm w-[150px]'>
                                <div className='p-1'>
                                    <li className='dropdownList' onClick={() => { HandelSendToRunning() }}>Send to Running</li>
                                    <li className='dropdownList' onClick={() => { HandelSendToLost() }}>Send to Lost</li>
                                    {/* <li className='dropdownList' onClick={() => { SetChatPopup(true) }}>Chat</li> */}
                                </div>
                            </div>
                        </div>

                    </span>

                    <div className='pt-2 text-gray-400'>
                        <p className=''>{req[0].client.client_email}</p>
                        <p>{req[0].client.client_mobile}</p>
                    </div>
                </div>

                <div className='pt-5'>
                    <h1 className='text-sm text-black'>{req[0].query_subject}</h1>
                </div>
            </div>


            <hr className='mx-auto my-2 mb-3 w-[60%] bg-blue-500 h-[2px]' />

            <h1 className='text-primary font-medium py-3'>Requirement Details</h1>


            {/* <h1 className='text-black font-medium py-2'>Query Details</h1> */}

            <ReqDetails Date={req[0].query_create_time.split("T")[0]} Time={req[0].query_create_time.split("T")[1].split(".")[0]} Message={req[0].query_message} Location={req[0].client.client_city} Source={req[0].query_source} Company={req[0].client.client_company_name} Address={req[0].client.client_shipping_address} BillingAddress={req[0].client.client_billing_address} />


            <hr className='mx-auto my-2 mb-3 w-[60%] bg-blue-500 h-[2px]' />

            <h1 className='text-primary font-medium py-3'>Follow Ups</h1>

            <div className='max-h-[350px] overflow-y-scroll'>

                {
                    followups.length === 0 ? <div className='flex justify-center items-center text-blue-500 h-[100px]'>No Followups...</div> :

                        (followups.map((fup, id) => {
                            return (
                                <Followup Date={fup.createdAt.split("T")[0]} Detail={fup.followup_text} key={id} FollowupNo={id + 1} State="Close" />
                            )
                        }))
                }

            </div>

            <h1 className='text-primary font-medium py-3'>Quotations</h1>

            <div className='max-h-[350px] overflow-y-scroll'>

                {
                    Quotation.length === 0 ? <div className='flex justify-center items-center text-blue-500 h-[100px]'>No Quotation...</div> :

                        (Quotation.map((q, id) => {
                            return (
                                <div className='text-sm flex flex-col bg-blue-100 text-blue-500 shadow-sm rounded-md my-2 mr-4 px-4 py-1' onClick={() => {
                                    setvisible(true);
                                    setQuotationFileName(q.generatedQuotationNumber.split("/")[0] + "-" + q.generatedQuotationNumber.split("/")[1]);
                                    setQuotationData(q);
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

            {/* <div className='flex flex-col mt-4'>
                <label className='text-primary'>Follow Up</label>
                <textarea className="my-2 pl-2 h-6 outline-none border-b-2 border-green-500" type="text" ></textarea>
                <button className='px-4 py-2 mb-2 mx-2 bg-primary text-white font-medium rounded-md shadow-md' >Save</button>
            </div > */}

            {/* <div className='mt-8 mb-5 text-[14px]'>
                <div className='flex flex-col justify-center items-center'>
                    <button onClick={() => SetChatPopup(true)} className='w-[95%] px-4 py-2 bg-green-500 text-white font-medium rounded-md shadow-md'>Chat</button>
                </div>
            </div> */}

            <ViewQuotation visible={visible} file={QuotationFileName} close={setvisible} data={QuotationData} />

        </div>
    )
}

export default CloseSidebar