import { useEffect, useState } from "react";
import Followup from "./Followup";
import { usePopups } from "../../PopupsContext";
import SidebarClientinfo from "./SidebarClientinfo";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  fechAssignQuery,
  fechCloseQuery,
  fechLostQuery,
  fetchInvoices,
  fetchLatestQuotation,
  fetchQuotations,
  setAQID,
  setInvoices,
  setQuotations,
} from "../../../Reducer/querySclice";
import { setClient } from "../../../Reducer/userSlice";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import ReqDetails from "./ReqDetails";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import EditQuery from "../../Popups/EditQuery";
import ViewQuotation from "../../Popups/ViewQuotation";
import ViewInvoice from "../../Popups/ViewInvoice";

function RunningSidebar({ EmployeeId }) {
  const dispatch = useDispatch();

  const { chat, qoutation, invoice } = usePopups();
  const [ChatPopup, SetChatPopup] = chat;
  const [NewQoutation, SetNewQoutation] = qoutation;
  const [NewInvoice, SetNewInvoice] = invoice;

  const { EditReq } = usePopups();
  const [EditReqDetails, SetEditReqDetails] = EditReq;

  //followups and Quotations
  const [followups, setfollowups] = useState([]);
  const [followup, setfollowup] = useState("");
  const [Isfollowup, setIsfollowup] = useState(true);

  // for view Quotation
  const [visible, setvisible] = useState(false);
  const [QuotationFileName, setQuotationFileName] = useState("");
  const [QuotationData, setQuotationData] = useState({});

  // for View Invoices
  const [InvoiceFileName, setInvoiceFileName] = useState("");
  const [InvoiceData, setInvoiceData] = useState({});

  // fatching data from reducers
  const Querys = useSelector((state) => state.query.AssignQuery);
  const AQID = useSelector((state) => state.query.AQID);
  const Quotation = useSelector((state) => state.query.Quotations);
  const latestQuotation = useSelector((state) => state.query.latestQuotation);
  const Invoices = useSelector((state) => state.query.Invoices);

  //fatching Quotaions
  useEffect(() => {
    console.log("cool aqid log");
    dispatch(setQuotations([]));
    dispatch(fetchQuotations(AQID));
    dispatch(setInvoices([]));
    dispatch(fetchInvoices(AQID));
  }, [AQID]);

  // for followup API call
  useEffect(() => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_HOST}/api/followup/all/${AQID}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "include",
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        const resData = response.data;

        if (resData.error) {
          // console.log(resData.error);
          setfollowups([]);
        } else {
          setfollowups(resData.data);
        }
      })
      .catch(function (error) {
        setfollowups([]);
        // console.log(error);
      });
  }, [AQID, Isfollowup]);

  const HandelFollowupInput = (e) => {
    var val = e.target.value;
    setfollowup(val);
  };

  const HandelFollowupSave = () => {
    var data = JSON.stringify({
      data: {
        query_id: AQID,
        followup_text: followup,
      },
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_HOST}/api/followup/`,
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
          Store.addNotification({
            title: "Error while Adding Follow Up",
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
            title: "Follow Up Added Successfully",
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
          setIsfollowup(!Isfollowup);
          setfollowup("");
        }
      })
      .catch(function (error) {
        console.log(error);

        Store.addNotification({
          title: "Somting Went Wrong...",
          message: "Server Side Error",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      });
  };

  const HandelSendToLost = () => {
    var data = JSON.stringify({
      data: {
        query_state: "lost",
      },
    });

    var config = {
      method: "patch",
      url: `${process.env.REACT_APP_HOST}/api/query/status/${AQID}`,
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
          Store.addNotification({
            title: "Not Able updating status of request",
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
            title: "Request sended in Lost Successfully",
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
          dispatch(fechAssignQuery(EmployeeId));
          dispatch(setAQID(""));
          dispatch(fechLostQuery(EmployeeId));
        }
      })
      .catch(function (error) {
        console.log(error);
        Store.addNotification({
          title: "Somting Went Wrong...",
          message: "Server Side Error",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      });
  };

  const HandelSendToClose = () => {
    var data = JSON.stringify({
      data: {
        query_state: "close",
      },
    });

    var config = {
      method: "patch",
      url: `${process.env.REACT_APP_HOST}/api/query/status/${AQID}`,
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
          Store.addNotification({
            title: "Not Able updating status of Requirement",
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
            title: "Request sended in Done Successfully",
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

          dispatch(fechAssignQuery(EmployeeId));
          dispatch(setAQID(""));
          dispatch(fechCloseQuery(EmployeeId));
        }
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

  // invoice generater popup open
  const invoiceGenerator = () => {
    dispatch(fetchLatestQuotation(AQID));
  };

  useEffect(() => {
    if (Object.keys(latestQuotation)?.length > 0) {
      if (!latestQuotation?.errorType) {
        SetNewInvoice(true);
      }
    }
  }, [latestQuotation]);

  // console.log(Quotation);

  if (!AQID || !Querys) {
    return (
      <div className="flex justify-center items-center mt-20 text-blue-500">
        Loading Requirement Details...
      </div>
    );
  }

  const req = Querys.filter((obj) => {
    return obj.query_id === parseInt(AQID);
  });

  dispatch(setClient(req[0].client));

  return (
    <div className="mx-6 mt-10 flex flex-col text-[14px] text-black">
      <div>
        <div>
          <span className="flex items-center justify-between">
            <div className="flex">
              <h1 className="headline">{req[0].client.client_name}</h1>
              <p className="mx-6 bg-gray-400  text-white px-2 rounded-sm font-medium">
                New
              </p>
            </div>

            <div className="group relative">
              <p className="w-5 mr-3 hover:cursor-pointer">
                <EllipsisVerticalIcon />{" "}
              </p>
              <div className="hidden group-hover:block absolute top-2 right-3 bg-white shadow-md rounded-sm w-[150px]">
                <div className="p-1">
                  <li
                    className="dropdownList"
                    onClick={() => {
                      SetEditReqDetails(true);
                    }}
                  >
                    Edit Requerment
                  </li>
                  <li
                    className="dropdownList"
                    onClick={() => {
                      HandelSendToLost();
                    }}
                  >
                    Send to Lost
                  </li>
                  <li
                    className="dropdownList"
                    onClick={() => {
                      HandelSendToClose();
                    }}
                  >
                    Send to Done
                  </li>
                  <li
                    className="dropdownList"
                    onClick={() => {
                      SetNewQoutation(true);
                    }}
                  >
                    Send Quotation
                  </li>
                  {/* <li className='dropdownList' onClick={() => { SetChatPopup(true) }}>Chat</li> */}
                </div>
              </div>
            </div>
          </span>

          <div className="pt-2 text-gray-400">
            <p className="">{req[0].client.client_email}</p>
            <p>{req[0].client.client_mobile}</p>
          </div>
        </div>

        <div className="pt-5">
          <h1 className="text-sm text-black">{req[0].query_subject}</h1>
        </div>
      </div>

      <hr className="mx-auto my-2 mb-3 w-[60%] bg-blue-500 h-[2px]" />

      <h1 className="text-primary font-medium py-3">Requirement Details</h1>

      {/* <h1 className='text-black font-medium py-2'>Query Details</h1> */}

      <ReqDetails
        Date={req[0].query_create_time.split("T")[0]}
        Time={req[0].query_create_time.split("T")[1].split(".")[0]}
        Message={req[0].query_message}
        Location={req[0].client.client_city}
        Source={req[0].query_source}
        Company={req[0].client.client_company_name}
        Address={req[0].client.client_shipping_address}
        BillingAddress={req[0].client.client_billing_address}
      />

      <hr className="mx-auto my-2 mb-3 w-[60%] bg-blue-500 h-[2px]" />

      <h1 className="text-primary font-medium py-3">Follow Ups</h1>

      <div className="max-h-[350px] overflow-y-scroll">
        {followups.length === 0 ? (
          <div className="flex justify-center items-center text-blue-500 h-[100px]">
            No Followups...
          </div>
        ) : (
          followups.map((fup, id) => {
            return (
              <Followup
                Date={fup.createdAt.split("T")[0]}
                Detail={fup.followup_text}
                FollowupId={fup.followup_id}
                setIsfollowup={setIsfollowup}
                key={id}
                FollowupNo={id + 1}
              />
            );
          })
        )}
      </div>

      <h1 className="text-primary font-medium py-3">Quotations</h1>

      <div className="max-h-[350px] overflow-y-scroll">
        {Quotation.length === 0 ? (
          <div className="flex justify-center items-center text-blue-500 h-[100px]">
            No Quotation...
          </div>
        ) : (
          Quotation.map((q, id) => {
            return (
              <div
                className="text-sm flex flex-col bg-blue-100 text-blue-500 shadow-md rounded-sm my-2 mr-4 px-4 py-1"
                onClick={() => {
                  setvisible(true);
                  setQuotationFileName(
                    q.generatedQuotationNumber.split("/")[0] +
                      "-" +
                      q.generatedQuotationNumber.split("/")[1]
                  );
                  setQuotationData(q);
                }}
              >
                <p className="py-1">{q.createdAt.split("T")[0]}</p>
                <div>
                  <p>{q.generatedQuotationNumber}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <h1 className="text-primary font-medium py-3">Invoice</h1>

      <div className="max-h-[350px] overflow-y-scroll">
        {Invoices.length === 0 ? (
          <div className="flex justify-center items-center text-blue-500 h-[100px]">
            No Invoice...
          </div>
        ) : (
          Invoices.map((q, id) => {
            return (
              <div
                className="text-sm flex flex-col bg-blue-100 text-blue-500 shadow-md rounded-sm my-2 mr-4 px-4 py-1"
                onClick={() => {
                  setvisible(true);
                  setInvoiceFileName(
                    q.generatedInvoiceNumber.split("/")[0] +
                      "-" +
                      q.generatedInvoiceNumber.split("/")[1]
                  );
                  setInvoiceData(q);
                }}
              >
                <p className="py-1">{q.createdAt.split("T")[0]}</p>
                <div>
                  <p>{q.generatedInvoiceNumber}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex flex-col mt-10">
        <label className="text-primary font-medium">Add Follow Up</label>
        <textarea
          className="my-2 pl-2 h-6 outline-none border-b-2 border-green-500"
          type="text"
          value={followup}
          onChange={(e) => {
            HandelFollowupInput(e);
          }}
        ></textarea>
        <button
          className="px-4 py-2 mb-2 mx-2 bg-primary text-white font-medium rounded-md shadow-md"
          onClick={() => {
            HandelFollowupSave();
          }}
        >
          Save
        </button>
      </div>

      <div className="mt-8 mb-5 text-[14px]">
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={invoiceGenerator}
            className="w-[95%] mb-5 px-4 py-2 bg-red-500 text-white font-medium rounded-md shadow-md"
          >
            Generate Invoice
          </button>

          <button
            onClick={() => SetNewQoutation(true)}
            className="w-[95%] px-4 py-2 bg-green-500 text-white font-medium rounded-md shadow-md"
          >
            Send Quotation
          </button>

          {/* <div className='flex justify-between w-[95%] mt-3'>

                        <button className='w-[48%] px-4 py-2 mb-2 bg-primary text-white font-medium rounded-md shadow-md' onClick={() => { HandelSendToLost() }}>Lost</button>
                        <button className='w-[48%] px-4 py-2 mb-2 bg-primary text-white font-medium rounded-md shadow-md' onClick={() => { HandelSendToClose() }} >Close</button>

                    </div> */}
        </div>
      </div>

      <EditQuery
        visible={EditReqDetails}
        close={SetEditReqDetails}
        ReqDetails={req[0]}
        EmployeeId={EmployeeId}
      />
      <ViewQuotation
        visible={visible}
        file={QuotationFileName}
        close={setvisible}
        data={QuotationData}
      />
      <ViewInvoice
        visible={visible}
        file={InvoiceFileName}
        close={setvisible}
        data={InvoiceData}
      />
    </div>
  );
}

export default RunningSidebar;
