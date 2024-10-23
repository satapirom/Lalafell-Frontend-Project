import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAddress from '../../../hooks/user/useAddress.js';

const DeliveryAddress = () => {
    const { selectedAddress, defaultAddress } = useAddress();

    const addressToShow = selectedAddress || defaultAddress;

    return (
        <div className="flex justify-between items-center gap-4 rounded-lg custom-bg p-8 mt-8 ">
            <div className="flex-grow ">
                <div className='flex items-center gap-2  mb-4'>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 28" width="24" height="28" color="#5c6bc0" fill="none">
                            <path d="M18.5 15.082L16.5 15.082M13 15.082L11 15.082M7.5 15.082L5.5 15.082" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16 5.93261C16 8.60703 13.0435 10.548 12.214 11.0244C12.0802 11.1012 11.9198 11.1012 11.786 11.0244C10.9565 10.548 8 8.60703 8 5.93261C8 3.88203 9.79086 2.08203 12 2.08203C14.2091 2.08203 16 3.88203 16 5.93261Z" stroke="currentColor" stroke-width="1.5" />
                            <path d="M12 6.08203H12.009" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M19 8.08203C19.7745 8.23191 20.3588 8.48205 20.8284 8.89953C22 9.94106 22 11.6174 22 14.97C22 18.3227 22 19.999 20.8284 21.0405C19.6569 22.082 17.7712 22.082 14 22.082H10C6.22876 22.082 4.34315 22.082 3.17157 21.0405C2 19.999 2 18.3226 2 14.97C2 11.6174 2 9.94106 3.17157 8.89952C3.64118 8.48205 4.2255 8.23191 5 8.08203" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                    <h1 className="text-xl text-gray-800 mb-4 flex-1">Delivery Address</h1>
                </div>

                <div className="custom-glassmorphism bg-white/50 p-8 rounded-lg shadow-sm">
                    {addressToShow ? (
                        <div className="text-lg text-gray-700 space-y-2">
                            <p className="font-normal mb-2">{addressToShow.name} | {addressToShow.phone}</p>
                            <p className="mb-2">
                                {addressToShow.street}, {addressToShow.city}, {addressToShow.country},
                                {addressToShow.state}, {addressToShow.postalCode}
                            </p>
                            {addressToShow.isDefault && (
                                <span className="text-primary-color bg-primary-color/10 px-4 py-1 rounded-lg mb-2">Default</span>
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-500">No address available.</p>
                    )}

                </div>
            </div>
            <Link to="/address" className="flex-shrink-0 p-2 bg-primary-color rounded-full hover:bg-primary-color/80 transition">
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#ffffff"
                    fill="none"
                    className='animate-bounce-horizontal'>
                    <path d="M12.5 18C12.5 18 18.5 13.5811 18.5 12C18.5 10.4188 12.5 6 12.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M5.50005 18C5.50005 18 11.5 13.5811 11.5 12C11.5 10.4188 5.5 6 5.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </Link>
        </div>
    );
};

export default DeliveryAddress;


