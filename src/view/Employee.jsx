import React from "react";
import Sidebar from "../components/Employee/Sidebar";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Leave from "../components/Employee/Leave";
import Notifcations from "../components/Employee/Notifcations";
import Clients from "../components/Employee/Clients";
import Requrements from "../components/Employee/Requrements";

import { PopupProvider } from "../components/PopupsContext";
import Invoice from "../components/Employee/Invoice";

function Employee() {
  const [Input, setInput] = useState(true);

  const searchHandler = () => {
    setInput(!Input);
    // console.log(Input)
  };

  return (
    <PopupProvider>
      <div className="flex">
        <Sidebar />

        <Routes>
          <Route
            path="/clients"
            element={<Clients Input={Input} searchHandler={searchHandler} />}
          />
          <Route
            path="/requirements"
            element={
              <Requrements Input={Input} searchHandler={searchHandler} />
            }
          />
          <Route
            path="/"
            element={
              <Requrements Input={Input} searchHandler={searchHandler} />
            }
          />
          <Route path="/notification" element={<Notifcations />} />
          <Route path="/Leave" element={<Leave />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </div>
    </PopupProvider>
  );
}

export default Employee;
