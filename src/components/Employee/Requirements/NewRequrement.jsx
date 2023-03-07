import { useEffect, useState } from "react";
import ClientRequest from "../ClientRequest";
import { fechUnAssignQuery, setUAQID } from "../../../Reducer/querySclice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { isEmpty } from "../../../utilities/utilities";

function NewRequrement({ SearchInput, SortType, EmployeeId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = setInterval(() => {
      console.log("interval");
      dispatch(fechUnAssignQuery());
    }, 50000);

    return () => {
      clearInterval(id);
    };
  }, []);

  var UAQuery = useSelector((state) => state.query.UnassignQuery);
  const UAQID = useSelector((state) => state.query.UAQID);

  useEffect(() => {
    if (UAQuery?.length > 0 && UAQID === "") {
      dispatch(setUAQID(UAQuery?.[0]?.query_id));
    }
  }, [UAQuery]);

  if (SearchInput) {
    UAQuery = UAQuery.filter(
      ({ query_subject }) =>
        query_subject &&
        query_subject.toLowerCase().includes(SearchInput.toLowerCase())
    );
  }

  // console.log(SortType);

  if (SortType && UAQuery) {
    if (SortType === "A-Z") {
      UAQuery = UAQuery.slice().sort(function (a, b) {
        const nameA = a.query_subject.toUpperCase();
        const nameB = b.query_subject.toUpperCase();
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });

      if (UAQuery[0]) {
        dispatch(setUAQID(UAQuery[0].query_id));
      }
    } else if (SortType === "N-O") {
      UAQuery = UAQuery.slice().sort((x, y) => {
        x = new Date(x.createdAt);
        y = new Date(y.createdAt);
        return y - x;
      });

      if (UAQuery[0]) {
        dispatch(setUAQID(UAQuery[0].query_id));
      }
    } else if (SortType === "O-N") {
      UAQuery = UAQuery.slice().sort((x, y) => {
        x = new Date(x.createdAt);
        y = new Date(y.createdAt);
        return x - y;
      });

      if (UAQuery[0]) {
        dispatch(setUAQID(UAQuery[0].query_id));
      }
    } else if (SortType === "TII") {
      UAQuery = UAQuery.filter(
        ({ query_source }) => query_source && query_source === "indiamart"
      );

      if (UAQuery[0]) {
        dispatch(setUAQID(UAQuery[0].query_id));
      }
    } else if (SortType === "CST") {
      UAQuery = UAQuery.filter(
        ({ query_source }) => query_source && query_source !== "indiamart"
      );

      if (UAQuery[0]) {
        dispatch(setUAQID(UAQuery[0].query_id));
      }
    }
  }

  if ((SearchInput || SortType) && (!UAQuery || UAQuery.length === 0)) {
    return (
      <div className="flex justify-center items-center pt-20 text-blue-500">
        No Requirement with matching filter...
      </div>
    );
  }

  // if (!UAQuery) {
  //     return <div className='flex justify-center items-center pt-20 text-blue-500'>Loading Requirement...</div>;
  // }

  // if (UAQuery.length === 0) {
  //     return <div className='flex justify-center items-center pt-20 text-blue-500'>No Requirement...</div>;
  // }

  // console.log(UAQuery);

  return (
    <div className="my-5 overflow-y-scroll h-screen">
      {UAQuery &&
        UAQuery?.map((q, index) => {
          return (
            <ClientRequest
              request={q.query_subject}
              requestCatagory={q.query_product}
              date={q.createdAt.split("T")[0]}
              Status={"New"}
              Lastseen={q.updatedAt.split("T")[0]}
              key={index}
              QueryId={q.query_id}
              EmployeeId={EmployeeId}
            />
          );
        })}

      {/* <ClientRequest request={"need something that shown up here this is lengthy request"} requestCatagory={"fiber glass cata"} date={"12-1-11"} Status={"New"} Lastseen={""} key={2} QueryId={1} EmployeeId={1} />
            <ClientRequest request={"need something that shown up here this is lengthy request"} requestCatagory={"fiber glass cata"} date={"12-1-11"} Status={"New"} Lastseen={""} key={2} QueryId={1} EmployeeId={1} />
            <ClientRequest request={"need something that shown up here this is lengthy request"} requestCatagory={"fiber glass cata"} date={"12-1-11"} Status={"New"} Lastseen={""} key={2} QueryId={1} EmployeeId={1} />
            <ClientRequest request={"need something that shown up here this is lengthy request"} requestCatagory={"fiber glass cata"} date={"12-1-11"} Status={"New"} Lastseen={""} key={2} QueryId={1} EmployeeId={1} />
            <ClientRequest request={"need something that shown up here this is lengthy request"} requestCatagory={"fiber glass cata"} date={"12-1-11"} Status={"New"} Lastseen={""} key={2} QueryId={1} EmployeeId={1} />
            <ClientRequest request={"need something that shown up here this is lengthy request"} requestCatagory={"fiber glass cata"} date={"12-1-11"} Status={"New"} Lastseen={""} key={2} QueryId={1} EmployeeId={1} />
            <ClientRequest request={"need something that shown up here this is lengthy request"} requestCatagory={"fiber glass cata"} date={"12-1-11"} Status={"New"} Lastseen={""} key={2} QueryId={1} EmployeeId={1} />
            <ClientRequest request={"need something that shown up here this is lengthy request"} requestCatagory={"fiber glass cata"} date={"12-1-11"} Status={"New"} Lastseen={""} key={2} QueryId={1} EmployeeId={1} />
            <ClientRequest request={"need something that shown up here this is lengthy request"} requestCatagory={"fiber glass cata"} date={"12-1-11"} Status={"New"} Lastseen={""} key={2} QueryId={1} EmployeeId={1} /> */}
    </div>
  );
}

export default NewRequrement;
