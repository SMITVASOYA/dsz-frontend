import { useEffect } from "react";
import ClientRequest from "../ClientRequest";
import { fechAssignQuery, setMDSidebar } from "../../../Reducer/querySclice";
import { setAQID } from "../../../Reducer/querySclice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSortFilterType } from "../../../Reducer/filtersSlice";

function Running({ SearchInput, SortType, EmployeeId }) {
  const dispatch = useDispatch();

  var AQuery = useSelector((state) => state.query.AssignQuery);
  const AQID = useSelector((state) => state.query.AQID);
  useEffect(() => {
    dispatch(fechAssignQuery(EmployeeId));
  }, []);

  useEffect(() => {
    if (AQuery?.length > 0 && AQID === "") {
      dispatch(setAQID(AQuery?.[0]?.query_id));
    }
  }, [AQuery]);

  if (AQuery && SearchInput) {
    AQuery = AQuery.filter(
      ({ query_subject }) =>
        query_subject &&
        query_subject.toLowerCase().includes(SearchInput.toLowerCase())
    );

    // if (AQuery[0]) {
    //     dispatch(setAQID(AQuery[0].query_id))
    // }
  }

  if (AQuery && SortType) {
    if (SortType === "A-Z") {
      AQuery = AQuery.slice().sort(function (a, b) {
        const nameA = a.query_subject.toUpperCase();
        const nameB = b.query_subject.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
        // console.log(a.query_subject, b.query_subject)
      });
    } else if (SortType === "N-O") {
      AQuery = AQuery.slice().sort((x, y) => {
        x = new Date(x.updatedAt);
        y = new Date(y.updatedAt);
        return y - x;
      });
    } else if (SortType === "O-N") {
      AQuery = AQuery.slice().sort((x, y) => {
        x = new Date(x.updatedAt);
        y = new Date(y.updatedAt);
        return x - y;
      });
    } else if (SortType === "TII") {
      AQuery = AQuery.filter(
        ({ query_source }) => query_source && query_source === "indiamart"
      );
    } else if (SortType === "CST") {
      AQuery = AQuery.filter(
        ({ query_source }) => query_source && query_source !== "indiamart"
      );
    }
    // dispatch(setSortFilterType(undefined));
  }

  if ((SearchInput || SortType) && (!AQuery || AQuery.length === 0)) {
    return (
      <div className="flex justify-center items-center pt-20 text-blue-500">
        No Requirement with matching filter...
      </div>
    );
  }

  if (!AQuery) {
    return (
      <div className="flex justify-center items-center pt-20 text-blue-500">
        Loading Requirements...
      </div>
    );
  }

  if (AQuery.length === 0) {
    return (
      <div className="flex justify-center items-center pt-20 text-blue-500">
        No Requirements...
      </div>
    );
  }

  //   if (AQuery[0]) {
  //     dispatch(setAQID(AQuery[0].query_id));
  //   }

  console.log(AQID, "AQID");

  return (
    <>
      <div className="hidden md:block my-5 overflow-y-scroll h-screen">
        {AQuery &&
          AQuery.map((q, index) => {
            return (
              <div
                className="px-4 py-2 mx-4 my-2 flex justify-between bg-white shadow-md  rounded-md"
                key={index}
              >
                <div className="w-[50%] pr-3">
                  <h1
                    className={`text-base font-400 whitespace-nowrap text-ellipsis max-w-[290px] overflow-hidden ${
                      AQID === q.query_id ? "text-[#50d71e]" : "text-[black]"
                    }`}
                  >
                    {q.query_subject}
                  </h1>
                  <p className="text-gray-400">{q.query_product}</p>
                </div>
                <div className="flex flex-col w-[20%]">
                  <p className="text-base">Inquiry Date</p>
                  <p className="text-gray-400 font-400 text-sm">
                    {q.createdAt.split("T")[0]}
                  </p>
                </div>

                <div className="flex flex-col w-[20%]">
                  <p className="text-base">Last Seen</p>
                  <p className="text-gray-400 font-400 text-sm">
                    {q.updatedAt.split("T")[0]}
                  </p>
                </div>
                <div className="w-[10%] h-[99%] my-auto">
                  <button
                    className="px-4 py-1 h-8 bg-blue-500 text-base font-[400] text-white rounded-[4px] shadow-sm"
                    id={q.query_id}
                    onClick={(e) => {
                      dispatch(setAQID(q.query_id));
                    }}
                  >
                    {" "}
                    View{" "}
                  </button>
                  {console.log(q.query_id, "q.query_id")}
                </div>
              </div>
            );
          })}
      </div>

      <div className="md:hidden my-5 overflow-y-scroll h-screen">
        {AQuery &&
          AQuery.map((q, index) => {
            return (
              <div
                className="px-4 py-2 mx-4 my-2 flex flex-col bg-white shadow-md  rounded-md"
                key={index}
              >
                <div className="">
                  <h1
                    className={`text-base font-400 whitespace-nowrap text-ellipsis max-w-[290px] overflow-hidden ${
                      AQID === q.query_id ? "text-[#50d71e]" : "text-red"
                    }`}
                  >
                    {q.query_subject}
                  </h1>
                  <p className="text-gray-400">{q.query_product}</p>
                </div>

                <div className="flex justify-between mt-2">
                  <div className="flex flex-col w-[35%]">
                    <p className="text-base">Inquiry Date</p>
                    <p className="text-gray-400 font-400 text-sm">
                      {q.createdAt.split("T")[0]}
                    </p>
                  </div>

                  <div className="flex flex-col w-[35%] pl-5">
                    <p className="text-base">Last Seen</p>
                    <p className="text-gray-400 font-400 text-sm">
                      {q.updatedAt.split("T")[0]}
                    </p>
                  </div>
                  <div className="h-[99%] my-auto w-[30%]">
                    <button
                      className="float-right px-4 py-1 h-8 bg-blue-500 text-base font-[400] text-white rounded-[4px] shadow-sm"
                      id={q.query_id}
                      onClick={(e) => {
                        dispatch(setAQID(q.query_id));
                        dispatch(setMDSidebar(true));
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
    </>
  );
}

export default Running;
