import { useEffect } from "react";
import { fechLostQuery, setMDSidebar } from "../../../Reducer/querySclice";
import { setLQID } from "../../../Reducer/querySclice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Lost({ SearchInput, SortType, EmployeeId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fechLostQuery(EmployeeId));
  }, []);

  var LQuery = useSelector((state) => state.query.LostQuery);
  var LQID = useSelector((state) => state.query.LQID);

  if (LQuery && SearchInput) {
    LQuery = LQuery.filter(
      ({ query_subject }) =>
        query_subject &&
        query_subject.toLowerCase().includes(SearchInput.toLowerCase())
    );
  }

  // console.log(SortType);

  if (LQuery && SortType) {
    if (SortType === "A-Z") {
      LQuery = LQuery.slice().sort(function (a, b) {
        const nameA = a.query_subject.toUpperCase();
        const nameB = b.query_subject.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else if (SortType === "N-O") {
      LQuery = LQuery.slice().sort((x, y) => {
        x = new Date(x.updatedAt);
        y = new Date(y.updatedAt);
        return y - x;
      });
    } else if (SortType === "O-N") {
      LQuery = LQuery.slice().sort((x, y) => {
        x = new Date(x.updatedAt);
        y = new Date(y.updatedAt);
        return x - y;
      });
    } else if (SortType === "TII") {
      LQuery = LQuery.filter(
        ({ query_source }) => query_source && query_source === "indiamart"
      );
    } else if (SortType === "CST") {
      LQuery = LQuery.filter(
        ({ query_source }) => query_source && query_source !== "indiamart"
      );
    }
  }

  if ((SearchInput || SortType) && (!LQuery || LQuery.length === 0)) {
    return (
      <div className="flex justify-center items-center pt-20 text-blue-500">
        No Requirement with matching filter...
      </div>
    );
  }

  if (!LQuery) {
    return (
      <div className="flex justify-center items-center pt-20 text-blue-500">
        Loading Requirements...
      </div>
    );
  }

  if (LQuery.length === 0) {
    return (
      <div className="flex justify-center items-center pt-20 text-blue-500">
        No Requirements...
      </div>
    );
  }

  console.log(LQID, "LQID");
  return (
    <>
      <div className="hidden md:block my-5 overflow-y-scroll h-screen">
        {LQuery &&
          LQuery.map((q, index) => {
            return (
              <div
                className="px-4 py-2 mx-4 my-2 flex justify-between bg-white shadow-md  rounded-md"
                key={index}
              >
                <div className="w-[50%] pr-3">
                  <h1
                    className={`text-base font-400 whitespace-nowrap text-ellipsis max-w-sm overflow-hidden  ${
                      LQID === q.query_id ? "text-[#50d71e]" : "text-[black]"
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
                      dispatch(setLQID(q.query_id));
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

      <div className="md:hidden my-5 overflow-y-scroll h-screen">
        {LQuery &&
          LQuery.map((q, index) => {
            return (
              <div
                className="px-4 py-2 mx-4 my-2 flex flex-col bg-white shadow-md  rounded-md"
                key={index}
              >
                <div className="">
                  <h1
                    className={`text-base font-400 whitespace-nowrap text-ellipsis max-w-[290px] overflow-hidden ${
                      LQID === q.query_id ? "text-[#50d71e]" : "text-[black]"
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

                  <div className="w-[30%] h-[99%] my-auto">
                    <button
                      className="float-right px-4 py-1 h-8 bg-blue-500 text-base font-[400] text-white rounded-[4px] shadow-sm"
                      id={q.query_id}
                      onClick={(e) => {
                        dispatch(setLQID(q.query_id));
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

export default Lost;
