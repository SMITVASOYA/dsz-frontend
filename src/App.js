import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Employee from "./view/Employee";
import Hr from "./view/Hr";
import Admin from "./view/Admin";
import Login from "./view/Login";

import { useDispatch, useSelector } from "react-redux";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useEffect, useState } from "react";
import { setAuth, setDept, setEmployeeId, setUser } from "./Reducer/userSlice";
import { isEmpty } from "./utilities/utilities";
import { fetchProducts } from "./Reducer/productSlice";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const UserDetails = useSelector((state) => state.user);

  const dispach = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // const User = UserDetails.auth;
  // const User = true;
  useEffect(() => {
    console.log("hello");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(isLoggedIn);
    if (isEmpty(UserDetails)) {
      console.log("cool");
      dispach(setUser(user));
      dispach(setDept(user?.employee_department));
      dispach(setEmployeeId(user?.employee_id));
      dispach(fetchProducts());

      if (user?.employee_isAdmin === 1) {
        dispach(setAuth("Admin"));
      } else if (user?.employee_isHR === 1) {
        dispach(setAuth("Hr"));
      } else {
        dispach(setAuth("Employee"));
      }

      if (user?.employee_isAdmin === 1) {
        navigate("/admin");
      } else if (user?.employee_department === "Employee") {
        navigate("/employee");
      } else if (user?.employee_department === "hr") {
        navigate("/hr");
      }
    }
  }, [UserDetails, location.pathname]);

  return (
    <div>
      <ReactNotifications />
      <>
        {!isLoggedIn ? (
          <Login />
        ) : (
          <div>
            <Routes>
              <Route path="/employee/*" element={<Employee />} />
              <Route path="/hr/*" element={<Hr />} />
              <Route path="/admin/*" element={<Admin />} />
            </Routes>
          </div>
        )}
      </>
    </div>
  );
}

export default App;
