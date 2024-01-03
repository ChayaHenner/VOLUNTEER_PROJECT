import React from 'react'

const Loading = ({text}) => {
    return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-xs">

            <svg fill='none' className="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                <path clip-rule='evenodd'
                    d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                    fill='currentColor' fill-rule='evenodd' />
            </svg>


            <div>{text}</div>
        </div>
    )
}

export default Loading