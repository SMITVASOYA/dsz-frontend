import { useState, useEffect, useCallback } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {
  fechAssignQuery,
  fechCloseQuery,
  fechLostQuery,
  fechUnAssignQuery,
  setAQID,
  setCQID,
  setLQID,
  setSelectedQueries,
} from "../../Reducer/querySclice";
import { useDispatch, useSelector } from "react-redux";
import { usePopups } from "../PopupsContext";
import { fechEmployees } from "../../Reducer/employeeSlice";

function ForwardSelectedQueries({ visible, close }) {
  const [EmployeeID, setEmployeeID] = useState("");
  const dispatch = useDispatch();

  const { forwardQueries } = usePopups();
  const [ForwardQueries, SetForwardQueires] = forwardQueries;

  const selectedTab = useSelector((state) => state.query.currentQueryState);
  const Employee = useSelector((state) => state.employee.employees);
  const loggedInEmployeeId = useSelector((state) => state.user.employeeId);
  const selectedQueries = useSelector((state) => state.query.selectedQueries);

  useEffect(() => {
    dispatch(fechEmployees());
  }, []);

  const HandelEmployeeId = useCallback((e) => {
    setEmployeeID(e.target.value);
  }, []);

  const HandelForwardQueries = useCallback(() => {
    // console.log(ReqData);

    const data = {
      from_employee_id: loggedInEmployeeId,
      to_employee_id: EmployeeID,
      query_array: selectedQueries,
    };

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_HOST}/api/query/forwardQueries`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
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
          if (selectedTab === "Running") {
            dispatch(fechAssignQuery(loggedInEmployeeId));
            dispatch(setAQID(""));
          } else if (selectedTab === "Lost") {
            dispatch(fechLostQuery(loggedInEmployeeId));
            dispatch(setLQID(""));
          } else if (selectedTab === "Close") {
            dispatch(fechCloseQuery(loggedInEmployeeId));
            dispatch(setCQID(""));
          }

          dispatch(setSelectedQueries([]));

          Store.addNotification({
            title: "Queries Forwarded Successfully",
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
  }, [selectedTab, loggedInEmployeeId, EmployeeID, selectedQueries]);

  console.log(selectedQueries, "selectedQueries");
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center">
      <div className="w-[95%] md:w-[1000px] overflow-y-scroll bg-bg rounded-md">
        <div className="sticky top-0 backdrop-blur-sm bg-bg bg-opacity-20">
          <div className="flex justify-between px-3 md:px-20 pt-5 pb-2">
            <h1 className="heading">Forward Query</h1>
            <XCircleIcon onClick={() => close(false)} className="w-8" />
          </div>
        </div>

        <div className="w-[99%] px-5 md:px-28 pb-20 md:w-[950px]">
          <div className="mt-5">
            <div className="flex flex-col pb-2">
              <label className="label">Select Employee</label>

              {/* <input className='NewEmployeeinput' type="text" name="client_city" onChange={(e) => {}} value={} /> */}

              <select
                name="employee"
                className="NewEmployeeinput"
                onChange={(e) => {
                  HandelEmployeeId(e);
                }}
                defaultValue={EmployeeID || "Select Option"}
                value={EmployeeID || "Select Option"}
              >
                <option value="Select Option" disabled hidden>
                  Choose here
                </option>

                {Employee?.filter(
                  (i) => i?.employee_id !== loggedInEmployeeId
                ).map((e, id) => {
                  return (
                    <option id={id} value={e?.employee_id}>
                      {e?.employee_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <button
                className={`py-2 px-6 mt-10 bg-green-500 text-white font-medium rounded-md shadow-sm ${
                  EmployeeID === "" ? "bg-green-300" : "bg-green-500"
                }`}
                onClick={() => {
                  HandelForwardQueries();
                  SetForwardQueires(false);
                }}
                disabled={EmployeeID === ""}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForwardSelectedQueries;
