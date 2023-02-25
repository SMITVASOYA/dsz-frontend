import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setInputFilter } from "../../Reducer/filtersSlice";
import {
  setAQID,
  setCurrentQueryState,
  setUAQID,
} from "../../Reducer/querySclice";

function Notifcations() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [NData, setNData] = useState([]);
  const [EData, setEData] = useState([]);
  const employeeId = useSelector((state) => state.user.employeeId);

  const FetchUAQNotification = () => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_HOST}/api/query/all/created_unassigned`,
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
        } else {
          setNData(resdata.data);
          // console.log(resdata.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const FetchRunningQueryNotification = () => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_HOST}/api/query/all/running_no_followup?employee_id=${employeeId}`,
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
        } else {
          setEData(resdata.data);
          // console.log(resdata.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    FetchUAQNotification();
    FetchRunningQueryNotification();
  }, []);

  return (
    <div className="basis-[100%] md:basis-[83%] bg-bg overflow-y-scroll h-screen">
      <h1 className="px-5 pt-5 md:pt-14 md:pl-10 text-lg">Notifications</h1>

      <p className="ml-5 md:pl-4 md:py-5 mt-6">
        Following Inquiry is pending from 15 Days
      </p>

      <div className="hidden md:block mt-2">
        {!NData
          ? "No Notification"
          : NData.map((q, index) => {
              return (
                <div
                  className="px-4 py-2 mx-4 my-2 flex justify-between bg-white shadow-md  rounded-md"
                  key={index}
                >
                  <div className="w-[3%] pr-1">
                    <p className="text-blue-400">{index + 1}</p>
                  </div>
                  <div className="w-[62%] pr-1">
                    <h1 className="text-base font-400">{q.query_subject}</h1>
                    <p className="text-gray-400">{q.query_product}</p>
                  </div>
                  <div className="flex flex-col w-[25%]">
                    <p className="text-base">Inquiry Date</p>
                    <p className="text-red-400 font-400 text-sm">
                      {q.createdAt.split("T")[0]}
                    </p>
                  </div>
                  <div className="w-[10%] h-[99%] my-auto">
                    <button
                      className="px-4 py-1 h-8 bg-blue-500 text-base font-[400] text-white rounded-[4px] shadow-sm"
                      id={q.query_id}
                      onClick={(e) => {
                        // dispatch(setInputFilter(q.query_subject));
                        dispatch(setUAQID(q.query_id));
                        navigate("/employee/requirements");
                        dispatch(setCurrentQueryState("New"));
                      }}
                    >
                      {" "}
                      View{" "}
                    </button>
                  </div>
                </div>
              );
            })}
      </div>

      <div className="mt-4 md:hidden">
        {!NData
          ? "No Notification"
          : NData.map((q, index) => {
              return (
                <div
                  className="px-4 py-2 mx-4 my-2 flex flex-col bg-white shadow-md  rounded-md"
                  key={index}
                >
                  <div className="flex flex-col">
                    <h1 className="text-base font-400 whitespace-nowrap text-ellipsis max-w-[25ch] overflow-hidden">
                      {q.query_subject}
                    </h1>
                    <p className="text-gray-400">{q.query_product}</p>
                  </div>

                  <div className="flex justify-between mt-2">
                    <div className="flex flex-col">
                      <p className="text-base">Inquiry Date</p>
                      <p className="text-red-400 font-400 text-sm">
                        {q.createdAt.split("T")[0]}
                      </p>
                    </div>
                    <div className="h-[99%] my-auto">
                      <button
                        className="float-right px-4 py-1 h-8 bg-blue-500 text-base font-[400] text-white rounded-[4px] shadow-sm"
                        id={q.query_id}
                        onClick={(e) => {
                          // dispatch(setInputFilter(q.query_subject));
                          dispatch(setUAQID(q.query_id));
                          navigate("/employee/requirements");
                          dispatch(setCurrentQueryState("New"));
                        }}
                      >
                        {" "}
                        View{" "}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      <p className="ml-5 md:pl-2 md:py-5 mt-6">
        Following Inquiry is pending from 15 Days in running section
      </p>

      <div className="hidden md:block mt-2">
        {!EData
          ? "No Notification"
          : EData.map((q, index) => {
              return (
                <div
                  className="px-4 py-2 mx-4 my-2 flex justify-between bg-white shadow-md  rounded-md"
                  key={index}
                >
                  <div className="w-[3%] pr-1">
                    <p className="text-blue-400">{index + 1}</p>
                  </div>
                  <div className="w-[62%] pr-1">
                    <h1 className="text-base font-400">{q.query_subject}</h1>
                    <p className="text-gray-400">{q.query_product}</p>
                  </div>
                  <div className="flex flex-col w-[25%]">
                    <p className="text-base">Inquiry Date</p>
                    <p className="text-red-400 font-400 text-sm">
                      {q.createdAt.split("T")[0]}
                    </p>
                  </div>
                  <div className="w-[10%] h-[99%] my-auto">
                    <button
                      className="px-4 py-1 h-8 bg-blue-500 text-base font-[400] text-white rounded-[4px] shadow-sm"
                      id={q.query_id}
                      onClick={(e) => {
                        // dispatch(setInputFilter(q.query_subject));
                        dispatch(setAQID(q.query_id));
                        navigate("/employee/requirements");
                        dispatch(setCurrentQueryState("Running"));
                      }}
                    >
                      {" "}
                      View{" "}
                    </button>
                  </div>
                </div>
              );
            })}
      </div>

      <div className="mt-4 md:hidden">
        {!EData
          ? "No Notification"
          : EData.map((q, index) => {
              return (
                <div
                  className="px-4 py-2 mx-4 my-2 flex flex-col bg-white shadow-md  rounded-md"
                  key={index}
                >
                  <div className="flex flex-col">
                    <h1 className="text-base font-400 whitespace-nowrap text-ellipsis max-w-[25ch] overflow-hidden">
                      {q.query_subject}
                    </h1>
                    <p className="text-gray-400">{q.query_product}</p>
                  </div>

                  <div className="flex justify-between mt-2">
                    <div className="flex flex-col">
                      <p className="text-base">Inquiry Date</p>
                      <p className="text-red-400 font-400 text-sm">
                        {q.createdAt.split("T")[0]}
                      </p>
                    </div>
                    <div className="h-[99%] my-auto">
                      <button
                        className="float-right px-4 py-1 h-8 bg-blue-500 text-base font-[400] text-white rounded-[4px] shadow-sm"
                        id={q.query_id}
                        onClick={(e) => {
                          // dispatch(setInputFilter(q.query_subject));
                          dispatch(setAQID(q.query_id));
                          navigate("/employee/requirements");
                          dispatch(setCurrentQueryState("Running"));
                        }}
                      >
                        {" "}
                        View{" "}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default Notifcations;
