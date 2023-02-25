import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  XCircleIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { productDetails } from "../../Data/Data";
import { fetchQuotations, setUnassignQuery } from "../../Reducer/querySclice";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function GenerateQoutation({ visible, close }) {
  // generate todays date

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var date = dd + "-" + mm + "-" + yyyy;

  // dispatch

  const dispatch = useDispatch();

  // loading data from reducers and other place

  const DataBundel = useSelector((state) => state.user);
  const QueryId = useSelector((state) => state.query.AQID);
  const ClientMeta = DataBundel.client;
  const EmployeeMeta = DataBundel.user;

  //products

  const productDetails = useSelector((state) => state.product.products);

  // states

  const [Loading, setLoading] = useState(false);
  const [Link, setLink] = useState("");
  const [Preview, SetPreview] = useState(false);
  const [IsEmployeeLoaded, SetIsEmployeeLoaded] = useState(false);
  const [IsClientLoaded, SetIsClientLoaded] = useState(false);

  console.log(parseInt(mm) > 3);

  const FY = parseInt(mm) > 3 ? `${yyyy}-${yyyy + 1}` : `${yyyy - 1}-${yyyy}`;

  const [metadata, setmetadata] = useState({
    date: date,
    suppliers_ref_no: FY,
    offer_validity: "30 Days",
    payment_terms: "100% Advanced payment",
    dispatch_through: "As Per Your Suggestion",
    destination: "As Per Your Suggestion",
    terms_of_deliver: "Available in Ready Stock",
    total_bundel: "As per Actual",
    transportation_cost: "To Pay",
    transportation: "To pay : Trasport Godown",
    packaging_and_forwarding_charges: 0,
    GST: 18,
    currency: "INR",
    custom_field1: "Bank charges",
    custom_field2: "Freight Charges",
    custom_field1_value: "",
    custom_field2_value: "",
  });

  const [ProductList, SetProduct] = useState([{}]);
  const [RProductList, SetRProduct] = useState([{}]);
  const [TACList, SetTACList] = useState("");
  const [Data, SetData] = useState({
    sender: {
      name: "",
      mobile: "",
    },
    client: {
      name: "",
      mobile: "",
      company: "",
      address: "",
      gst: "",
      email: "",
    },
  });

  useEffect(() => {
    SetProduct([{}]);
    SetRProduct([{}]);
    SetTACList("");

    setmetadata({
      date: date,
      suppliers_ref_no: FY,
      offer_validity: "400 Days",
      payment_terms: "100% Advanced payment",
      dispatch_through: "As Per Your Suggestion",
      destination: "As Per Your Suggestion",
      terms_of_deliver: "Available in Ready Stock",
      total_bundel: "As per Actual",
      transportation_cost: "To Pay",
      transportation: "To pay : Trasport Godown",
      packaging_and_forwarding_charges: 0,
      GST: 18,
      currency: "INR",
      custom_field1: "Bank charges",
      custom_field2: "Freight Charges",
      custom_field1_value: "",
      custom_field2_value: "",
    });
  }, [QueryId, DataBundel]);

  useEffect(() => {
    if (ClientMeta) {
      var preData = { ...Data };
      preData.client = {
        name: ClientMeta.client_name,
        mobile: ClientMeta.client_mobile,
        company: ClientMeta.client_company_name,
        address: ClientMeta.client_billing_address,
        gst: ClientMeta.client_gst_no,
        email: ClientMeta.client_email,
      };
      SetData(preData);
      console.log(ClientMeta);
    }
  }, [ClientMeta, IsClientLoaded]);

  useEffect(() => {
    if (EmployeeMeta) {
      var preData = { ...Data };
      preData.sender = {
        name: EmployeeMeta.employee_name,
        mobile: EmployeeMeta.employee_mobile,
      };
      SetData(preData);
    }
  }, [EmployeeMeta, IsEmployeeLoaded]);

  // handel select metadata

  const HandelMetadataInput = (e) => {
    var field = e.target.name;
    var val = e.target.value;

    var Premetadata = { ...metadata };
    Premetadata[field] = val;
    setmetadata(Premetadata);

    console.log(metadata);
  };

  // -------------------------------------------------------------- Product Handeler -----------------------------------------------

  // CRUD

  const RemoveProdctFields = (i) => {
    let productFileds = [...ProductList];
    productFileds.splice(i, 1);
    SetProduct(productFileds);
  };

  const addFields = () => {
    SetProduct([...ProductList, {}]);
  };

  // The products handels

  const HandelProdeutSelect = (i, e) => {
    let val = e.target.value;

    let preProduct = [...ProductList];
    preProduct[i]["name"] = val;
    preProduct[i]["product"] = undefined;
    preProduct[i]["details"] = {};
    preProduct[i]["detailsTobeShown"] = {};
    SetProduct(preProduct);

    // console.log(val);
    // console.log(ProductList)

    if (Data.client.name === "") {
      SetIsClientLoaded(!IsClientLoaded);
    }

    if (Data.sender.name === "") {
      SetIsEmployeeLoaded(!IsEmployeeLoaded);
    }
  };

  const HandelModelSelect = (i, element, e) => {
    console.log(productDetails, "Product Details 2");
    let val = e.target.value;
    // let id = e.target.selectedIndex;

    let preProduct = [...ProductList];
    preProduct[i]["product"] = val;
    preProduct[i]["details"] = {
      ...productDetails[element.name].products[val].data,
    };
    preProduct[i]["width"] = productDetails[element.name].products[val].Width
      ? productDetails[element.name].products[val].Width.split(" ")[0]
      : "NA";
    preProduct[i]["length"] = productDetails[element.name].products[val].Length
      ? productDetails[element.name].products[val].Length.split(" ")[0]
      : "NA";

    preProduct[i]["wxlunit"] =
      preProduct[i]["width"] !== "NA"
        ? productDetails[element.name].products[val].Width.split(" ")[1]
        : preProduct[i]["length"] !== "NA"
        ? productDetails[element.name].products[val].Length.split(" ")[1]
        : "NA";

    preProduct[i]["min"] =
      productDetails[element.name].products[val]["Min Rate"];
    preProduct[i]["rate"] =
      productDetails[element.name].products[val]["Standard Rate"];
    preProduct[i]["unit"] =
      productDetails[element.name].products[val]["Selling Unit"];
    preProduct[i]["HSNCode"] =
      productDetails[element.name].products[val]["HSN Code"];
    preProduct[i]["ModleNo"] =
      productDetails[element.name].products[val]["ModleNo"];
    preProduct[i]["detailsTobeShown"] = {
      ...productDetails[element.name].products[val].data,
    };

    if (preProduct[i]["width"] === "NA" && preProduct[i]["length"] === "NA") {
      preProduct[i]["detailsTobeShown"]["size"] = "NA";
      preProduct[i]["details"]["size"] = "NA";
    } else if (preProduct[i]["width"] === "NA") {
      preProduct[i]["detailsTobeShown"][
        "size"
      ] = `${preProduct[i]["length"]} ${preProduct[i]["wxlunit"]}`;
      preProduct[i]["details"][
        "size"
      ] = `${preProduct[i]["length"]} ${preProduct[i]["wxlunit"]}`;
    } else if (preProduct[i]["length"] === "NA") {
      preProduct[i]["detailsTobeShown"][
        "size"
      ] = `${preProduct[i]["width"]} ${preProduct[i]["wxlunit"]}`;
      preProduct[i]["details"][
        "size"
      ] = `${preProduct[i]["width"]} ${preProduct[i]["wxlunit"]}`;
    } else {
      preProduct[i]["detailsTobeShown"][
        "size"
      ] = `${preProduct[i]["width"]} x ${preProduct[i]["length"]} ${preProduct[i]["wxlunit"]}`;
      preProduct[i]["details"][
        "size"
      ] = `${preProduct[i]["width"]} x ${preProduct[i]["length"]} ${preProduct[i]["wxlunit"]}`;
    }

    SetProduct(preProduct);
    // console.log(element.name);
    // console.log(productDetails[element.name].products[val]);
    // console.log(ProductList)
  };

  // ------ for details to be shown --------

  const handelOnChecked = (i, e) => {
    var field = e.target.name;
    var val = e.target.value;

    let preProduct = [...ProductList];
    console.log(preProduct[i]["detailsTobeShown"][field]);

    if (preProduct[i]["detailsTobeShown"][field]) {
      delete preProduct[i]["detailsTobeShown"][field];
    } else {
      preProduct[i]["detailsTobeShown"][field] = val;
    }
    SetProduct(preProduct);

    console.log(ProductList);
  };

  const handelChangeFieldValue = (i, e) => {
    var field = e.target.name;
    var val = e.target.value;

    let preProduct = [...ProductList];

    preProduct[i]["detailsTobeShown"][field] = val;

    SetProduct(preProduct);
    // console.log(e.target.value)

    console.log(ProductList[i]["detailsTobeShown"]);
  };

  // Input Handel for additional things ex width, height, rate, unit

  const HandelCustomInt = (i, e) => {
    let field = e.target.name;
    let val = e.target.value;
    let preProduct = [...ProductList];
    preProduct[i][field] = val;
    SetProduct(preProduct);

    console.log(ProductList);
  };

  //------------------------------------------------------ recommended products handels ---------------------------------------

  // CRUD

  const RemoveRProdctFields = (i) => {
    let rproductFileds = [...RProductList];
    rproductFileds.splice(i, 1);
    SetRProduct(rproductFileds);
  };

  const addRFields = () => {
    SetRProduct([...RProductList, {}]);
  };

  const HandelRProdeutSelect = (i, e) => {
    let val = e.target.value;

    let preProduct = [...RProductList];
    preProduct[i]["name"] = val;
    preProduct[i]["product"] = undefined;
    preProduct[i]["details"] = {};
    preProduct[i]["detailsTobeShown"] = {};
    SetRProduct(preProduct);
  };

  const HandelRModelSelect = (i, element, e) => {
    let val = e.target.value;
    // let id = e.target.selectedIndex;

    let preProduct = [...RProductList];
    preProduct[i]["product"] = val;
    preProduct[i]["details"] = {
      ...productDetails[element.name].products[val].data,
    };
    preProduct[i]["width"] = productDetails[element.name].products[val].Width
      ? productDetails[element.name].products[val].Width.split(" ")[0]
      : "NA";
    preProduct[i]["length"] = productDetails[element.name].products[val].Length
      ? productDetails[element.name].products[val].Length.split(" ")[0]
      : "NA";

    preProduct[i]["wxlunit"] =
      preProduct[i]["width"] !== "NA"
        ? productDetails[element.name].products[val].Width.split(" ")[1]
        : preProduct[i]["length"] !== "NA"
        ? productDetails[element.name].products[val].Length.split(" ")[1]
        : "NA";

    preProduct[i]["min"] =
      productDetails[element.name].products[val]["Min Rate"];
    preProduct[i]["rate"] =
      productDetails[element.name].products[val]["Standard Rate"];
    preProduct[i]["unit"] =
      productDetails[element.name].products[val]["Selling Unit"];
    preProduct[i]["HSNCode"] =
      productDetails[element.name].products[val]["HSN Code"];
    preProduct[i]["ModleNo"] =
      productDetails[element.name].products[val]["ModleNo"];
    preProduct[i]["detailsTobeShown"] = {
      ...productDetails[element.name].products[val].data,
    };

    if (preProduct[i]["width"] === "NA" && preProduct[i]["length"] === "NA") {
      preProduct[i]["detailsTobeShown"]["size"] = "NA";
      preProduct[i]["details"]["size"] = "NA";
    } else if (preProduct[i]["width"] === "NA") {
      preProduct[i]["detailsTobeShown"][
        "size"
      ] = `${preProduct[i]["length"]} ${preProduct[i]["wxlunit"]}`;
      preProduct[i]["details"][
        "size"
      ] = `${preProduct[i]["length"]} ${preProduct[i]["wxlunit"]}`;
    } else if (preProduct[i]["length"] === "NA") {
      preProduct[i]["detailsTobeShown"][
        "size"
      ] = `${preProduct[i]["width"]} ${preProduct[i]["wxlunit"]}`;
      preProduct[i]["details"][
        "size"
      ] = `${preProduct[i]["width"]} ${preProduct[i]["wxlunit"]}`;
    } else {
      preProduct[i]["detailsTobeShown"][
        "size"
      ] = `${preProduct[i]["width"]} x ${preProduct[i]["length"]} ${preProduct[i]["wxlunit"]}`;
      preProduct[i]["details"][
        "size"
      ] = `${preProduct[i]["width"]} x ${preProduct[i]["length"]} ${preProduct[i]["wxlunit"]}`;
    }

    SetRProduct(preProduct);
  };

  // ------ for details to be shown --------

  const handelRPOnChecked = (i, e) => {
    var field = e.target.name;
    var val = e.target.value;

    let preProduct = [...RProductList];
    console.log(preProduct[i]["detailsTobeShown"][field]);

    if (preProduct[i]["detailsTobeShown"][field]) {
      delete preProduct[i]["detailsTobeShown"][field];
    } else {
      preProduct[i]["detailsTobeShown"][field] = val;
    }
    SetRProduct(preProduct);

    // console.log(ProductList);
  };

  const handelChangeRPFieldValue = (i, e) => {
    var field = e.target.name;
    var val = e.target.value;

    let preProduct = [...RProductList];

    preProduct[i]["detailsTobeShown"][field] = val;

    SetRProduct(preProduct);
  };

  // Input Handel for additional things ex width, height, rate, unit

  const HandelRPCustomInt = (i, e) => {
    let field = e.target.name;
    let val = e.target.value;
    let preProduct = [...RProductList];
    preProduct[i][field] = val;
    SetRProduct(preProduct);
  };

  // Term and Condition Handel

  const HandelTACInput = (e) => {
    SetTACList(e.target.value);
  };

  const HandelSubmit = async () => {
    let pevData = { ...Data };
    pevData["products"] = ProductList;
    pevData["recommend_products"] = RProductList;
    pevData["TAC"] = TACList;
    pevData["IsTAC"] = TACList.length > 1 ? 1 : 0;
    pevData["IsRP"] = Object.keys(RProductList[0]).length === 0 ? 0 : 1;
    pevData["metadata"] = metadata;
    pevData["query_id"] = QueryId;
    pevData["quotation"] = "new";
    SetData(pevData);
    console.log(JSON.stringify(pevData));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pevData),
    };

    var error = "";
    var message = "";

    if (pevData.client.name === "") {
      error = "Client Details are not set!";
      message = "Please reopen popup...";
    } else if (pevData.sender.name === "") {
      error = "Employee Details are not set!";
      message = "Please reopen popup...";
    } else if (!pevData.products[0].name) {
      error = "No product!";
      message = "Please Select Product First";
    }

    if (error !== "") {
      Store.addNotification({
        title: error,
        message: message,
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
      setLoading(true);

      // console.log(Loading);

      await fetch("http://localhost:8000/generate/download", requestOptions)
        .then((response) => response.text())
        .then((text) => {
          setLink(text);
          console.log(text);
          dispatch(fetchQuotations(QueryId));
        });

      setLoading(false);
    }

    // console.log(1, Loading[1]);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center">
      <div className="w-[98%] md:w-[1100px] h-[82%] md:h-[85%] overflow-y-scroll  bg-bg rounded-md">
        <div className="sticky top-0 backdrop-blur-sm bg-bg bg-opacity-20">
          <div className="flex justify-between px-5 md:px-20 pt-5 pb-2">
            <h1 className="heading">Generate Quotation</h1>
            <XCircleIcon
              onClick={() => close(false)}
              className="w-8 hover:cursor-pointer"
            />
          </div>
        </div>

        <div className="px-5 md:px-28 pb-20 md:w-[95%]">
          <h1 className="text-heading pt-8 pb-2 text-green-500">Meta Data</h1>

          <div className="">
            <div className="flex py-0.5 md:items-end flex-col md:flex-row">
              <div className="flex flex-col md:w-1/2">
                <label className="label">Offer Validity</label>
                <input
                  className="Qinput w-[96%]"
                  type="text"
                  name="offer_validity"
                  value={metadata.offer_validity}
                  onChange={(e) => {
                    HandelMetadataInput(e);
                  }}
                />
              </div>

              <div className="flex flex-col md:w-1/2">
                <label className="label">Payment Terms</label>
                <input
                  className="Qinput w-[96%]"
                  type="text"
                  name="payment_terms"
                  value={metadata.payment_terms}
                  onChange={(e) => {
                    HandelMetadataInput(e);
                  }}
                />
              </div>
            </div>

            <div className="flex py-0.5 md:items-end flex-col md:flex-row">
              <div className="flex flex-col md:w-1/2">
                <label className="label">Dispatch Through</label>
                <input
                  className="Qinput w-[96%]"
                  type="text"
                  name="dispatch_through"
                  value={metadata.dispatch_through}
                  onChange={(e) => {
                    HandelMetadataInput(e);
                  }}
                />
              </div>

              <div className="flex flex-col md:w-1/2">
                <label className="label">Destination</label>
                <input
                  className="Qinput w-[96%]"
                  type="text"
                  name="destination"
                  value={metadata.destination}
                  onChange={(e) => {
                    HandelMetadataInput(e);
                  }}
                />
              </div>
            </div>

            <div className="flex py-0.5 md:items-end flex-col md:flex-row">
              <div className="flex flex-col md:w-1/2">
                <label className="label">Terms Of Deliver</label>
                <input
                  className="Qinput w-[96%]"
                  type="text"
                  name="terms_of_deliver"
                  value={metadata.terms_of_deliver}
                  onChange={(e) => {
                    HandelMetadataInput(e);
                  }}
                />
              </div>

              <div className="flex flex-col md:w-1/2">
                <label className="label">Total Bundel</label>
                <input
                  className="Qinput w-[96%]"
                  type="text"
                  name="total_bundel"
                  value={metadata.total_bundel}
                  onChange={(e) => {
                    HandelMetadataInput(e);
                  }}
                />
              </div>
            </div>
          </div>

          <h1 className="text-heading pt-8 pb-2 text-green-500">
            Select Products
          </h1>

          <div className="">
            {ProductList.map((element, index) => (
              <div className="mt-2 mb-3" key={index}>
                <div className="flex justify-between pt-2 pb-1 mx-5">
                  <p className="text-black">Product - {index + 1}</p>

                  <div className="flex">
                    <Square2StackIcon
                      className="w-5"
                      onClick={() => {
                        addFields();
                      }}
                    />

                    {index ? (
                      <TrashIcon
                        className="ml-2 w-5"
                        onClick={() => {
                          RemoveProdctFields(index);
                        }}
                      />
                    ) : null}
                  </div>
                </div>

                <div className="border-gray-100 border-2 rounded-md px-8 py-4">
                  <div className="flex flex-col pb-2">
                    <label className="label">Select Product</label>

                    <select
                      id="product"
                      name="product"
                      className="NewEmployeeinput"
                      onChange={(e) => {
                        HandelProdeutSelect(index, e);
                      }}
                      defaultValue={element.name || "Select Option"}
                      value={element.name || "Select Option"}
                    >
                      <option value="Select Option" disabled hidden selected>
                        Choose here
                      </option>

                      {Object.keys(productDetails)?.map((product, id) => {
                        return (
                          <option value={product} id={id}>
                            {product}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="flex flex-col py-2">
                    <label className="label">Select Product Type</label>

                    <select
                      id="thikness"
                      name="thikness"
                      className="NewEmployeeinput"
                      onChange={(e) => {
                        HandelModelSelect(index, element, e);
                      }}
                      defaultValue={element.product || "Select Option"}
                      value={element.product || "Select Option"}
                    >
                      <option value="Select Option" disabled hidden>
                        Choose here
                      </option>

                      {element.name
                        ? Object.keys(
                            productDetails[element.name].products
                          ).map((product, id) => {
                            return (
                              <option value={product} id={id}>
                                {product}
                              </option>
                            );
                          })
                        : null}
                    </select>
                  </div>

                  <div className="flex md:justify-between py-1 md:items-center flex-col md:flex-row">
                    <div className="flex flex-col py-2">
                      <label className="label">
                        Width
                        <span className="text-xs">
                          {element.wxlunit ? ` ( ${element.wxlunit} )` : ""}
                        </span>
                      </label>
                      <input
                        className="md:w-[100px] Qinput"
                        type="text"
                        name="width"
                        value={element.width || ""}
                        onChange={(e) => {
                          HandelCustomInt(index, e);
                        }}
                      />
                    </div>

                    <div className="flex flex-col py-2">
                      <label className="label">
                        length
                        <span className="text-xs">
                          {element.wxlunit ? ` ( ${element.wxlunit} )` : ""}
                        </span>
                      </label>
                      <input
                        className="md:w-[100px] Qinput"
                        type="text"
                        name="length"
                        value={element.length || ""}
                        onChange={(e) => {
                          HandelCustomInt(index, e);
                        }}
                      />
                    </div>

                    <div className="flex flex-col py-2">
                      <label className="label">Unit</label>
                      <input
                        className="md:w-[100px] Qinput"
                        type="text"
                        name="unit"
                        value={element.unit || ""}
                        onChange={(e) => {
                          HandelCustomInt(index, e);
                        }}
                      />
                    </div>

                    <div className="flex flex-col py-2">
                      {/* <div className='flex flex-col justify-end'>
                                                    <p className='text-[11px]'>Min: {element.min || 0}</p>
                                                    <p className='text-[11px]'>Std: {element.max || 0}</p>
                                                </div> */}

                      <label className="label">Enter Rate</label>
                      <input
                        className={
                          parseInt(element.rate) < parseInt(element.min)
                            ? "md:w-[150px] Qinput text-red-500"
                            : "Qinput md:w-[180px]"
                        }
                        type="text"
                        name="rate"
                        value={element.rate}
                        onChange={(e) => {
                          HandelCustomInt(index, e);
                        }}
                      />
                    </div>

                    <div className="flex flex-col py-2">
                      <label className="label">Enter Quantity</label>
                      <input
                        className="md:w-[180px] Qinput"
                        type="text"
                        name="quantity"
                        onChange={(e) => {
                          HandelCustomInt(index, e);
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col py-2">
                    <label className="label">Note</label>
                    <textarea
                      className="NewEmployeeinput text-sm w-[100%]"
                      type="text"
                      name="note"
                      onChange={(e) => {
                        HandelCustomInt(index, e);
                      }}
                    ></textarea>
                  </div>

                  <div className="flex flex-col py-2">
                    <label className="label">Select Product Details</label>

                    {/* <select id="product" name="product" className='NewEmployeeinput' onChange={e => { HandelProdeutDetailSelect(index, e) }} defaultValue={element.name || "Select Option"} value={element.name || "Select Option"} > */}

                    {/* <option value="Select Option" disabled hidden >Choose here</option> */}
                    {/* </select> */}

                    <div className="flex flex-wrap mt-2">
                      {element.details
                        ? Object.entries(element.details).map(
                            ([key, value], id) => {
                              return (
                                <div className="md:w-[30%] flex flex-col m-2">
                                  <div className="ml-2">
                                    <input
                                      type="checkbox"
                                      value={value}
                                      name={key}
                                      defaultChecked={true}
                                      onChange={(e) => {
                                        handelOnChecked(index, element, e);
                                      }}
                                    />
                                    <label
                                      className="pl-2 text-sm"
                                      name={key}
                                      value={value}
                                    >
                                      {key}:{value}
                                    </label>
                                  </div>
                                  <input
                                    className="mx-1 md:w-[90%] pl-2 text-sm outline-none py-0.5"
                                    name={key}
                                    value={element.detailsTobeShown[key]}
                                    onChange={(e) => {
                                      handelChangeFieldValue(index, e);
                                    }}
                                  />
                                </div>
                              );
                            }
                          )
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h1 className="text-heading pt-8 pb-2 text-green-500">
            Recommended Products
          </h1>

          <div className="">
            {RProductList.map((element, index) => (
              <div className="mt-2 mb-3" key={index}>
                <div className="flex justify-between pt-2 pb-1 mx-5">
                  <p className="text-black">Product - {index + 1}</p>

                  <div className="flex">
                    <Square2StackIcon
                      className="w-5"
                      onClick={() => {
                        addRFields();
                      }}
                    />

                    {index ? (
                      <TrashIcon
                        className="ml-2 w-5"
                        onClick={() => {
                          RemoveRProdctFields(index);
                        }}
                      />
                    ) : null}
                  </div>
                </div>

                <div className="border-gray-100 border-2 rounded-md px-8 py-4">
                  <div className="flex flex-col pb-2">
                    <label className="label">Select Product</label>

                    <select
                      id="product"
                      name="product"
                      className="NewEmployeeinput"
                      onChange={(e) => {
                        HandelRProdeutSelect(index, e);
                      }}
                      defaultValue={element.name || "Select Option"}
                      value={element.name || "Select Option"}
                    >
                      <option value="Select Option" disabled hidden>
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

                  <div className="flex flex-col py-2">
                    <label className="label">Select Product Type</label>

                    <select
                      id="thikness"
                      name="thikness"
                      className="NewEmployeeinput"
                      onChange={(e) => {
                        HandelRModelSelect(index, element, e);
                      }}
                      defaultValue={element.product || "Select Option"}
                      value={element.product || "Select Option"}
                    >
                      <option value="Select Option" disabled hidden>
                        Choose here
                      </option>

                      {element.name
                        ? Object.keys(
                            productDetails[element.name].products
                          ).map((product, id) => {
                            return (
                              <option value={product} id={id}>
                                {product}
                              </option>
                            );
                          })
                        : null}
                    </select>
                  </div>

                  <div className="flex md:justify-between py-1 md:items-center flex-col md:flex-row">
                    <div className="flex flex-col py-2">
                      <label className="label">
                        Width
                        <span className="text-xs">
                          {element.wxlunit ? ` ( ${element.wxlunit} )` : ""}
                        </span>
                      </label>
                      <input
                        className="md:w-[100px] Qinput"
                        type="text"
                        name="width"
                        value={element.width || ""}
                        onChange={(e) => {
                          HandelRPCustomInt(index, e);
                        }}
                      />
                    </div>

                    <div className="flex flex-col py-2">
                      <label className="label">
                        length
                        <span className="text-xs">
                          {element.wxlunit ? ` ( ${element.wxlunit} )` : ""}
                        </span>
                      </label>
                      <input
                        className="md:w-[100px] Qinput"
                        type="text"
                        name="length"
                        value={element.length || ""}
                        onChange={(e) => {
                          HandelRPCustomInt(index, e);
                        }}
                      />
                    </div>

                    <div className="flex flex-col py-2">
                      <label className="label">Unit</label>
                      <input
                        className="md:w-[100px] Qinput"
                        type="text"
                        name="unit"
                        value={element.unit || ""}
                        onChange={(e) => {
                          HandelRPCustomInt(index, e);
                        }}
                      />
                    </div>

                    <div className="flex flex-col py-2">
                      {/* <div className='flex flex-col justify-end'>
                                                    <p className='text-[11px]'>Min: {element.min || 0}</p>
                                                    <p className='text-[11px]'>Std: {element.max || 0}</p>
                                                </div> */}

                      <label className="label">Enter Rate</label>
                      <input
                        className={
                          parseInt(element.rate) < parseInt(element.min)
                            ? "md:w-[150px] Qinput text-red-500"
                            : "Qinput md:w-[180px]"
                        }
                        type="text"
                        name="rate"
                        value={element.rate}
                        onChange={(e) => {
                          HandelRPCustomInt(index, e);
                        }}
                      />
                    </div>

                    <div className="flex flex-col py-2">
                      <label className="label">Enter Quantity</label>
                      <input
                        className="md:w-[180px] Qinput"
                        type="text"
                        name="quantity"
                        onChange={(e) => {
                          HandelRPCustomInt(index, e);
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col py-2">
                    <label className="label">Note</label>
                    <textarea
                      className="NewEmployeeinput text-sm w-[100%]"
                      type="text"
                      name="note"
                      onChange={(e) => {
                        HandelRPCustomInt(index, e);
                      }}
                    ></textarea>
                  </div>

                  <div className="flex flex-col py-2">
                    <label className="label">Select Product Details</label>

                    {/* <select id="product" name="product" className='NewEmployeeinput' onChange={e => { HandelProdeutDetailSelect(index, e) }} defaultValue={element.name || "Select Option"} value={element.name || "Select Option"} > */}

                    {/* <option value="Select Option" disabled hidden >Choose here</option> */}
                    {/* </select> */}

                    <div className="flex flex-wrap mt-2">
                      {element.details
                        ? Object.entries(element.details).map(
                            ([key, value], id) => {
                              return (
                                <div className="md:w-[30%] flex flex-col m-2">
                                  <div className="ml-2">
                                    <input
                                      type="checkbox"
                                      value={value}
                                      name={key}
                                      defaultChecked={true}
                                      onChange={(e) => {
                                        handelRPOnChecked(index, element, e);
                                      }}
                                    />
                                    <label
                                      className="pl-2 text-sm"
                                      name={key}
                                      value={value}
                                    >
                                      {key}:{value}
                                    </label>
                                  </div>
                                  <input
                                    className="mx-1 md:w-[90%] pl-2 text-sm outline-none py-0.5"
                                    name={key}
                                    value={element.detailsTobeShown[key]}
                                    onChange={(e) => {
                                      handelChangeRPFieldValue(index, e);
                                    }}
                                  />
                                </div>
                              );
                            }
                          )
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <h1 className='text-heading pt-8 pb-2 text-green-500'>Terms and Conditions</h1> */}

          <div className="">
            <div className="flex flex-col">
              <label className="label">
                Enter T & C{" "}
                <span className="text-[11px] text-black">
                  ( New point New Line )
                </span>
              </label>
              <textarea
                className="NewEmployeeinput h-[100px]"
                type="text"
                name="employee_name"
                value={TACList}
                onChange={(e) => {
                  HandelTACInput(e);
                }}
              ></textarea>
            </div>
          </div>

          {/* additinal thigs */}

          <div className="mt-5">
            <div className="py-1">
              <div className="flex justify-end items-center">
                <label className="pr-2 text-sm">Currency</label>
                <select
                  id="transportation"
                  name="currency"
                  className="Qinput w-[200px] pr-3"
                  onChange={(e) => {
                    HandelMetadataInput(e);
                  }}
                  defaultValue={metadata.currency || "Select Option"}
                  value={metadata.currency || "Select Option"}
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>

            <div className="py-1">
              <div className="flex justify-end items-center">
                <label className="pr-2 text-sm md:hidden">P & F Charges</label>
                <label className="pr-2 text-sm hidden sm:block">
                  Packaging And forwarding Charges
                </label>
                <input
                  className="w-[200px] pl-3 text-sm outline-none py-1"
                  type="text"
                  name="packaging_and_forwarding_charges"
                  value={metadata.packaging_and_forwarding_charges}
                  onChange={(e) => {
                    HandelMetadataInput(e);
                  }}
                />
              </div>
            </div>

            {metadata.currency === "USD" ? (
              <>
                <div className="py-1">
                  <div className="flex justify-end items-center">
                    <input
                      className="w-[200px] pl-3 text-sm outline-none py-1 mr-3"
                      type="text"
                      name="custom_field1"
                      value={metadata.custom_field1}
                      onChange={(e) => {
                        HandelMetadataInput(e);
                      }}
                    />
                    <input
                      className="w-[200px] pl-3 text-sm outline-none py-1"
                      type="text"
                      name="custom_field1_value"
                      value={metadata.custom_field1_value}
                      onChange={(e) => {
                        HandelMetadataInput(e);
                      }}
                    />
                  </div>
                </div>
                <div className="py-1">
                  <div className="flex justify-end items-center">
                    <input
                      className="w-[200px] pl-3 text-sm outline-none py-1 mr-3"
                      type="text"
                      name="custom_field2"
                      value={metadata.custom_field2}
                      onChange={(e) => {
                        HandelMetadataInput(e);
                      }}
                    />
                    <input
                      className="w-[200px] pl-3 text-sm outline-none py-1"
                      type="text"
                      name="custom_field2_value"
                      value={metadata.custom_field2_value}
                      onChange={(e) => {
                        HandelMetadataInput(e);
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="py-1">
                <div className="flex justify-end items-center">
                  <label className="pr-2 text-sm hidden md:block">
                    Transportation Cost
                  </label>
                  <label className="pr-2 text-sm md:hidden">
                    Transport Cost
                  </label>
                  <input
                    className="w-[200px] pl-3 text-sm outline-none py-1"
                    type="text"
                    name="transportation_cost"
                    value={metadata.transportation_cost}
                    onChange={(e) => {
                      HandelMetadataInput(e);
                    }}
                  />
                </div>
              </div>
            )}

            <div className="py-1">
              <div className="flex justify-end items-center">
                <label className="pr-2 text-sm">GST</label>
                <select
                  id="transportation"
                  name="GST"
                  className="Qinput w-[200px] pr-2"
                  onChange={(e) => {
                    HandelMetadataInput(e);
                  }}
                  defaultValue={metadata.GST || "Select Option"}
                  value={metadata.GST || "Select Option"}
                >
                  <option value="18">18%</option>
                  <option value="0">0%</option>
                  <option value="0.01">0.01%</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                </select>
              </div>
            </div>

            <div className="py-1">
              <div className="flex justify-end items-center">
                <label className="pr-2 text-sm">Transportation</label>
                <select
                  id="transportation"
                  name="transportation"
                  className="Qinput w-[200px] pr-2"
                  onChange={(e) => {
                    HandelMetadataInput(e);
                  }}
                  defaultValue={metadata.transportation || "Select Option"}
                  value={metadata.transportation || "Select Option"}
                >
                  <option value="To Pay Trasport Godown">
                    To Pay Trasport Godown
                  </option>
                  <option value="Paid Trasport Godown">
                    Paid Trasport Godown
                  </option>
                  <option value="Paid Door Delivery">Paid Door Delivery</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            {/* <button className='py-2 px-6 mt-10 bg-sky-500 text-white font-medium rounded-md shadow-sm' onClick={() => { addFields() }}>Add</button> */}
            <button
              className="py-2 px-6 mt-10 bg-green-500 text-white font-medium rounded-md shadow-sm"
              onClick={() => {
                HandelSubmit();
              }}
            >
              {Loading ? "Generating Quotation..." : "Generate Quotation"}
            </button>
            {/* {
                            !Loading && !Preview && <button className='py-2 px-6 mt-10 bg-green-500 text-white font-medium rounded-[5px] shadow-sm ml-2' onClick={() => { SetPreview(!Preview) }}>Preview Quotaion</button>
                        } */}
          </div>

          <h1 className="text-heading pt-8 pb-2 text-gray-500">Preview</h1>

          {Link && (
            <object
              data={Link}
              type="application/pdf"
              width="100%"
              height="100%"
              className="w-full h-screen"
            >
              <p>Quotation PDF</p>
              <a href={Link} target="_blank" className="py-2">
                Click here to show pdf
              </a>
            </object>
          )}

          {/* <iframe src={Link}>

                    </iframe> */}

          {/* 
                    <div>
                        <button className='py-2 px-6 mt-10 bg-blue-500 text-white font-medium rounded-[5px] shadow-sm mr-2'>Mail</button>
                        <button className='py-2 px-6 mt-10 bg-green-500 text-white font-medium rounded-[5px] shadow-sm ml-2'>WhatsApp</button>

                    </div> */}
        </div>
      </div>
    </div>
  );
}

export default GenerateQoutation;
