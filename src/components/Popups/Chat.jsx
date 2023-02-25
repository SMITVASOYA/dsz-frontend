import React from 'react'
import {
    XCircleIcon
} from '@heroicons/react/24/outline'

function Chat({ visible, close }) {

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center">

            <div className='w-[1000px] h-[85%] overflow-y-scroll md:h-screen bg-bg rounded-md'>

                <div className='sticky top-0 backdrop-blur-sm bg-bg bg-opacity-20'>
                    <div className='flex justify-between px-20 pt-5 pb-2'>
                        <h1 className='heading'>Chat</h1>
                        <XCircleIcon onClick={() => close(false)} className="w-8" />
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Chat