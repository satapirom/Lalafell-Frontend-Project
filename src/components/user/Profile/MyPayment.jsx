import React from 'react';
import { Link } from 'react-router-dom';

const MyPayment = () => {
    return (
        <div className="p-6 bg-gray-50 rounded-lg ">
            <Link to="/purchase-history" className="text-xl text-gray-800 font-bold hover:text-blue-600">
                More Activity
            </Link>
        </div>
    )
}

export default MyPayment