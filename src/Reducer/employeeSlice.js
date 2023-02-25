import axios from 'axios';
const { createSlice } = require('@reduxjs/toolkit');

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {},
    reducers: {
        setEployees(state, action) {
            state.employees = action.payload;
        },
        setEmployeeID(state, action) {
            state.employeeId = action.payload;
        },
        setEployeesAttendance(state, action) {
            state.employeesAttendance = action.payload;
        },
        setEmployeeAttendanceID(state, action) {
            state.employeeAttendanceId = action.payload;
        },
        setAttendance(state, action) {
            state.Attendance = action.payload;
        },
        setMDESidebar(state, action) {
            state.MDESidebar = action.payload;
        },
        setMDEASidebar(state, action) {
            state.MDEASidebar = action.payload;
        },
    }
})

export const { setEployees, setEmployeeID, setEployeesAttendance, setEmployeeAttendanceID, setAttendance, setMDESidebar, setMDEASidebar } = employeeSlice.actions;
export default employeeSlice.reducer;


export function fechEmployees() {

    return async function fechEmployeesThunk(dispatch, getState) {
        try {

            var config = {
                method: 'get',
                url: `${process.env.REACT_APP_HOST}/api/employee/all`,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            };

            // console.log(config.url);

            axios(config)
                .then(function (response) {
                    // console.log(JSON.stringify(response.data));
                    var resData = response.data;
                    dispatch(setEployees(resData.data));

                    if (resData.data[0]) {
                        dispatch(setEmployeeID(resData.data[0].employee_id));
                    } else {
                        dispatch(setEmployeeID(undefined));
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        } catch (error) {
            console.log(error);
        }
    }

}



export function fechEmployeesAttendance({ mm, yyyy }) {

    return async function fechEmployeesAttendanceThunk(dispatch, getState) {
        try {

            // const state = getState();

            var config = {
                method: 'get',
                url: `${process.env.REACT_APP_HOST}/api/auth/attendance/allEmployees?month=${mm}&year=${yyyy}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            };

            // console.log(config.url);

            axios(config)
                .then(function (response) {
                    // console.log(JSON.stringify(response.data));
                    var resData = response.data;
                    dispatch(setEployeesAttendance(resData.data));

                    if (resData.data[0]) {
                        dispatch(setEmployeeAttendanceID(resData.data[0].employee_id));
                    } else {
                        dispatch(setEmployeeAttendanceID(undefined));
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        } catch (error) {
            console.log(error);
        }
    }

}


export function fechAttendance({ mm, yyyy, EmployeeId }) {

    return async function fechAttendanceThunk(dispatch, getState) {
        try {

            // const state = getState();

            var config = {
                method: 'get',
                url: `${process.env.REACT_APP_HOST}/api/auth/attendance/${EmployeeId}?month=${mm}&year=${yyyy}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            };

            // console.log(config.url);

            axios(config)
                .then(function (response) {
                    // console.log(JSON.stringify(response.data));
                    var resData = response.data;

                    if (resData.error) {

                    } else {
                        dispatch(setAttendance(resData.data.attendance_array))
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        } catch (error) {
            console.log(error);
        }
    }

}

