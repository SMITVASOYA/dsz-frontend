import React from "react";
import { useSelector } from "react-redux";
import { usePopups } from "../../PopupsContext";
import { useDispatch } from "react-redux";
import { fechUnAssignQuery } from "../../../Reducer/querySclice";
import axios from "axios";
import ReqDetails from "./ReqDetails";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function NewRightsidebar() {
  const dispatch = useDispatch();

  // const { qoutation } = usePopups();
  // const [NewQoutation, SetNewQoutation] = qoutation;

  const Querys = useSelector((state) => state.query.UnassignQuery);
  const UAQID = useSelector((state) => state.query.UAQID);

  if (!UAQID || !Querys) {
    return (
      <div className="flex justify-center items-center mt-20 text-blue-500">
        Loading Requirement Details...
      </div>
    );
  }

  const req = Querys.filter((obj) => {
    return obj.query_id === parseInt(UAQID);
  });

  const ClientId = req[0]?.client.client_id;

  const HandelBlock = () => {
    var config = {
      method: "patch",
      url: `${process.env.REACT_APP_HOST}/api/client/${ClientId}/block`,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(fechUnAssignQuery());
      })
      .catch(function (error) {
        // console.log(error);
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

  // console.log(req);/

  return (
    <div className="mx-6 mt-10 flex flex-col text-[14px] text-black">
      <div>
        <span className="flex items-center">
          <h1 className="headline">{req[0]?.client?.client_name}</h1>
          <p className="mx-6 bg-gray-400  text-white px-2 rounded-sm font-medium">
            New
          </p>
        </span>

        <div className="pt-2 text-gray-400">
          <p className="">{req[0]?.client?.client_email}</p>
          <p>{req[0]?.client?.client_mobile}</p>
        </div>

        <div className="pt-5">
          <h1 className="text-sm text-black">{req[0]?.query_subject}</h1>
        </div>
      </div>

      <hr className="mx-auto my-2 mb-3 w-[60%] bg-indigo-500 h-[2px]" />

      <h1 className="text-primary font-medium py-3">Requirement Details</h1>

      <ReqDetails
        Date={req[0]?.query_create_time?.split("T")[0]}
        Time={req[0]?.query_create_time?.split("T")[1]?.split(".")[0]}
        Message={req[0]?.query_message}
        Location={req[0]?.client?.client_city}
        Source={req[0]?.query_source}
        Company={req[0]?.client?.client_company_name}
        Address={req[0]?.client?.client_shipping_address}
        BillingAddress={req[0]?.client?.client_billing_address}
      />

      <div className="mt-6 mb-20 text-[14px]">
        <div className="flex">
          {/* <button onClick={() => SetNewQoutation(true)} className='px-4 py-2 bg-primary text-white font-medium rounded-md shadow-md' >Create Quotation</button> */}
          <button
            className="px-4 py-2 bg-rose-500 text-white font-medium rounded-md shadow-md"
            onClick={() => {
              HandelBlock();
            }}
          >
            Block Client
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewRightsidebar;
