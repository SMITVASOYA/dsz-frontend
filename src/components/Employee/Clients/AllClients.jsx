import { useEffect, useState } from 'react'
import ClientDetails from '../ClientDetails';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fechActiveClients } from '../../../Reducer/clientSlice';
import { fechBlockClients } from '../../../Reducer/clientSlice';


function AllClients({ SearchInput, SortType, Status }) {

    // const [All_Clients, setAll_Clients] = useState([])
    const dispatch = useDispatch();


    useEffect(() => {


        dispatch(fechActiveClients());
        dispatch(fechBlockClients());

        // console.log("fatching data");

    }, [])


    const All_Active_Clients = useSelector((state) => state.client.Activeclients);
    const All_Block_Clients = useSelector((state) => state.client.Blockclients);
    var All_Clients = undefined;

    if (Status === 0) {
        All_Clients = All_Active_Clients;
    } else {
        All_Clients = All_Block_Clients;
    }

    // console.log(All_Clients);

    if (SearchInput) {
        All_Clients = All_Clients.filter(({ client_name }) => client_name && client_name.toLowerCase().includes(SearchInput.toLowerCase()))
    }

    if (SortType && All_Clients) {

        if (SortType === "A-Z") {

            All_Clients = All_Clients.slice().sort(function (a, b) {
                const nameA = a.client_name.toUpperCase();
                const nameB = b.client_name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
                // console.log(a.query_subject, b.query_subject)
            });

        } else if (SortType === "N-O") {

            All_Clients = All_Clients.slice().sort((x, y) => {
                x = new Date(x.createdAt);
                y = new Date(y.createdAt);
                return y - x;
            });

        } else if (SortType === "O-N") {
            All_Clients = All_Clients.slice().sort((x, y) => {
                x = new Date(x.createdAt);
                y = new Date(y.createdAt);
                return x - y;
            });
        }
    }

    if ((SearchInput || SortType) && (!All_Clients || All_Clients.length === 0)) {
        return <div className='flex justify-center items-center pt-20 text-blue-500'>No Client with matching filter...</div>;
    }

    // if (!All_Clients) {
    //     return <div className='flex justify-center items-center mt-20 text-blue-500'>Loading Clients...</div>
    // }

    // return null;

    return (

        <div className='my-5 overflow-y-scroll h-screen'>

            {

                All_Clients && All_Clients.map((c, index) => {

                    return (
                        < ClientDetails Username={c.client_name} Email={c.client_email} MobileNo={c.client_mobile} Company={c.client_industry} Status={"New"} IsActive={Status} key={index} ClientId={c.client_id} />
                    )


                })
            }


            {/* <ClientDetails Username={"vishal savaliya"} Email={"vsleitan@gmail.com"} MobileNo={"95102345666"} Company={"Leitan Developers"} Status={"New"} IsActive={0} key={1} ClientId={1} />
            <ClientDetails Username={"vishal patel"} Email={"vsleitan@gmail.com"} MobileNo={"95102345666"} Company={"Leitan Developers"} Status={"New"} IsActive={1} key={1} ClientId={1} />
            <ClientDetails Username={"vishal haha"} Email={"vsleitan@gmail.com"} MobileNo={"95102345666"} Company={"Leitan Developers"} Status={"New"} IsActive={0} key={1} ClientId={1} />
            <ClientDetails Username={"vishal savaliya"} Email={"vsleitan@gmail.com"} MobileNo={"95102345666"} Company={"Leitan Developers"} Status={"New"} IsActive={1} key={1} ClientId={1} /> */}



        </div>
    )
}

export default AllClients