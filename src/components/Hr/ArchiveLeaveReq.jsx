import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArchiveLeaveReq } from "../../Reducer/leaveSlice";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/outline";

function ArchiveLeaveReq() {
  const dispatch = useDispatch();

  useEffect(() => {
    // return () => {
    dispatch(fetchArchiveLeaveReq());
    // }
  }, []);

  const [ViewMessageId, setViewMessageId] = useState(-1);

  const ArchiveLeaves = useSelector((state) => state.leave.ArchiveLeaves);
  console.log(ArchiveLeaves);

  // const HandelDeleteReq = (leave_req_id) => {
  //   var config = {
  //     method: "delete",
  //     url:
  //       `${process.env.REACT_APP_HOST}/api/auth/attendance/leave/` +
  //       leave_req_id,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       // console.log(JSON.stringify(response.data));
  //       var resdata = response.data;
  //       if (resdata.error) {
  //         // var errordata = errorMessages[resdata.errorMessage];

  //         Store.addNotification({
  //           title: resdata.errorType,
  //           message: resdata.errorMessage,
  //           type: "warning",
  //           insert: "top",
  //           container: "top-right",
  //           animationIn: ["animate__animated", "animate__fadeIn"],
  //           animationOut: ["animate__animated", "animate__fadeOut"],
  //           dismiss: {
  //             duration: 5000,
  //             onScreen: true,
  //           },
  //         });
  //       } else {
  //         Store.addNotification({
  //           title: "Request Deleted Successfully",
  //           message: "Success",
  //           type: "success",
  //           insert: "top",
  //           container: "top-right",
  //           animationIn: ["animate__animated", "animate__fadeIn"],
  //           animationOut: ["animate__animated", "animate__fadeOut"],
  //           dismiss: {
  //             duration: 5000,
  //             onScreen: true,
  //           },
  //         });

  //         dispatch(fetchArchiveLeaveReq());
  //       }
  //     })
  //     .catch(function (error) {
  //       var result = error.response.data;

  //       // console.log(result);

  //       if (result) {
  //         if (result.error) {
  //           Store.addNotification({
  //             title: result.errorType ? result.errorType : "Error!",
  //             message: result.errorMessage
  //               ? result.errorMessage
  //               : "Error While Processing Request!",
  //             type: "warning",
  //             insert: "top",
  //             container: "top-right",
  //             animationIn: ["animate__animated", "animate__fadeIn"],
  //             animationOut: ["animate__animated", "animate__fadeOut"],
  //             dismiss: {
  //               duration: 5000,
  //               onScreen: true,
  //             },
  //           });
  //         }
  //       }
  //     });
  // };

  if (ArchiveLeaves && ArchiveLeaves.length === 0) {
    return (
      <div className="flex justify-center items-center mt-20">
        No Leave Request...
      </div>
    );
  }

  if (!ArchiveLeaves) {
    return (
      <div className="flex justify-center items-center mt-20">
        Loading Leave Request...
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block">
        {ArchiveLeaves.map((l, index) => {
          return (
            <div
              className="px-4 py-2 my-2 flex flex-col bg-white shadow-md  rounded-md"
              key={index}
            >
              <div className="flex justify-between">
                <div className="w-[30%] pr-3">
                  <h1 className="text-base font-400 whitespace-nowrap text-ellipsis max-w-sm overflow-hidden">
                    {index} {l.employee.employee_name}
                  </h1>
                  <p className="text-gray-400">
                    {l.employee.employee_office_email}
                  </p>
                </div>
                <div className="flex flex-col w-[20%]">
                  <p className="text-base">Starting Date</p>
                  <p className="text-gray-400 font-400 text-sm">
                    {l.leave_req_start_date}
                  </p>
                </div>

                <div className="flex flex-col w-[20%]">
                  <p className="text-base">Ending Date</p>
                  <p className="text-gray-400 font-400 text-sm">
                    {l.leave_req_end_date}
                  </p>
                </div>
                <div className="w-[15%] h-[99%] my-auto">
                  <button
                    className="px-4 py-1 h-8 bg-blue-500 text-base font-[400] text-white rounded-[4px] shadow-sm"
                    id={index}
                    onClick={(e) => {
                      if (ViewMessageId === index) {
                        setViewMessageId(-1);
                      } else {
                        setViewMessageId(index);
                      }
                    }}
                  >
                    {" "}
                    View{" "}
                  </button>
                </div>
              </div>
              <div
                className={
                  ViewMessageId === index
                    ? `block mt-1 py-1 rounded-sm flex flex-col`
                    : `hidden`
                }
              >
                <div className="flex justify-between">
                  <div className="w-[30%] pr-3">
                    <h1 className="text-base">Date Of Request</h1>
                    <p className="py-1 text-gray-400 font-400 text-sm">
                      {l.createdAt.split("T")[0]}
                    </p>
                  </div>
                  <div className="flex flex-col w-[20%]">
                    <h1 className="text-base">Message</h1>
                    <p className="py-1 text-sm text-gray-400">
                      {l.leave_req_message}
                    </p>
                  </div>
                  <div className="flex flex-col w-[20%]">
                    <h1 className="text-base">Status</h1>
                    <p
                      className={`py-1 text-sm text-gray-400 ${
                        l?.leave_req_status === "approved"
                          ? "text-[green]"
                          : "text-[red]"
                      }`}
                    >
                      {l?.leave_req_status}
                    </p>
                  </div>
                  <div className="w-[15%] h-[99%] my-auto"></div>
                </div>
                {l?.leave_req_reject_reason && (
                  <div className="py-1">
                    <h1 className="text-base">Reject Message</h1>
                    <p className="py-1 text-sm text-gray-400">
                      {l.leave_req_reject_reason}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="md:hidden">
        {ArchiveLeaves.map((l, index) => {
          return (
            <div
              className="px-4 py-2 my-2 flex flex-col bg-white shadow-md  rounded-md"
              key={index}
            >
              <div className="flex justify-between">
                <div className="w-[65%] pr-3">
                  <h1 className="text-base font-400 whitespace-nowrap text-ellipsis max-w-sm overflow-hidden">
                    {l.employee.employee_name}
                  </h1>
                  <p className="text-gray-400">
                    {l.employee.employee_office_email}
                  </p>
                </div>
                <div className="w-[23%]">
                  <button
                    className="px-4 py-1 h-8 bg-blue-500 text-base font-[400] text-white rounded-[4px] shadow-sm"
                    id={index}
                    onClick={(e) => {
                      if (ViewMessageId === index) {
                        setViewMessageId(-1);
                      } else {
                        setViewMessageId(index);
                      }
                    }}
                  >
                    {" "}
                    View{" "}
                  </button>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="flex flex-col w-[50%]">
                  <p className="text-base">Starting Date</p>
                  <p className="text-gray-400 font-400 text-sm">
                    {l.leave_req_start_date}
                  </p>
                </div>

                <div className="flex flex-col w-[50%]">
                  <p className="text-base">Ending Date</p>
                  <p className="text-gray-400 font-400 text-sm">
                    {l.leave_req_end_date}
                  </p>
                </div>
              </div>
              <div
                className={
                  ViewMessageId === index
                    ? `block  mt-1 py-1 rounded-sm`
                    : `hidden`
                }
              >
                <div className="py-1">
                  <h1 className="text-base">Date Of Request</h1>
                  <p className="py-1 text-gray-400 font-400 text-sm">
                    {l.createdAt.split("T")[0]}
                  </p>
                </div>
                <div className="py-1">
                  <h1 className="text-base">Message</h1>
                  <p className="py-1 text-sm text-gray-400">
                    {l.leave_req_message}
                  </p>
                </div>
                <div className="py-1">
                  <h1 className="text-base">Status</h1>
                  <p
                    className={`py-1 text-gray-400 font-400 text-sm ${
                      l?.leave_req_status === "approved"
                        ? "text-[green]"
                        : "text-[red]"
                    }`}
                  >
                    {l?.leave_req_status}
                  </p>
                </div>
                {l?.leave_req_reject_reason && (
                  <div className="py-1">
                    <h1 className="text-base">Reject Message</h1>
                    <p className="py-1 text-sm text-gray-400">
                      {l.leave_req_reject_reason}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ArchiveLeaveReq;
