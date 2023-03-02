import React from "react";
import { setMDSidebar, setUAQID } from "../../Reducer/querySclice";
import axios from "axios";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useDispatch, useSelector } from "react-redux";
import { fechAssignQuery } from "../../Reducer/querySclice";
import { fechUnAssignQuery } from "../../Reducer/querySclice";

function ClientRequest({
  request,
  requestCatagory,
  date,
  QueryId,
  EmployeeId,
}) {
  const UAQID = useSelector((state) => state.query.UAQID);
  const dispatch = useDispatch();

  const handelAssignMe = () => {
    var data = JSON.stringify({
      data: {
        employee_id: EmployeeId,
        query_id: QueryId,
      },
    });

    var config = {
      method: "patch",
      url: `${process.env.REACT_APP_HOST}/api/query/assign`,
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
          dispatch(setUAQID(""));
          dispatch(fechAssignQuery(EmployeeId));
          dispatch(fechUnAssignQuery());

          Store.addNotification({
            title: "Assign Successfully",
            message: "Success",
            type: "default",
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
    <div className="cursor-pointer">
      <div
        className="hidden px-4 py-2 mx-4 my-2 md:flex justify-between items-center bg-white shadow-md  rounded-md"
        id={QueryId}
        onClick={(e) => {
          dispatch(setUAQID(QueryId));
          // console.log(QueryId)
        }}
      >
        <div className="w-[60%] pr-3">
          <h1
            className={`text-base font-400 whitespace-nowrap text-ellipsis max-w-sm overflow-hidden ${
              UAQID === QueryId ? "text-[#50d71e]" : "text-[black]"
            }`}
          >
            {request}
          </h1>
          <p className="text-gray-400">{requestCatagory}</p>
        </div>
        <div className="flex flex-col w-[20%] pl-3">
          <p className="text-base text-left">Inquiry Date</p>
          <h1 className="text-gray-400 font-400 text-left">{date}</h1>
        </div>

        <div className="w-[20%]">
          <button
            className="px-3 py-1 h-8 bg-blue-500 text-base font-[400] text-white rounded-[4px] shadow-sm float-right"
            onClick={() => {
              handelAssignMe();
            }}
          >
            {" "}
            Assign ME{" "}
          </button>
        </div>
      </div>

      {/* for mobile */}

      <div
        className="md:hidden px-4 py-2 mx-4 my-2 flex flex-col bg-white shadow-md  rounded-md"
        id={QueryId}
        onClick={(e) => {
          dispatch(setMDSidebar(QueryId));
          dispatch(setUAQID(QueryId));
          // console.log(QueryId)
        }}
      >
        <div className="">
          <h1 className="text-base font-400 whitespace-nowrap text-ellipsis max-w-[290px] overflow-hidden">
            {request}
          </h1>
          <p className="text-gray-400">{requestCatagory}</p>
        </div>

        <div className="flex justify-between mt-2">
          <div className="flex flex-col">
            <p className="text-base text-left">Inquiry Date</p>
            <h1 className="text-gray-400 font-400 text-left">{date}</h1>
          </div>
          <div>
            <button
              className="px-3 py-1 h-8 bg-blue-500 text-base font-[400] text-white rounded-[4px] shadow-sm float-right"
              onClick={() => {
                handelAssignMe();
              }}
            >
              {" "}
              Assign ME{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientRequest;
