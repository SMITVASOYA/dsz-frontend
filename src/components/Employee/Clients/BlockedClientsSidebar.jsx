import React from 'react'
import { useState, useEffect } from 'react';
import Orders from '../Orders';
import { useDispatch, useSelector } from 'react-redux';
import { fechActiveClients, fechBlockClients } from '../../../Reducer/clientSlice';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import axios from 'axios';

function BlockedClientsSidebar() {

    const dispatch = useDispatch();
    const ClientId = useSelector((state) => state.client.activeBClientId);
    const data = useSelector((state) => state.client);
    const clients = data.Blockclients;

    const [query, setquery] = useState([]);

    useEffect(() => {
        var config = {
            method: 'get',
            url: `${process.env.REACT_APP_HOST}/api/query/all/client/${ClientId}`,
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
                    setquery(resData.data);
                    // console.log(resData)
                }
            })
            .catch(function (error) {
                // console.log(error);
            });

    }, [ClientId])


    if (!clients || !ClientId) {
        return <div className='flex justify-center items-center mt-20 text-blue-500'>Loading...</div>
    }

    // selecting client clicked on view
    const ClientData = clients.filter((obj) => {
        return obj.client_id === parseInt(ClientId);
    })

    if (!ClientData) {
        return <div className='flex justify-center items-center mt-20 text-blue-500'>Loading...</div>;
    }



    const HandelUnblock = () => {


        var config = {
            method: 'patch',
            url: `${process.env.REACT_APP_HOST}/api/client/${ClientId}/unblock`,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));

                dispatch(fechBlockClients());
                dispatch(fechActiveClients());
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
        <div className='mx-6 mt-10 felx flex-col text-black'>

            <div>
                <span className='flex items-center'>
                    <h1 className="headline">{ClientData[0].client_name}</h1>
                    <p className='mx-6 bg-gray-400  text-white px-2 rounded-sm font-medium'>New</p>
                </span>

                <div className='pt-2 text-[14px] text-gray-400'>
                    <p className=''>{ClientData[0].client_email}</p>
                    <p>{ClientData[0].client_mobile}</p>
                </div>
            </div>

            <hr className='mx-auto my-3 mb-3 w-[60%] bg-indigo-500 h-[2px]' />


            {/* section No 2 Orers*/}



            <div className='flex flex-col h-[60vh] overflow-y-scroll  mr-2'>

                {
                    query.length > 0 ? query.map((q, index) => {
                        return (
                            < Orders OrderId={q.query_id} OrderDate={q.createdAt.split("T")[0]} OrderSatus={q.query_state} OrderDetails={q.query_subject} key={index} />
                        )
                    }) : <p className='mt-[45%] text-center'>No Orders from clients</p>
                }

            </div>


            <div className='mt-6 mb-8 text-[14px]'>
                <div className='flex items-center'>
                    {/* <button className='px-4 py-2 bg-primary text-white font-medium rounded-md shadow-md' >Create Quotation</button> */}
                    <button className='ml-2 px-4 py-2 bg-rose-500 text-white font-medium rounded-md shadow-md' onClick={() => { HandelUnblock() }}>Unblock</button>
                </div>
            </div>

        </div>
    )
}

export default BlockedClientsSidebar