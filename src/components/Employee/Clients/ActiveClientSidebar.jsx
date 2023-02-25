import { useState, useEffect } from 'react';
import Orders from '../Orders';
import EditClientDitals from '../../Popups/EditClient';
import { useDispatch, useSelector } from 'react-redux';
import { fechActiveClients, fechBlockClients } from '../../../Reducer/clientSlice';
import { usePopups } from '../../PopupsContext';
import axios from 'axios';
import {
    EllipsisVerticalIcon,
} from '@heroicons/react/24/outline'
import QueryDetails from '../../Popups/QueryDetails';

function ActiveClientSidebar() {

    const dispatch = useDispatch();
    const ClientId = useSelector((state) => state.client.activeAClientId);
    const data = useSelector((state) => state.client);
    const clients = data.Activeclients;

    const { EditClient } = usePopups();
    const [EditClientDetails, SetEditClientDetails] = EditClient;

    //view Query Details
    const [visible, setvisible] = useState(false);
    const [QueryDetailsId, setQueryDetailsId] = useState(undefined);
    const [QueryDetail, setQueryDetail] = useState(undefined);

    // console.log(ClientId);

    const [query, setquery] = useState([]);
    const [invoice, setinvoice] = useState([]);


    const fetchInvoic = () => {

        var config = {
            method: 'get',
            url: `${process.env.REACT_APP_HOST}/api/invoice/${ClientId}`,
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
                    setinvoice([]);
                } else {
                    setinvoice(resData.data.invoice_data);
                    // console.log(resData.data)
                }

            })
            .catch(function (error) {
                // console.log(error);
                setinvoice([]);
            });

    }

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
                    setquery([]);
                } else {
                    setquery(resData.data.queries);
                    // console.log(resData.data)
                }
            })
            .catch(function (error) {
                setquery([]);
                // console.log(error);
            });

        fetchInvoic();

    }, [ClientId])




    if (!clients || !ClientId) {
        return <div className='flex justify-center items-center mt-20 text-blue-500'>Loading...</div>
    }

    // selecting client clicked on view
    const ClientData = clients.filter((obj) => {
        return obj.client_id === parseInt(ClientId);
    })



    const HandelBlock = () => {

        var config = {
            method: 'patch',
            url: `${process.env.REACT_APP_HOST}/api/client/${ClientId}/block`,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));

                dispatch(fechActiveClients());
                dispatch(fechBlockClients());
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    // return null;

    return (
        <div className='mx-6 mt-10 felx flex-col text-black overflow-y-scroll'>

            <div>
                <span className='flex items-center'>
                    <div className='flex'>
                        <h1 className="headline">{ClientData[0].client_name}</h1>
                        <p className='mx-6 bg-gray-400  text-white px-2 rounded-sm font-medium'>New</p>
                    </div>

                    <div className='group relative' >
                        <p className='w-5 mr-3 hover:cursor-pointer'><EllipsisVerticalIcon /> </p>
                        <div className='hidden group-hover:block absolute top-2 right-3 bg-white shadow-md rounded-sm w-[150px]'>
                            <div className='py-1'>
                                <li className='hover:bg-blue-400 hover:text-white hover:cursor-pointer list-none px-2' onClick={() => SetEditClientDetails(true)}>Edit Client</li>
                            </div>
                        </div>
                    </div>

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
                            <div className='shadow-md text-sm m-2 px-3 py-5 rounded-sm hover:cursor-pointer' key={index} onClick={
                                () => {
                                    setQueryDetailsId(q.query_id);
                                    setQueryDetail(q);
                                    setvisible(true);

                                }
                            }>
                                <div className='flex justify-between'>
                                    <div>
                                        <h1 className=''>Inquiry Id</h1>
                                        <p className='text-black font-medium'>{q.query_id}</p>
                                    </div>
                                    <div>
                                        <h1 className=''>Inquiry Date</h1>
                                        <p className='text-black font-medium'>{q.createdAt.split("T")[0]}</p>
                                    </div>
                                    <span className='bg-blue-100 text-primary px-2 py-1 h-[50%] rounded-sm'>{q.query_state}</span>
                                </div>

                                <div className='pt-2'>
                                    <h1>Order Details</h1>
                                    <p className='text-black font-medium'>{q.query_subject}</p>
                                </div>

                            </div>
                        )
                    }) : <p className='mt-[45%] text-center'>No Orders from clients</p>
                }

            </div>

            <hr className='mx-auto my-3 mb-3 w-[60%] bg-indigo-500 h-[2px]' />

            <h1 className='text-blue-500'>Invoices</h1>

            <div className='flex flex-col h-[40vh] overflow-y-scroll mr-2'>

                {
                    invoice.length === 0 ? <div className='flex justify-center items-center text-black h-[100px]'>No invoices...</div> :

                        (invoice.map((q, id) => {
                            return (
                                <div className='text-sm flex flex-col bg-blue-100 text-blue-500 shadow-sm rounded-md my-2 mr-4 px-4 py-1'>
                                    {/* <p className='py-1'>{q.createdAt.split("T")[0]}</p> */}
                                    <div>
                                        <p>{q.generatedInvoiceNumber}</p>
                                    </div>
                                </div>
                            )
                        }))
                }

            </div>


            <div className='mt-6 mb-8 text-[14px]'>
                <div className='flex items-center'>
                    {/* <button className='px-4 py-2 bg-primary text-white font-medium rounded-md shadow-md' >Create invoice</button> */}
                    <button className='ml-2 px-4 py-2 bg-rose-500 text-white font-medium rounded-md shadow-md' onClick={() => { HandelBlock() }}>Block Client</button>
                </div>
            </div>

            <EditClientDitals visible={EditClientDetails} close={SetEditClientDetails} />

            <QueryDetails visible={visible} close={setvisible} QueryId={QueryDetailsId} Query={QueryDetail} Client={ClientData[0]} />

        </div>
    )
}

export default ActiveClientSidebar