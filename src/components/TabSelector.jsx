import * as React from "react";

export const TabSelector = ({
    isActive,
    children,
    onClick,
}) => (
    <button
        className={`list border-b-2 leading-5 cursor-pointer whitespace-nowrap ${isActive
            ? "border-blue-500 text-blue-600 focus:outline-none focus:text-blue-800 focus:border-blue-700"
            : "border-transparent text-black hover:text-gray-600 hover:border-gray-300 focus:text-gray-600 focus:border-gray-300"
            }`}
        onClick={onClick}
    >
        {children}
    </button>
);