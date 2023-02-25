import { useState } from 'react';
import axios from 'axios';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function Followup({ Date, Detail, FollowupId, setIsfollowup, FollowupNo, State }) {

    const [IsEdit, setIsEdit] = useState(false);
    const [Finput, setFinput] = useState(Detail);

    const HandelClick = (e) => {
        setIsEdit(true)
    }

    const handelInputChange = (e) => {
        setFinput(e.target.value);
    }

    const HandelSubmit = (e) => {

        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();

            var data = JSON.stringify({
                "data": {
                    "followup_text": Finput
                }
            });

            var config = {
                method: 'patch',
                url: `${process.env.REACT_APP_HOST}/api/followup/${FollowupId}`,
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
                            title: "Error while Updating Follow Up",
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
                            title: `Follow Up ${FollowupNo} Updated Successfully`,
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
                        setIsEdit(false);
                        setIsfollowup(Math.random());
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


    }


    if (State === "Lost" || State === "Close") {
        return (
            <div className='shadow-sm p-3 mr-2 my-2 rounded-sm bg-gray-500 bg-opacity-5' onClick={() => { HandelClick() }}>

                <div className='flex justify-between'>
                    <p className='text-left  text-black text-xs'>#{FollowupNo}</p>
                    <p className='text-right text-black text-xs'>{Date}</p>
                </div>

                <p className='p-3 text-black'>{Detail}</p>


            </div>
        )
    }

    return (




        <div className='shadow-sm p-3 mr-2 my-2 rounded-sm bg-gray-500 bg-opacity-5' onClick={() => { HandelClick() }}>

            <div className='flex justify-between'>
                <p className='text-left  text-black text-xs'>#{FollowupNo}</p>
                <p className='text-right text-black text-xs'>{Date}</p>
            </div>

            {
                IsEdit ? (<div>
                    <form onSubmit={(e) => { HandelSubmit(e) }}>
                        <textarea className="m-2 my-3 py-1 outline-none pl-2 text-sm bg-white w-[95%] shadow-md rounded-sm" value={Finput} onChange={(e) => { handelInputChange(e) }} onKeyDown={(e) => { HandelSubmit(e) }} ></textarea>
                    </form>
                </div>) : <p className='p-3 text-black'>{Detail}</p>
            }

        </div>
    )
}

export default Followup