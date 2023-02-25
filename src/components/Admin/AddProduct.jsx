import { useState, useEffect } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux'
import {
    XCircleIcon,
} from '@heroicons/react/24/outline'

import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import axios from 'axios';
import { fetchProducts } from '../../Reducer/productSlice';




function AddProduct({ visible, close }) {



    const dispatch = useDispatch();



    const [Field, setField] = useState("");
    const [DataField, setDataField] = useState("");
    const [Error, setError] = useState({
        "ProductNameError": false,
        "ModelNameError": false,
        "ModelNameKey": ""
    })

    const Prods = useSelector((state) => state.product.products);

    const [data, setdata] = useState({
        "ModelNo": {
            "data": {

            },
            "ModleNo": "",
            "HSN Code": "",
            "Width": "",
            "Length": "",
            "Min Rate": "",
            "Standard Rate": "",
            "Selling Unit": ""
        },
    });


    const [Product, setProduct] = useState({
        "productName": "",
        "newProducts": {
            "products": {
            }
        }
    })





    // ------------------------- for meta data --------------------------------------------


    const AddMoreFields = () => {

        let preData = { ...data };

        preData.ModelNo[Field] = "";

        setField("");

        setdata(preData);

    }

    const RemoveFields = (element) => {

        let preData = { ...data };

        // console.log(element);

        delete preData.ModelNo[element[0]];

        setdata(preData);

    }

    const AddMoreDataFields = () => {

        let preData = { ...data };

        preData.ModelNo.data[DataField] = "";

        setDataField("");

        setdata(preData);

    }


    const RemoveDataFields = (element) => {

        let preData = { ...data };

        delete preData.ModelNo.data[element[0]];

        setdata(preData);

    }


    // -------------------------------------------- set name -------------------------------------------


    const setProductName = (e) => {
        let preProduct = { ...Product };

        var preerror = { ...Error };
        if (Prods.hasOwnProperty(e.target.value)) {
            preerror.ProductNameError = true;

        } else {
            preerror.ProductNameError = false;
        }

        setError(preerror);
        preProduct.productName = e.target.value;

        setProduct(preProduct);
    }



    //------------------------------------------------------------ CRUD product -------------------------


    const addProductFields = () => {

        let preProduct = { ...Product };

        preProduct.newProducts.products = {
            ...Product.newProducts.products,

            "ModelNo": structuredClone(data.ModelNo)

        }
        setProduct(preProduct)
        // console.log(Product);
    }


    const RemoveProductFields = (element) => {

        let preProduct = { ...Product };

        delete preProduct.newProducts.products[element]

        setProduct(preProduct);

    }


    // ------------------------------------------------------  Add data --------------------------------

    const setModelDataFlields = (e, element) => {

        // console.log(element)

        let preProduct = { ...Product };

        if (e.target.name === "ModleNo") {

            preProduct.newProducts.products[element][e.target.name] = e.target.value;

            var preerror = { ...Error };

            if (Product.newProducts.products.hasOwnProperty(e.target.name)) {

                preerror.ModelNameError = true;
                preerror.ModelNameKey = element;

            } else {
                preProduct.newProducts.products[e.target.value] = preProduct.newProducts.products[element];
                delete preProduct.newProducts.products[element];

                preerror.ModelNameError = false;
                preerror.ModelNameKey = "";

            }
            setError(preerror);


        } else {
            preProduct.newProducts.products[element][e.target.name] = e.target.value;
        }

        setProduct(preProduct);
        // console.log(Product);
    }

    const setDataFlields = (e, element) => {

        // console.log(element)

        let preProduct = { ...Product };

        preProduct.newProducts.products[element].data[e.target.name] = e.target.value;

        setProduct(preProduct);
        // console.log(Product);
    }


    const handelAddProduct = () => {

        var data = JSON.stringify({
            "data": Product
        });


        if (Product.productName === "" || Error.ProductNameError) {
            Store.addNotification({
                title: "Validation Error",
                message: "Please Enter Valid Product Name...",
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

            var config = {
                method: 'post',
                url: `${process.env.REACT_APP_HOST}/api/product/`,
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
                            title: "Product Added Successfully",
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


    }


    if (!visible) return null;


    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center">

            <div className='w-[98%] md:w-[1100px] h-[82%] md:h-[85%] overflow-y-scroll  bg-bg rounded-md'>


                <div className='sticky top-0 backdrop-blur-sm bg-bg bg-opacity-20'>
                    <div className='flex justify-between px-5 md:px-20 pt-5 pb-2'>
                        <h1 className='heading'>Add Product</h1>
                        <XCircleIcon onClick={() => close(false)} className="w-8 hover:cursor-pointer" />
                    </div>
                </div>

                <div className='px-5 md:px-28 pb-20 md:w-[95%]'>

                    {/* <h1 className='text-heading pt-8 pb-2 text-green-500'>Products</h1> */}

                    <div className='my-7'>
                        <div className='flex flex-col'>
                            <label className='label'>Product Name {Error.ProductNameError ? <span className='text-red-500 text-xsm'>Product Already Exists!</span> : null}</label>
                            <input className='md:w-[300px] Qinput' type="text" name="productName" value={Product.productName} onChange={(e) => { setProductName(e) }} />
                        </div>

                        <div className='py-2 mt-5'>
                            <label className='label'>Product Details</label>

                            <div className='flex flex-col md:flex-row border-dashed border-2 my-5'>

                                <div className='md:basis-1/2 ml-5 my-5 flex flex-col'>
                                    {
                                        Object.entries(data.ModelNo).filter(function (e) { return e[0] !== "data" })
                                            .map((element, index) => {

                                                return (
                                                    <div key={index} onClick={() => { RemoveFields(element); }} className="hover:cursor-pointer hover:text-red-500">{element}</div>
                                                )

                                            })
                                    }

                                    <div className='mt-4'>

                                        <input className='Qinput' type="text" name="productName" value={Field} onChange={(e) => { setField(e.target.value) }} />
                                        <button className='px-4 py-1 bg-blue-500 rounded-sm text-white mx-2' onClick={() => { AddMoreFields() }}>Add</button>

                                    </div>



                                </div>
                                <div className='md:basis-1/2 my-5 ml-5 md:ml-0 md:mr-5 flex flex-col'>

                                    <div>Data fields</div>

                                    {
                                        Object.entries(data.ModelNo.data)
                                            .map((element, index) => {

                                                return (
                                                    <div key={index} onClick={() => { RemoveDataFields(element); }} className="hover:cursor-pointer hover:text-red-500" >{element}</div>
                                                )

                                            })
                                    }

                                    <div className='mt-4 w-full'>

                                        <input className='Qinput' type="text" name="productName" value={DataField} onChange={(e) => { setDataField(e.target.value) }} />
                                        <button className='px-4 py-1 bg-blue-500 rounded-sm text-white mx-2' onClick={() => { AddMoreDataFields() }}>Add</button>

                                    </div>

                                </div>
                            </div>

                            <div className='flex justify-center my-5'>
                                <button className='px-4 py-1 bg-blue-500 rounded-sm text-white mx-2' onClick={() => { addProductFields() }}>Add Products</button>
                            </div>

                        </div>


                        <h1 className='my-5 text-blue-500'>Products</h1>
                        <div className='ml-2'>


                            {
                                Object.entries(Product.newProducts.products).map((element, index) => {


                                    {/* console.log(element); */ }

                                    return (


                                        <div>

                                            <h1>{element[0]} {Error.ModelNameError && Error.ModelNameKey === element[0] ? <span className='text-red-500 text-xsm'>ModelNo Already Exists!</span> : null}</h1>
                                            <div className='flex flex-col md:flex-row border-2 border-dashed px-5 py-5' key={index}>

                                                <div className='md:basis-1/2 ml-5 my-5 flex flex-col'>

                                                    <div>Data fields</div>

                                                    {
                                                        Object.entries(element[1]).filter(function (e) { return e[0] !== "data" })
                                                            .map(([key, value], index) => {

                                                                return (
                                                                    <div className='flex flex-col' key={index}>
                                                                        <label className='label'>{key}</label>
                                                                        <input className='w-[90%] Qinput' type="text" name={key} value={value} onChange={(e) => {
                                                                            setModelDataFlields(e, element[0]);
                                                                        }} />
                                                                    </div>
                                                                )

                                                            })
                                                    }

                                                </div>

                                                <div className='md:basis-1/2 my-5 mr-5 flex flex-col'>

                                                    <div>Data fields</div>

                                                    {

                                                        Object.entries(element[1].data).map(([key, value], index) => {
                                                            {/* console.log(key) */ }
                                                            return (
                                                                <div className='flex flex-col' key={index}>
                                                                    <label className='label'>{key}</label>
                                                                    <input className='w-[90%] Qinput' type="text" name={key} value={value} onChange={(e) => {
                                                                        setDataFlields(e, element[0]);
                                                                    }} />
                                                                </div>
                                                            )
                                                        })
                                                    }


                                                </div>

                                            </div>

                                            <div className='flex justify-end my-2'>
                                                <button className='px-4 py-1 bg-blue-500 rounded-sm text-white mx-2' onClick={() => { RemoveProductFields(element[0]) }}>Remove</button>
                                                <button className='px-4 py-1 bg-blue-500 rounded-sm text-white mx-2' onClick={() => { addProductFields() }}>Add More</button>
                                            </div>

                                        </div>
                                    )

                                })

                            }
                        </div>

                        <button className='px-4 py-2 bg-green-500 text-white my-4 rounded-md shadow-md' onClick={() => { handelAddProduct() }} >Add Product</button>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default AddProduct;