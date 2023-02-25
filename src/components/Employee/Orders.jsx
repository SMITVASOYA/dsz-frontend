import React from 'react'

function Orders({ OrderId, OrderSatus, OrderDate, OrderDetails }) {
    return (
        <div className='shadow-md text-sm m-2 px-3 py-5 rounded-sm'>

            <div className='flex justify-between'>
                <div>
                    <h1 className=''>Order Id</h1>
                    <p className='text-black font-medium'>{OrderId}</p>
                </div>
                <div>
                    <h1 className=''>Order Date</h1>
                    <p className='text-black font-medium'>{OrderDate}</p>
                </div>
                <span className='bg-blue-100 text-primary px-2 py-1 h-[50%] rounded-sm'>{OrderSatus}</span>
            </div>

            <div className='pt-2'>
                <h1>Order Details</h1>
                <p className='text-black font-medium'>{OrderDetails}</p>
            </div>

        </div>
    )
}

export default Orders