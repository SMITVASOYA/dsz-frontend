import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setHrInputFilter, setHrSortFilterType } from '../../Reducer/filtersSlice';


function HrSearchbar({ HrInput, HrSearchHandler }) {


    const dispatch = useDispatch();

    const [InputVal, setInputVal] = useState("");

    const HandelInputChange = (e) => {
        dispatch(setHrInputFilter(e.target.value));
        setInputVal(e.target.value);
    }

    const HandelSearchIconClick = () => {
        HrSearchHandler();
        dispatch(setHrInputFilter(""))
    }

    return (

        <>

            <div className='hidden md:flex justify-between mx-5 mt-7'>

                <h1 className='flex items-center text-xl font-medium text-black'>Staff</h1>


                <input type="text" className={HrInput ? 'hidden' : 'display grow ml-4 bg-bg outline-none pl-3 border-b-2 border-primary'} onChange={(e) => { HandelInputChange(e) }} />


                <div className='flex'>

                    <span className='w-9 flex justify-center items-center ml-2 rounded-md bg-blue-300 hover:cursor-pointer' onClick={() => { InputVal.length > 0 ? dispatch(setHrInputFilter(InputVal)) : HandelSearchIconClick(); }} >
                        <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.1251 20.125L15.826 15.8183M18.2084 10.0625C18.2084 12.2229 17.3502 14.2949 15.8226 15.8225C14.2949 17.3501 12.223 18.2084 10.0626 18.2084C7.90217 18.2084 5.83025 17.3501 4.30261 15.8225C2.77497 14.2949 1.91675 12.2229 1.91675 10.0625C1.91675 7.90211 2.77497 5.83019 4.30261 4.30255C5.83025 2.77491 7.90217 1.91669 10.0626 1.91669C12.223 1.91669 14.2949 2.77491 15.8226 4.30255C17.3502 5.83019 18.2084 7.90211 18.2084 10.0625V10.0625Z" stroke="#1D90F3" stroke-width="2" stroke-linecap="round" />
                        </svg>

                    </span>
                    <div className='group relative'>

                        <span className='w-9 flex justify-center items-center mx-3 rounded-md bg-blue-300 hover:cursor-pointer'>
                            <svg width="18" height="40" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.3125 4.86457H16.6875V6.30207H2.3125V4.86457ZM5.54688 9.41668H13.4531V10.8542H5.54688V9.41668ZM7.70312 13.9688H11.2969V15.4062H7.70312V13.9688ZM0.15625 0.3125H18.8438V1.75H0.15625V0.3125Z" fill="#1D90F3" />
                            </svg>
                        </span>
                        <div className='hidden group-hover:block absolute top-8 left-[-60%] mx-auto bg-white shadow-lg rounded-sm w-[180px]'>
                            <div className='m-1 text-sm'>
                                <li className='dropdownList' onClick={() => { dispatch(setHrSortFilterType("A-Z")) }}>A-Z</li>
                                <li className='dropdownList' onClick={() => { dispatch(setHrSortFilterType("Z-A")) }}>Z-A</li>
                                <li className='dropdownList' onClick={() => { dispatch(setHrSortFilterType("N-O")) }}>⬇New-Old</li>
                                <li className='dropdownList' onClick={() => { dispatch(setHrSortFilterType("O-N")) }}>⬆Old-New</li>
                                <li className='dropdownList' onClick={() => { dispatch(setHrSortFilterType(undefined)) }}>Clear Filter</li>
                            </div>
                        </div>

                    </div>

                    <Link to={"/hr/Addmember"} >
                        <button className='px-4 py-2 bg-primary/95 text-base font-medium text-white rounded-md shadow-sm'> Add New </button>
                    </Link>
                </div>

            </div>

            <div className='md:hidden flex flex-col mx-5 mt-7'>


                <div className='flex justify-between'>
                    <h1 className='flex items-center text-xl font-medium text-black'>Staff</h1>
                    <Link to={"/hr/Addmember"} >
                        <button className='px-4 py-2 bg-primary/95 text-base font-medium text-white rounded-md shadow-sm'> Add New </button>
                    </Link>
                </div>


                <div className='flex justify-end mt-2'>

                    <input type="text" className={HrInput ? 'hidden' : 'display grow ml-4 bg-bg outline-none pl-3 border-b-2 border-primary'} onChange={(e) => { HandelInputChange(e) }} />

                    <div>
                        <span className='w-9 flex justify-center items-center ml-2 rounded-md bg-blue-300 hover:cursor-pointer' onClick={() => { InputVal.length > 0 ? dispatch(setHrInputFilter(InputVal)) : HandelSearchIconClick(); }} >
                            <svg width="18" height="40" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.1251 20.125L15.826 15.8183M18.2084 10.0625C18.2084 12.2229 17.3502 14.2949 15.8226 15.8225C14.2949 17.3501 12.223 18.2084 10.0626 18.2084C7.90217 18.2084 5.83025 17.3501 4.30261 15.8225C2.77497 14.2949 1.91675 12.2229 1.91675 10.0625C1.91675 7.90211 2.77497 5.83019 4.30261 4.30255C5.83025 2.77491 7.90217 1.91669 10.0626 1.91669C12.223 1.91669 14.2949 2.77491 15.8226 4.30255C17.3502 5.83019 18.2084 7.90211 18.2084 10.0625V10.0625Z" stroke="#1D90F3" stroke-width="2" stroke-linecap="round" />
                            </svg>
                        </span>
                    </div>

                    <div className='group relative'>

                        <span className='w-9 flex justify-center items-center ml-3 rounded-md bg-blue-300 hover:cursor-pointer'>
                            <svg width="18" height="40" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.3125 4.86457H16.6875V6.30207H2.3125V4.86457ZM5.54688 9.41668H13.4531V10.8542H5.54688V9.41668ZM7.70312 13.9688H11.2969V15.4062H7.70312V13.9688ZM0.15625 0.3125H18.8438V1.75H0.15625V0.3125Z" fill="#1D90F3" />
                            </svg>
                        </span>
                        <div className='hidden group-hover:block absolute top-8 left-[-60%] mx-auto bg-white shadow-lg rounded-sm w-[180px]'>
                            <div className='m-1 text-sm'>
                                <li className='dropdownList' onClick={() => { dispatch(setHrSortFilterType("A-Z")) }}>A-Z</li>
                                <li className='dropdownList' onClick={() => { dispatch(setHrSortFilterType("Z-A")) }}>Z-A</li>
                                <li className='dropdownList' onClick={() => { dispatch(setHrSortFilterType("N-O")) }}>⬇New-Old</li>
                                <li className='dropdownList' onClick={() => { dispatch(setHrSortFilterType("O-N")) }}>⬆Old-New</li>
                                <li className='dropdownList' onClick={() => { dispatch(setHrSortFilterType(undefined)) }}>Clear Filter</li>
                            </div>
                        </div>

                    </div>


                </div>

            </div>

        </>

    )
}

export default HrSearchbar;