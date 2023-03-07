import { useState, useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { fechUnAssignQuery } from "../../Reducer/querySclice";
import { useDispatch, useSelector } from "react-redux";
import { usePopups } from "../PopupsContext";

function AddNewRequest({ visible, close }) {
  let source = [
    "Buylead",
    "Direct,Call",
    "Telecaller",
    "IndiaMart Export",
    "Who View",
    "TradeIndia",
    "Tele Export",
    "Visiting Card",
    "Visit Done",
    "Visit Pending",
    "Old Quotation",
    "Just Dial",
  ];
  const [IsNewClient, setIsNewClient] = useState(false);
  const [MobileExist, setMobileExist] = useState(false);
  const [EmailExist, setEmailExist] = useState(false);
  const [Client, setClient] = useState({});
  const [ClientName, setClientName] = useState();
  const [Clients, setClients] = useState([]);
  const dispatch = useDispatch();

  const { newreq } = usePopups();
  const [NewRequest, SetNewRequest] = newreq;

  const productDetails = useSelector((state) => state.product.products);

  const HandelAddNewClient = () => {
    setIsNewClient(!IsNewClient);
  };

  const fetchClients = () => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_HOST}/api/client/all/active`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "include",
    };
    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        var resData = response.data;

        if (resData.error) {
          // var errordata = errorMessages[resdata.errorMessage];

          Store.addNotification({
            title: "Not Able to load Clients",
            message: "Please Open Popup Again",
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
          setClients(resData.data);
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

  useEffect(() => {
    fetchClients();
  }, []);

  const errorMessages = {
    "Validation Error": {
      title: "Validation Error",
      message: "Please enter Valid Details",
    },
    "Client Already Exists": {
      title: "Client Already Exists",
      message: "Please Enter uniqe MobileNo and EmailId",
    },
  };

  const [ClientData, setClientData] = useState({
    client_name: "",
    client_mobile: "",
    client_email: "",
    client_shipping_address: "",
    client_billing_address: "",
    client_city: "",
    client_company_name: "",
    client_country_iso: "",
    client_state: "",
    client_gst_no: "",
    client_alternate_email: "",
    client_alternate_mobile: "",
  });

  const [ReqData, setReqData] = useState({
    client_id: "",
    query_source: "",
    query_create_time: Math.round(new Date().getTime() / 1000),
    query_subject: "",
    query_product: "",
    query_message: "",
    query_state: "new",
  });

  const HandelClientDetailInput = (e) => {
    var field = e.target.name;

    if (field === "client_mobile") {
      var config = {
        method: "get",
        url: `${process.env.REACT_APP_HOST}/api/client/check?client_mobile=${e.target.value}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          if (response.data.error) {
            if (response.data.errorType === "Conflict") {
              setMobileExist(true);
            } else {
              setMobileExist(false);
            }
          } else {
            setMobileExist(false);
          }
        })
        .catch(function (error) {
          console.log(error.response.data);
          if (error.response.data.error) {
            if (error.response.data.errorType === "Conflict") {
              setMobileExist(true);
            } else {
              setMobileExist(false);
            }
          } else {
            setMobileExist(false);
          }
        });
    }

    if (field === "client_email") {
      const config = {
        method: "get",
        url: `${process.env.REACT_APP_HOST}/api/client/check?client_email=${e.target.value}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          if (response.data.error) {
            if (response.data.errorType === "Conflict") {
              setEmailExist(true);
            } else {
              setEmailExist(false);
            }
          } else {
            setEmailExist(false);
          }
        })
        .catch(function (error) {
          console.log(error.response.data);
          if (error.response.data.error) {
            if (error.response.data.errorType === "Conflict") {
              setEmailExist(true);
            } else {
              setEmailExist(false);
            }
          } else {
            setEmailExist(false);
          }
        });
    }

    var preData = { ...ClientData };
    preData[field] = e.target.value;
    setClientData(preData);

    // console.log(ClientData)
  };

  const HandelCreateClient = () => {
    // console.log(ClientData);

    var data = JSON.stringify({
      data: ClientData,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_HOST}/api/client`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "include",
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        var resdata = response.data;

        if (resdata.error) {
          var errordata = errorMessages[resdata.errorMessage];

          Store.addNotification({
            title: errordata.title,
            message: errordata.message,
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
          fetchClients();

          Store.addNotification({
            title: "Client Created Successfully",
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

  // select client

  const HandelClient = (e) => {
    // console.log(e.target.value);

    var client = Clients[e.target.value];

    var preData = { ...ReqData };
    preData["client_id"] = parseInt(client.client_id);
    setReqData(preData);

    setClient(client);
    setClientName(e.target.value);
    // console.log(ClientName);
  };

  const HandelReqDetailsinput = (e) => {
    var field = e.target.name;

    var preData = { ...ReqData };
    preData[field] = e.target.value;
    setReqData(preData);
  };

  const HandelCreateReq = (e) => {
    // console.log(ReqData);

    var data = JSON.stringify({
      data: ReqData,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_HOST}/api/query`,
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
          dispatch(fechUnAssignQuery());

          Store.addNotification({
            title: "Requrement Created Successfully",
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

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center">
      <div className="w-[95%] md:w-[1000px] h-[85%] overflow-y-scroll bg-bg rounded-md">
        <div className="sticky top-0 backdrop-blur-sm bg-bg bg-opacity-20">
          <div className="flex justify-between px-3 md:px-20 pt-5 pb-2">
            <h1 className="heading">Add New Requirement</h1>
            <XCircleIcon onClick={() => close(false)} className="w-8" />
          </div>
        </div>

        <div className="w-[99%] px-5 md:px-28 pb-20 md:w-[950px]">
          <div className="mt-10">
            <input
              className="NewEmployeeinput"
              type="checkbox"
              name="employee_name"
              value="Add New Client"
              onChange={() => {
                HandelAddNewClient();
              }}
            />
            <label className="pl-2">Add New Client</label>
          </div>

          {IsNewClient ? (
            <div className="pt-6">
              <div className="flex flex-col">
                <label className="label">Client Name</label>
                <input
                  className="NewEmployeeinput"
                  type="text"
                  name="client_name"
                  onChange={(e) => {
                    HandelClientDetailInput(e);
                  }}
                  value={ClientData.client_name}
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between py-3">
                <div className="flex flex-col">
                  <label className="label">
                    Email{" "}
                    {EmailExist ? (
                      <span className="pl-3 text-xs text-red-500">
                        "Email Id Already Exists"
                      </span>
                    ) : null}
                  </label>
                  <input
                    className="NewEmployeeinput md:w-[300px]"
                    type="email"
                    name="client_email"
                    onChange={(e) => {
                      HandelClientDetailInput(e);
                    }}
                    value={ClientData.client_email}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="label">
                    Mobile No
                    {MobileExist ? (
                      <span className="pl-3 text-xs text-red-500">
                        "Mobile No Already Exists"
                      </span>
                    ) : null}
                  </label>
                  <input
                    className="NewEmployeeinput md:w-[300px]"
                    type="tel"
                    name="client_mobile"
                    onChange={(e) => {
                      HandelClientDetailInput(e);
                    }}
                    value={ClientData.client_mobile}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between py-3">
                <div className="flex flex-col">
                  <label className="label">Alternate Email</label>
                  <input
                    className="NewEmployeeinput md:w-[300px]"
                    type="email"
                    name="client_alternate_email"
                    onChange={(e) => {
                      HandelClientDetailInput(e);
                    }}
                    value={ClientData.client_alternate_email}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="label">Alternate Mobile No</label>
                  <input
                    className="NewEmployeeinput md:w-[300px]"
                    type="tel"
                    name="client_alternate_mobile"
                    onChange={(e) => {
                      HandelClientDetailInput(e);
                    }}
                    value={ClientData.client_alternate_mobile}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="label">City</label>
                <input
                  className="NewEmployeeinput"
                  type="text"
                  name="client_city"
                  onChange={(e) => {
                    HandelClientDetailInput(e);
                  }}
                  value={ClientData.client_city}
                />
              </div>

              <div className="flex flex-col">
                <label className="label">State</label>
                <input
                  className="NewEmployeeinput"
                  type="text"
                  name="client_state"
                  onChange={(e) => {
                    HandelClientDetailInput(e);
                  }}
                  value={ClientData.client_state}
                />
              </div>

              <div className="flex flex-col">
                <label className="label">Client Country ISO</label>
                <input
                  className="NewEmployeeinput"
                  type="text"
                  name="client_country_iso"
                  onChange={(e) => {
                    HandelClientDetailInput(e);
                  }}
                  value={ClientData.client_country_iso}
                />
              </div>

              <div className="flex flex-col">
                <label className="label">Company Name</label>
                <input
                  className="NewEmployeeinput"
                  type="text"
                  name="client_company_name"
                  onChange={(e) => {
                    HandelClientDetailInput(e);
                  }}
                  value={ClientData.client_company_name}
                />
              </div>

              <div className="flex flex-col">
                <label className="label">GSTN</label>
                <input
                  className="NewEmployeeinput"
                  type="text"
                  name="client_gst_no"
                  onChange={(e) => {
                    HandelClientDetailInput(e);
                  }}
                  value={ClientData.client_gst_no}
                />
              </div>

              <div className="flex flex-col">
                <label className="label">Shipping Address</label>
                <textarea
                  className="NewEmployeeinput h-[100px]"
                  type="text"
                  name="client_shipping_address"
                  onChange={(e) => {
                    HandelClientDetailInput(e);
                  }}
                  value={ClientData.client_shipping_address}
                ></textarea>
              </div>

              <div className="flex flex-col">
                <label className="label">Billing Address</label>
                <textarea
                  className="NewEmployeeinput h-[100px]"
                  type="text"
                  name="client_billing_address"
                  onChange={(e) => {
                    HandelClientDetailInput(e);
                  }}
                  value={ClientData.client_billing_address}
                ></textarea>
              </div>

              <div>
                <button
                  className="py-2 px-6 mt-10 bg-green-500 text-white font-medium rounded-md shadow-sm"
                  onClick={() => {
                    HandelCreateClient();
                  }}
                >
                  Add Client
                </button>
              </div>
            </div>
          ) : (
            " "
          )}

          <div className="mt-5">
            <div className="flex flex-col pb-2">
              <label className="label">Select Client</label>

              {/* <input className='NewEmployeeinput' type="text" name="client_city" onChange={(e) => {}} value={} /> */}

              <select
                name="clients"
                className="NewEmployeeinput"
                onChange={(e) => {
                  HandelClient(e);
                }}
                defaultValue={ClientName || "Select Option"}
                value={ClientName || "Select Option"}
              >
                <option value="Select Option" disabled hidden>
                  Choose here
                </option>

                {Clients.map((c, id) => {
                  return (
                    <option id={id} value={id}>
                      {c.client_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="label">Requirements</label>
              <input
                className="NewEmployeeinput"
                type="text"
                name="query_subject"
                onChange={(e) => {
                  HandelReqDetailsinput(e);
                }}
                value={ReqData.query_subject}
              />
            </div>

            <div className="flex flex-col">
              <label className="label">Product</label>
              {/* <input
                className="NewEmployeeinput"
                type="text"
                name="query_product"
                onChange={(e) => {
                  HandelReqDetailsinput(e);
                }}
                value={ReqData.query_product}
              /> */}
              <select
                name="query_product"
                className="NewEmployeeinput"
                onChange={(e) => {
                  HandelReqDetailsinput(e);
                }}
                defaultValue={"Select Option"}
                value={ReqData.query_product || "Select Option"}
              >
                <option value="Select Option" disabled hidden selected>
                  Choose here
                </option>

                {Object.keys(productDetails).map((product, id) => {
                  return (
                    <option value={product} id={id}>
                      {product}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="label">Source</label>
              {/* <input
                className="NewEmployeeinput"
                type="text"
                name="query_source"
                onChange={(e) => {
                  HandelReqDetailsinput(e);
                }}
                value={ReqData.query_source}
              /> */}
              <select
                name="query_source"
                className="NewEmployeeinput"
                onChange={(e) => {
                  HandelReqDetailsinput(e);
                }}
                defaultValue={"Select Option"}
                value={ReqData.query_source || "Select Option"}
              >
                <option value="Select Option" disabled hidden selected>
                  Choose here
                </option>

                {Object.keys(productDetails).map((product, id) => {
                  return (
                    <option value={product} id={id}>
                      {product}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex justify-between py-3">
              {/* <div className='flex flex-col'>
                                <label className='label'>Inquiry Date</label>
                                <input className='NewEmployeeinput w-[300px]' type="date" name="query_create_time" onChange={(e) => { HandelReqDetailsinput(e) }} value={ReqData.query_create_time} />
                            </div> */}
              {/* <div className='flex flex-col'>
                                <label className='label'>Time</label>
                                <input className='NewEmployeeinput w-[300px]' type="time" name="" onChange={(e) => { HandelReqDetailsinput(e) }} value={ReqData.query_create_time} />
                            </div> */}
            </div>

            <div className="flex flex-col">
              <label className="label">Message</label>
              <textarea
                className="NewEmployeeinput h-[100px]"
                type="text"
                name="query_message"
                onChange={(e) => {
                  HandelReqDetailsinput(e);
                }}
                value={ReqData.query_message}
              ></textarea>
            </div>

            <div>
              <button
                className="py-2 px-6 mt-10 bg-green-500 text-white font-medium rounded-md shadow-sm "
                onClick={(e) => {
                  HandelCreateReq(e);
                  SetNewRequest(false);
                }}
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

export default AddNewRequest;
