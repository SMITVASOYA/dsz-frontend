import { useEffect, useState } from "react";
import axios from "axios";
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { TrashIcon } from '@heroicons/react/24/outline'
import AddProduct from "./AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Reducer/productSlice";

function Products() {


    const dispatch = useDispatch();
    const Prods = useSelector((state) => state.product.products);


    const [Products, setProducts] = useState({})
    const [FetchProducts, setFetchProducts] = useState({})
    const [InputVal, setInputVal] = useState("");
    const [AddProductPopup, setAddProductPopup] = useState(false);


    // console.log(Products);

    const HandelInputChange = (e) => {
        setInputVal(e.target.value);

        // console.log(e.target.value.length);

        if (e.target.value.length === 0) {
            setProducts(FetchProducts);
        } else {
            var filteredProducts = Object.keys(FetchProducts)
                .filter(key => key.toLocaleLowerCase().includes(e.target.value.toLowerCase()))
                .reduce((obj, key) => {
                    obj[key] = FetchProducts[key];
                    return obj;
                }, {});

            setProducts(filteredProducts);
        }


    }

    const HandelSearchIconClick = () => {
        var filteredProducts = Object.keys(FetchProducts)
            .filter(key => key.toLocaleLowerCase().includes(InputVal.toLowerCase()))
            .reduce((obj, key) => {
                obj[key] = FetchProducts[key];
                return obj;
            }, {});
        // console.log(filteredProducts);

        setProducts(filteredProducts);
    }

    // const CloseAddProductPopup = () => {
    //     setAddProductPopup(false);
    // }


    const fetchProductsHook = () => {

        dispatch(fetchProducts());



    }

    useEffect(() => {

        fetchProductsHook();
        setProducts(Prods);
        setFetchProducts(Prods);

    }, []);



    const handelDeleteProduct = (product) => {

        console.log(product)

        var data = JSON.stringify({
            "data": {
                "productName": product
            }
        });

        var config = {
            method: 'patch',
            url: `${process.env.REACT_APP_HOST}/api/product/delete_product`,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            data: data
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                var resdata = response.data;
                if (resdata.error) {

                    // var errordata = errorMessages[resdata.errorMessage];

                    Store.addNotification({
                        title: resdata.errorType,
                        message: resdata.errorMessage,
                        type: "warning",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                    });

                } else {

                    Store.addNotification({
                        title: "Product Deleted Successfully",
                        message: "Success",
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                    });

                    var prod = JSON.parse(resdata.data.product_list);
                    setFetchProducts(prod[0]);

                    dispatch(fetchProducts());
                }
            })
            .catch(function (error) {
                // console.log(error);
                var result = error.response.data;

                // console.log(result);

                if (result) {
                    if (result.error) {

                        Store.addNotification({
                            title: result.errorType ? result.errorType : "Error!",
                            message: result.errorMessage ? result.errorMessage : "Error While Processing Request!",
                            type: "warning",
                            insert: "top",
                            container: "top-right",
                            animationIn: ["animate__animated", "animate__fadeIn"],
                            animationOut: ["animate__animated", "animate__fadeOut"],
                            dismiss: {
                                duration: 5000,
                                onScreen: true
                            }
                        });
                    }


                }
            });
    }


    return (
        <div className="basis-[100%] h-screen md:basis-[83%] flex flex-col bg-bg">

            <div className="ml-7 mt-5 pb-2">
                <div className="flex justify-start w-full">
                    <input type="text" className="ml-4 bg-bg outline-none pl-3 border-b-2 border-primary grow" value={InputVal} onChange={(e) => { HandelInputChange(e) }} placeholder="Search..."></input>
                    <div>
                        <span className='w-9 flex justify-center items-center ml-2 rounded-md bg-blue-300 hover:cursor-pointer' onClick={() => { InputVal.length > 0 && HandelSearchIconClick() }} >
                            <svg width="18" height="40" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.1251 20.125L15.826 15.8183M18.2084 10.0625C18.2084 12.2229 17.3502 14.2949 15.8226 15.8225C14.2949 17.3501 12.223 18.2084 10.0626 18.2084C7.90217 18.2084 5.83025 17.3501 4.30261 15.8225C2.77497 14.2949 1.91675 12.2229 1.91675 10.0625C1.91675 7.90211 2.77497 5.83019 4.30261 4.30255C5.83025 2.77491 7.90217 1.91669 10.0626 1.91669C12.223 1.91669 14.2949 2.77491 15.8226 4.30255C17.3502 5.83019 18.2084 7.90211 18.2084 10.0625V10.0625Z" stroke="#1D90F3" stroke-width="2" stroke-linecap="round" />
                            </svg>
                        </span>
                    </div>
                    <button className="hidden md:block px-2 py-1 bg-blue-500 text-white mx-2 rounded-md md:mr-5" onClick={() => {
                        setAddProductPopup(true);
                    }}>Add Product</button>

                    <button className="md:hidden px-3 py-1 bg-blue-500 text-white mx-2 rounded-md mr-2" onClick={() => {
                        setAddProductPopup(true);
                    }}>+</button>
                </div>
            </div>

            <div className="w-[full] h-[90%] overflow-y-scroll mr-2 pl-10 pt-5">
                {
                    InputVal.length > 0 && Object.keys(Products).length === 0 ?

                        <div className="flex justify-center items-center">No products matching with Search...</div>

                        : Object.keys(Products).length > 0 && Object.keys(Products).length > 0 && Object.entries(Products).map(([prod, value], id) => {
                            return (
                                <div className="py-4" key={id}>
                                    <div className="text-blue-500 text-lg flex items-center">
                                        {prod}

                                        <span name={prod} onClick={e => {
                                            handelDeleteProduct(prod)
                                            // console.log(prod);
                                        }}>
                                            <TrashIcon className="w-7 h-7 ml-3 hover:cursor-pointer text-red-500" />
                                        </span>

                                    </div>

                                    <div>{Object.entries(value.products).map(([pkey, pvalues], pid) => {
                                        return (

                                            <div className="py-2 pl-5">
                                                <div className="py-2">{pkey}</div>

                                                <div className="flex flex-col md:flex-row bg-white shadow-sm rounded-md py-2 px-4 w-[95%] md:w-2/3">

                                                    <div className="md:basis-1/2">

                                                        {
                                                            Object.entries(pvalues).filter(function (e) { return e[0] !== "data" }).map(([key, val], pd_id) => {
                                                                return (
                                                                    <div>{key}:{val}</div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="mt-2 md:mt-0 md:basis-1/2">

                                                        <p>Data</p>
                                                        {
                                                            pvalues.data ? Object.entries(pvalues.data).map(([dkey, dval], d_id) => {
                                                                return (
                                                                    <div>{dkey}:{dval}</div>
                                                                )
                                                            }) : null}

                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })}</div>

                                </div>
                            )
                        })
                }
            </div>

            <AddProduct visible={AddProductPopup} close={setAddProductPopup} />

        </div>
    )
}

export default Products