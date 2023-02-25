import axios from 'axios';
const { createSlice } = require('@reduxjs/toolkit');

const clientSlice = createSlice({
    name: 'client',
    initialState: {},
    reducers: {
        setActiveClients(state, action) {
            state.Activeclients = action.payload;
        },
        setActiveClientID(state, action) {
            state.activeAClientId = action.payload;
        },
        setBlockClients(state, action) {
            state.Blockclients = action.payload;
        },
        setBlockClientID(state, action) {
            state.activeBClientId = action.payload;
        },
        setMDCSidebar(state, action) {
            state.MDCSidebar = action.payload;
        }
    }
})

export const { setActiveClientID, setActiveClients, setBlockClients, setBlockClientID, setMDCSidebar } = clientSlice.actions;
export default clientSlice.reducer;


export function fechActiveClients() {

    return async function fechActiveClientsThunk(dispatch, getState) {
        try {

            var config = {
                method: 'get',
                url: `${process.env.REACT_APP_HOST}/api/client/all/active`,
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
                    dispatch(setActiveClients(resData.data));

                    if (resData.data[0]) {
                        dispatch(setActiveClientID(resData.data[0].client_id));
                    } else {
                        dispatch(setActiveClientID(undefined));
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

export function fechBlockClients() {

    return async function fechBlockClientsThunk(dispatch, getState) {
        try {

            var config = {
                method: 'get',
                url: `${process.env.REACT_APP_HOST}/api/client/all/blocked`,
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
                    dispatch(setBlockClients(resData.data));

                    if (resData.data[0]) {
                        dispatch(setBlockClientID(resData.data[0].client_id));
                    } else {
                        dispatch(setBlockClientID(undefined));
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