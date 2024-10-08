import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAddress from '../../../hooks/user/useAddress.js';

const DeliveryAddress = () => {
    const { selectedAddress, defaultAddress } = useAddress();

    const addressToShow = selectedAddress || defaultAddress;

    return (
        <div className='flex justify-between gap-4'>
            <div>
                <h1>Delivery Address</h1>
                {addressToShow ? (
                    <div>
                        <p>{addressToShow.name} | {addressToShow.phone}</p>
                        <p>
                            {addressToShow.street},
                            {addressToShow.city},
                            {addressToShow.country},
                            {addressToShow.state},
                            {addressToShow.postalCode}
                        </p>
                        {addressToShow.isDefault && <span className="text-blue-500 font-medium"> (Default)</span>}
                    </div>
                ) : (
                    <p>No address available.</p>
                )}
            </div>
            <div className='flex items-center mx-2'>
                <Link to='/address' className='top-80'>
                    <ChevronRight />
                </Link>
            </div>
        </div>
    );
};

export default DeliveryAddress;


