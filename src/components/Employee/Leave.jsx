import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useEffect } from "react";
import { fetchEmployeeLeavesReq } from "../../Reducer/leaveSlice";

function Leave() {
  const dispatch = useDispatch();
  var date = new Date();
  var minDate = new Date(date.getTime() + 48 * 60 * 60 * 1000);
  var dd = String(minDate.getDate()).padStart(2, "0");
  var mm = String(minDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = minDate.getFullYear();
  minDate = yyyy + "-" + mm + "-" + dd;

  // console.log(minDate);

  const EmployeeId = useSelector((state) => state.user.employeeId);
  const EmployeeLeavesReq = useSelector(
    (state) => state.leave.employeeLeavesReq
  );
  const [ViewMessageId, setViewMessageId] = useState(-1);

  useEffect(() => {
    dispatch(fetchEmployeeLeavesReq(EmployeeId));
  }, []);

  console.log(EmployeeLeavesReq, "employeeLeavesReq");

  const [LeaveData, setLeaveData] = useState({
    leave_req_start_date: "",
    leave_req_end_date: "",
    employee_id: EmployeeId,
    leave_req_message: "",
  });

  const HandelInput = (e) => {
    var field = e.target.name;
    var val = e.target.value;

    var preData = { ...LeaveData };
    preData[field] = val;
    setLeaveData(preData);
  };

  const HandelLeaveSubmit = () => {
    console.log("leve req");

    var data = JSON.stringify({
      data: LeaveData,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_HOST}/api/auth/attendance/leave`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials:true,
      credentials: "include",
      data: data,
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
            title: "Request Sended Successfully",
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

  return (
    <div className="basis-[100%] md:basis-[83%] bg-bg overflow-y-scroll h-screen">
      <div className="ml-5 py-5 md:ml-10 md:py-10">
        <h1>Request For Leave</h1>

        <div className="mr-2 md:mr-0 md:mt-6">
          <div className="flex flex-col md:flex-row md:justify-start py-2">
            <div className="flex flex-col">
              <label className="label">Start Data</label>
              <input
                className="outline-none px-2 py-1 md:py-0 bg-white"
                type="date"
                name="leave_req_start_date"
                value={LeaveData.leave_req_start_date}
                onChange={(e) => {
                  HandelInput(e);
                }}
                min={minDate}
              />
            </div>
            <div className="md:ml-4 flex flex-col">
              <label className="label">End Data</label>
              <input
                className="outline-none px-2 py-1 md:py-0 bg-white"
                type="date"
                name="leave_req_end_date"
                value={LeaveData.leave_req_end_date}
                onChange={(e) => {
                  HandelInput(e);
                }}
                min={minDate}
              />
            </div>
          </div>
          <div className="flex flex-col py-2 ">
            <label className="label">Message</label>
            <textarea
              className="md:w-[50%] h-[80px] outline-none rounded-sm py-1 px-2"
              name="leave_req_message"
              value={LeaveData.leave_req_message}
              onChange={(e) => {
                HandelInput(e);
              }}
            ></textarea>
          </div>
          <div className="py-2">
            <button
              className="py-2 px-6 bg-green-500 text-white font-medium rounded-md shadow-sm"
              onClick={() => {
                HandelLeaveSubmit();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="ml-5 py-2 md:ml-10 md:py-10">Leaves History</div>
      <div className="hidden md:block mx-7 py-5 md:ml-10 md:py-10">
        {EmployeeLeavesReq?.map((l, index) => {
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
    </div>
  );
}

export default Leave;
