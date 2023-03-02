import { useCallback, useEffect, useState } from "react";
import {
  fechCloseQuery,
  selectedQueiresSetter,
  setMDSidebar,
  setSelectedQueries,
} from "../../../Reducer/querySclice";
import { setCQID } from "../../../Reducer/querySclice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Close({ SearchInput, SortType, EmployeeId }) {
  const selectedQueries = useSelector((state) => state.query.selectedQueries);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fechCloseQuery(EmployeeId));
    dispatch(setSelectedQueries([]));
  }, []);

  const queriesSelector = useCallback(
    (id) => {
      dispatch(selectedQueiresSetter(selectedQueries, id));
    },
    [selectedQueries]
  );
  console.log(selectedQueries, "selected in close");

  var CQuery = useSelector((state) => state.query.CloseQuery);
  var CQID = useSelector((state) => state.query.CQID);

  if (SearchInput) {
    CQuery = CQuery?.filter(
      ({ query_subject }) =>
        query_subject &&
        query_subject.toLowerCase().includes(SearchInput.toLowerCase())
    );
  }

  if (SortType) {
    if (SortType === "A-Z") {
      CQuery = CQuery.slice().sort(function (a, b) {
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
      CQuery = CQuery.slice().sort((x, y) => {
        x = new Date(x.updatedAt);
        y = new Date(y.updatedAt);
        return y - x;
      });
    } else if (SortType === "O-N") {
      CQuery = CQuery.slice().sort((x, y) => {
        x = new Date(x.updatedAt);
        y = new Date(y.updatedAt);
        return x - y;
      });
    } else if (SortType === "TII") {
      CQuery = CQuery.filter(
        ({ query_source }) => query_source && query_source === "indiamart"
      );
    } else if (SortType === "CST") {
      CQuery = CQuery.filter(
        ({ query_source }) => query_source && query_source !== "indiamart"
      );
    }
  }

  if ((SearchInput || SortType) && (!CQuery || CQuery.length === 0)) {
    return (
      <div className="flex justify-center items-center pt-20 text-blue-500">
        No requirements with matching filter...
      </div>
    );
  }

  if (!CQuery) {
    return (
      <div className="flex justify-center items-center pt-20 text-blue-500">
        Loading Requirements...
      </div>
    );
  }

  if (CQuery.length === 0) {
    return (
      <div className="flex justify-center items-center pt-20 text-blue-500">
        No Requirement...
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block my-5 overflow-y-scroll h-screen">
        {CQuery &&
          CQuery.map((q, index) => {
            return (
              <div
                className="px-4 py-2 mx-4 my-2 flex justify-between bg-white shadow-md  rounded-md"
                key={index}
              >
                <div className="w-[10%] flex items-center justify-center">
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedQueries?.includes(q?.query_id)}
                      onChange={(e) => queriesSelector(q?.query_id)}
                    />
                  </div>
                </div>
                <div className="w-[40%] pr-3">
                  <h1
                    className={`text-base font-400 whitespace-nowrap text-ellipsis max-w-sm overflow-hidden ${
                      CQID === q.query_id ? "text-[#50d71e]" : "text-[black]"
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
                      dispatch(setCQID(q.query_id));
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

      {/* for mobile */}

      <div className="md:hidden my-5 overflow-y-scroll h-screen">
        {CQuery &&
          CQuery.map((q, index) => {
            return (
              <div
                className="px-4 py-2 mx-4 my-2 flex flex-col bg-white shadow-md  rounded-md"
                key={index}
              >
                <div className="">
                  <h1 className="text-base font-400 whitespace-nowrap text-ellipsis max-w-[290px] overflow-hidden">
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
                  <div className="w-[30%] h-[99%] my-auto">
                    <button
                      className="float-right px-4 py-1 h-8 bg-blue-500 text-base font-[400] text-white rounded-[4px] shadow-sm"
                      id={q.query_id}
                      onClick={(e) => {
                        dispatch(setCQID(q.query_id));
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

export default Close;
