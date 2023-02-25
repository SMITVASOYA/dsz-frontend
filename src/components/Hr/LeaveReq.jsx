import React from "react";
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "../TabSelector";
import ActiveLeaveReq from "./ActiveLeaveReq";
import ArchiveLeaveReq from "./ArchiveLeaveReq";

function LeaveReq() {
  const [selectedTab, setSelectedTab] = useTabs(["Active", "Archived"]);

  return (
    <div className="basis-[100%] md:basis-[83%] bg-bg overflow-y-scroll h-screen">
      <div className="my-10 md:mx-5">
        <nav className="flex my-4">
          <TabSelector
            isActive={selectedTab === "Active"}
            onClick={() => setSelectedTab("Active")}
          >
            Active
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "Archived"}
            onClick={() => setSelectedTab("Archived")}
          >
            Archived
          </TabSelector>
        </nav>

        <h1 className="ml-5 pt-5 font-medium text-black">Leave Requests</h1>

        <div className="ml-5 py-5">
          {selectedTab === "Active" && (
            <TabPanel hidden={selectedTab !== "Active"}>
              <ActiveLeaveReq />
            </TabPanel>
          )}
          {selectedTab === "Archived" && (
            <TabPanel hidden={selectedTab !== "Archived"}>
              <ArchiveLeaveReq />
            </TabPanel>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaveReq;
