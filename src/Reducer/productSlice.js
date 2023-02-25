import axios from 'axios';
const { createSlice } = require('@reduxjs/toolkit');

const productSlice = createSlice({
    name: 'product',
    initialState: {},
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },
    }
})

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;


export function fetchProducts() {

    return async function fechProducts(dispatch, getState) {
        try {

            var config = {
                method: 'get',
                url: `${process.env.REACT_APP_HOST}/api/product/product_list`,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            };

            axios(config)
                .then(function (response) {
                    // console.log(JSON.stringify(response.data));
                    var resData = response.data;

                    if (resData.error) {

                        dispatch(setProducts({}))

                    } else {
                        var prod = JSON.parse(resData.data.product_list);
                        // console.log(prod[0])
                        dispatch(setProducts(prod[0]));
                    }

                })
                .catch(function (error) {
                    // console.log(error);
                    dispatch(setProducts({}))
                });


        } catch (error) {
            // console.log(error);
        }
    }

}