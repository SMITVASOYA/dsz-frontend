import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActiveLeaveReq,
  fetchArchiveLeaveReq,
} from "../../Reducer/leaveSlice";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import axios from "axios";

function ActiveLeaveReq() {
  const dispatch = useDispatch();

  useEffect(() => {
    // return () => {
    dispatch(fetchActiveLeaveReq());
    // };
  }, []);

  const [ViewMessageId, setViewMessageId] = useState(-1);
  const [ViewRejectMessageId, setViewRejectMessageId] = useState(-1);
  const [rejectMessage, setRejectMessage] = useState("");

  const ActiveLeaves = useSelector((state) => state.leave.ActiveLeaves);

  const HandelLeaveRequest = (leave_req_id, payload) => {
    console.log("Sending to Archive...");

    var config = {
      method: "patch",
      url:
        `${process.env.REACT_APP_HOST}/api/auth/attendance/leave/` +
        leave_req_id,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
              onScreen: true,
            },
          });
        } else {
          Store.addNotification({
            title: "Request Sended to Archive Successfully",
            message: "Success",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });

          dispatch(fetchActiveLeaveReq());
          dispatch(fetchArchiveLeaveReq());
        }
      })
      .catch(function (error) {
        var result = error.response.data;

        // console.log(result);

        if (result) {
          if (result.error) {
            Store.addNotification({
              title: result.errorType ? result.errorType : "Error!",
              message: result.errorMessage
                ? result.errorMessage
                : "Error While Processing Request!",
              type: "warning",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true,
              },
            });
          }
        }
      });
  };

  if (ActiveLeaves && ActiveLeaves.length === 0) {
    return (
      <div className="flex justify-center items-center mt-20">
        No Leave Request...
      </div>
    );
  }

  if (!ActiveLeaves) {
    return (
      <div className="flex justify-center items-center mt-20">
        Loading Leave Request...
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block">
        {ActiveLeaves.map((l, index) => {
          return (
            <div
              className="px-4 py-2 my-2 flex flex-col bg-white shadow-md  rounded-md"
              key={index}
            >
              <div className="flex justify-between">
                <div className="w-[30%] pr-3">
                  <h1 className="text-base font-400 whitespace-nowrap text-ellipsis max-w-sm overflow-hidden">
                    {l.employee.employee_name}
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
                    className="px-4 py-1 h-8 bg-green-500 text-base font-[400] text-white rounded-[4px] shadow-sm"
                    id={index}
                    onClick={() => {
                      HandelLeaveRequest(l.leave_req_id, {
                        status: "approved",
                      });
                    }}
                  >
                    {" "}
                    Approve{" "}
                  </button>
                </div>
                <div className="w-[15%] h-[99%] my-auto">
                  <button
                    className="px-4 py-1 h-8 bg-red-500 text-base font-[400] text-white rounded-[4px] shadow-sm"
                    id={index}
                    onClick={() => {
                      if (ViewRejectMessageId === index) {
                        setViewRejectMessageId(-1);
                      } else {
                        setViewRejectMessageId(index);
                      }
                    }}
                  >
                    {" "}
                    Reject{" "}
                  </button>
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
              {ViewMessageId >= 0 && <hr className="mt-2" />}
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
              </div>
              {ViewRejectMessageId >= 0 && <hr className="mt-2" />}
              <div
                className={
                  ViewRejectMessageId === index
                    ? `block  mt-1 py-1 rounded-sm`
                    : `hidden`
                }
              >
                <div className="py-1 flex flex-col">
                  <div className="">
                    <h1 className="text-base">Message</h1>
                  </div>
                  <div className="flex items-center">
                    <textarea
                      value={rejectMessage}
                      onChange={(e) => setRejectMessage(e.target.value)}
                      className="border rounded w-[500px] h-[70px]"
                    />
                    <button
                      className={`px-4 py-1 h-8 bg-red-500 text-base font-[400] text-white rounded-[4px] shadow-sm ml-5 ${
                        rejectMessage === "" ? "bg-red-300" : "bg-red-500"
                      }`}
                      id={index}
                      disabled={rejectMessage === ""}
                      onClick={(e) => {
                        HandelLeaveRequest(l.leave_req_id, {
                          message: rejectMessage,
                          status: "rejected",
                        });
                      }}
                    >
                      {" "}
                      Submit{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="md:hidden">
        {ActiveLeaves.map((l, index) => {
          return (
            <div
              className="px-4 py-2 my-2 flex flex-col bg-white shadow-md  rounded-md"
              key={index}
            >
              <div className="flex justify-between">
                <div className="w-full pr-3">
                  <h1 className="text-base font-400 whitespace-nowrap text-ellipsis max-w-sm overflow-hidden">
                    {l.employee.employee_name}
                  </h1>
                  <p className="text-gray-400">
                    {l.employee.employee_office_email}
                  </p>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex justify-between">
                  <button
                    className="px-4 py-1 h-8 bg-green-500 text-base font-[400] text-white rounded-[4px] shadow-sm"
                    id={index}
                    onClick={() => {
                      HandelLeaveRequest(l.leave_req_id, {
                        status: "approved",
                      });
                    }}
                  >
                    {" "}
                    Approve{" "}
                  </button>
                </div>
                <div className="flex justify-between mx-2">
                  <button
                    className="px-4 py-1 h-8 bg-red-500 text-base font-[400] text-white rounded-[4px] shadow-sm"
                    id={index}
                    onClick={() => {
                      if (ViewRejectMessageId === index) {
                        setViewRejectMessageId(-1);
                      } else {
                        setViewRejectMessageId(index);
                      }
                    }}
                  >
                    {" "}
                    Reject{" "}
                  </button>
                </div>
                <div className="flex justify-between">
                  <button
                    className="float-right py-1 px-4 h-8 bg-blue-500 text-base font-[400] text-white rounded-[4px] shadow-sm"
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
              <div className="flex justify-between">
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
              </div>
              <div
                className={
                  ViewRejectMessageId === index
                    ? `block  mt-1 py-1 rounded-sm`
                    : `hidden`
                }
              >
                <div className="py-1">
                  <h1 className="text-base">Message</h1>
                  <textarea
                    value={rejectMessage}
                    onChange={(e) => setRejectMessage(e.target.value)}
                    className="border rounded w-full h-[70px]"
                  />
                  <button
                    className={`px-4 py-1 h-8 bg-red-500 text-base font-[400] text-white rounded-[4px] shadow-sm ${
                      rejectMessage === "" ? "bg-red-300" : "bg-red-500"
                    }`}
                    id={index}
                    disabled={rejectMessage === ""}
                    onClick={(e) => {
                      HandelLeaveRequest(l.leave_req_id, {
                        message: rejectMessage,
                        status: "rejected",
                      });
                    }}
                  >
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ActiveLeaveReq;
