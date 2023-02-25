import { useState } from "react";
import {
  UserCircleIcon,
  Squares2X2Icon,
  BellAlertIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import SidebarOption from "../SidebarOption";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
  // const Active = true;
  const navigate = useNavigate();
  const [Panel, setPanel] = useState("Employee Panel");

  const Auth = useSelector((state) => state.user.auth);
  const User = useSelector((state) => state.user.user);

  const HandelPanelSelection = (e) => {
    var val = e.target.value;

    if (val === "Admin") {
      navigate("/admin");
      setPanel("Admin Panel");
    }
    if (val === "Hr") {
      navigate("/hr");
      setPanel("Hr Department");
    }
    // console.log(val);
  };

  return (
    <div className="md:basis-[17%] md:h-screen">
      <div className="hidden md:block">
        {/* Employee details */}

        <div className="p-2 m-2 mt-7 flex items-center justify-center">
          <div className="flex items-center">
            <div className="w-9 h-9 bg-indigo-100 outline outline-primary outline-2 rounded-md p-1 mx-1">
              <UserCircleIcon className="stroke-primary" />
            </div>
            <div className="mx-2">
              <h1 className="text-md font-medium">
                {User ? User.employee_name : "User Name"}
              </h1>
              <p className="text-sm text-gray-400">
                {User ? User.employee_office_email : "User Email"}
              </p>
            </div>
          </div>
        </div>

        <hr className="mx-auto my-2 w-[60%] bg-primary h-[2px]" />

        {Auth === "Admin" ? (
          <div className="mt-10 p-2 px-4">
            <div>
              <select
                id="panel"
                name="panel"
                className="bg-gray-50 w-full p-2.5 outline-none border-blue-500  focus:ring-blue-500 rounded-md text-sm focus:border-blue-500 block"
                onChange={(e) => {
                  HandelPanelSelection(e);
                }}
                defaultValue={Panel}
              >
                <option value="Select Option" hidden selected>
                  Employee Panel
                </option>
                <option className="text-sm" value="Hr">
                  HR Department
                </option>
                <option className="text-sm" value="Admin">
                  Admin Panel
                </option>
              </select>
            </div>
          </div>
        ) : null}

        <div className="mt-10">
          <SidebarOption
            link={"requirements"}
            Icon={Squares2X2Icon}
            Title={"DashBoard"}
          />
          <SidebarOption
            link={"clients"}
            Icon={UserGroupIcon}
            Title={"Clients"}
          />
          <SidebarOption
            link={"notification"}
            Icon={BellAlertIcon}
            Title={"Notifications"}
          />
          <SidebarOption
            link={"invoice"}
            Icon={ClipboardDocumentListIcon}
            Title={"Invoice"}
          />
          <SidebarOption
            link={"Leave"}
            Icon={BriefcaseIcon}
            Title={"Request For Leave"}
          />
        </div>
      </div>

      {/* for mobile */}

      <div className="fixed w-full bottom-0 bg-white z-50 md:hidden">
        <div className="flex justify-evenly items-center">
          {Auth === "Admin" ? (
            <div>
              <select
                id="panel"
                name="panel"
                className="w-9 block hover:cursor-pointer"
                onChange={(e) => {
                  HandelPanelSelection(e);
                }}
                defaultValue={Panel}
              >
                <option
                  value="Select Option"
                  hidden
                  selected
                  className="text-[#b2b2b4]"
                >
                  E
                </option>
                <option className="text-sm" value="Hr">
                  H
                </option>
                <option className="text-sm" value="Admin">
                  A
                </option>
              </select>
            </div>
          ) : null}
          <SidebarOption
            link={"requirements"}
            Icon={Squares2X2Icon}
            Title={"DashBoard"}
          />
          <SidebarOption
            link={"clients"}
            Icon={UserGroupIcon}
            Title={"Clients"}
          />
          <SidebarOption
            link={"notification"}
            Icon={BellAlertIcon}
            Title={"Notifications"}
          />
          <SidebarOption
            link={"invoice"}
            Icon={ClipboardDocumentListIcon}
            Title={"Invoice"}
          />
          <SidebarOption
            link={"Leave"}
            Icon={BriefcaseIcon}
            Title={"Request For Leave"}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
