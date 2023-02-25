import React from 'react';
import { useState, useEffect } from 'react'
import {
    XCircleIcon
} from '@heroicons/react/24/outline'
import axios from 'axios';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { fechAssignQuery, setAQID } from '../../Reducer/querySclice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function EditQuery({ visible, close, ReqDetails, EmployeeId }) {

    const dispatch = useDispatch();

    const AQID = useSelector((state) => state.query.AQID);

    useEffect(() => {

        setReqData({

            "client_id": ReqDetails.client_id,
            "employee_id": ReqDetails.employee_id,
            "query_source": ReqDetails.query_source,
            "query_create_time": Date.parse(ReqDetails.query_create_time) / 1000,
            "query_subject": ReqDetails.query_subject,
            "query_product": ReqDetails.query_product,
            "query_message": ReqDetails.query_message,
            "query_state": ReqDetails.query_state

        })

    }, [visible, AQID, ReqDetails])



    const [ReqData, setReqData] = useState(
        {
            "client_id": ReqDetails.client_id,
            "employee_id": ReqDetails.employee_id,
            "query_source": ReqDetails.query_source,
            "query_create_time": Date.parse(ReqDetails.query_create_time) / 1000,
            "query_subject": ReqDetails.query_subject,
            "query_product": ReqDetails.query_product,
            "query_message": ReqDetails.query_message,
            "query_state": ReqDetails.query_state
        }
    )

    // console.log(ReqData);

    const HandelReqDetailsinput = (e) => {
        var field = e.target.name;

        var preData = { ...ReqData };
        preData[field] = e.target.value;
        setReqData(preData);

    }

    const HandelEditReq = (e) => {

        // console.log(ReqData);

        var data = JSON.stringify({
            "data": ReqData
        });


        var config = {
            method: 'patch',
            url: `${process.env.REACT_APP_HOST}/api/query/` + AQID,
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
                        title: "Requirement Updated Successfully",
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
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center">

                <div className='w-[98%] md:w-[1000px] h-[82%] md:h-[85%] overflow-y-scroll bg-bg rounded-md'>

                    <div className='sticky top-0 backdrop-blur-sm bg-bg bg-opacity-20'>
                        <div className='flex justify-between px-5 md:px-20 pt-5 pb-2'>
                            <h1 className='heading'>Edit Requirement</h1>
                            <XCircleIcon onClick={() => { dispatch(fechAssignQuery(EmployeeId)); dispatch(setAQID(AQID)); close(false) }} className="w-8" />
                        </div>
                    </div>

                    <div className='w-[95%] px-5 md:px-28 pb-20 md:w-[950px]'>

                        <div className='flex flex-col'>
                            <label className='label'>Requirements</label>
                            <input className='NewEmployeeinput' type="text" name="query_subject" onChange={(e) => { HandelReqDetailsinput(e) }} value={ReqData.query_subject} />
                        </div>

                        <div className='flex flex-col'>
                            <label className='label'>Product</label>
                            <input className='NewEmployeeinput' type="text" name="query_product" onChange={(e) => { HandelReqDetailsinput(e) }} value={ReqData.query_product} />
                        </div>

                        <div className='flex flex-col'>
                            <label className='label'>Source</label>
                            <input className='NewEmployeeinput' type="text" name="query_source" onChange={(e) => { HandelReqDetailsinput(e) }} value={ReqData.query_source} />
                        </div>


                        <div className='flex flex-col'>
                            <label className='label'>Message</label>
                            <textarea className='NewEmployeeinput h-[100px]' type="text" name="query_message" onChange={(e) => { HandelReqDetailsinput(e) }} value={ReqData.query_message} ></textarea>
                        </div>

                        <div>
                            <button className='py-2 px-6 mt-10 bg-green-500 text-white font-medium rounded-md shadow-sm ' onClick={(e) => { HandelEditReq(e) }}>Submit</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditQuery