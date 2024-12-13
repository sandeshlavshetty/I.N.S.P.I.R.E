import React from "react";

export const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="flex space-x-2">
                <div className="h-4 w-4 rounded-full bg-blue-500 animate-pulse"></div>
                <div className="h-4 w-4 rounded-full bg-blue-500 animate-pulse delay-100"></div>
                <div className="h-4 w-4 rounded-full bg-blue-500 animate-pulse delay-200"></div>
            </div>
        </div>
    );
};
