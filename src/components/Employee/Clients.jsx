import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "../TabSelector";
import AllClients from './Clients/AllClients';
import BlockedClientsSidebar from './Clients/BlockedClientsSidebar';
import ActiveClientSidebar from './Clients/ActiveClientSidebar';
import ClientSerachbar from './Clients/ClientSerachbar';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';
import { setMDCSidebar } from "../../Reducer/clientSlice";



function Users({ Input, searchHandler }) {


    const [selectedTab, setSelectedTab] = useTabs([
        "Active",
        "Blocked",
    ]);

    const dispatch = useDispatch();

    const SearchInput = useSelector((state) => state.filters.CInput);
    const SortType = useSelector((state) => state.filters.CSortType);
    const MDCSidebar = useSelector((state) => state.client.MDCSidebar);


    return (

        <div className='basis-[100%] md:basis-[83%] flex h-screen'>

            {/* main content  */}

            <div className='w-full relative md:basis-[70%] bg-bg'>

                <nav className="flex ml-3 my-4">
                    <TabSelector
                        isActive={selectedTab === "Active"}
                        onClick={() => setSelectedTab("Active")}
                    >
                        Active
                    </TabSelector>
                    <TabSelector
                        isActive={selectedTab === "Blocked"}
                        onClick={() => setSelectedTab("Blocked")}
                    >
                        Blocked
                    </TabSelector>
                </nav>


                {/* <SearchBar  /> */}
                <ClientSerachbar Input={Input} searchHandler={searchHandler} />

                {/* requests  */}

                <div>
                    <TabPanel hidden={selectedTab !== "Active"}><AllClients SearchInput={SearchInput} SortType={SortType} Status={0} /></TabPanel>
                    <TabPanel hidden={selectedTab !== "Blocked"}><AllClients SearchInput={SearchInput} SortType={SortType} Status={1} /></TabPanel>

                </div>



            </div>



            {/* Rightsidebar  */}

            <div className='hidden md:block md:basis-[30%]'>

                <div>
                    <TabPanel hidden={selectedTab !== "Active"}><ActiveClientSidebar /></TabPanel>
                    <TabPanel hidden={selectedTab !== "Blocked"}><BlockedClientsSidebar /></TabPanel>
                </div>

            </div>


            {/* for mobile */}

            <div className={MDCSidebar ? 'md:hidden w-[100%] absolute top-0 left-0 right-0 bottom-0 bg-white overflow-y-scroll h-screen' : 'hidden'}>

                <div className='flex justify-start mx-5 mt-5'>

                    <ArrowLongLeftIcon className='w-7 text-blue-500' onClick={() => { dispatch(setMDCSidebar(false)) }} />

                </div>

                <div>
                    <TabPanel hidden={selectedTab !== "Active"}><ActiveClientSidebar /></TabPanel>
                    <TabPanel hidden={selectedTab !== "Blocked"}><BlockedClientsSidebar /></TabPanel>
                </div>

            </div>

        </div>
    )
}

export default Users