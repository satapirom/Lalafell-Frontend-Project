import React, { useState, useEffect } from 'react';
import AddressForm from '../Setting/AddressForm';
import { createAddress, updateAddress } from '../../../services/adressServices';
import { FaEdit } from 'react-icons/fa';
import { HousePlus } from 'lucide-react';
import useAddress from '../../../hooks/user/useAddress.js';

const DeliveryAddressManagement = () => {
    const { addresses, selectedAddress, selectAddress, fetchAddresses } = useAddress();
    const [editingAddress, setEditingAddress] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleAddAddress = () => {
        setEditingAddress(null);
        setIsAdding(true);
    };

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setIsAdding(true);
    };

    const handleSaveAddress = async (addressData) => {
        setIsLoading(true);
        try {
            if (editingAddress) {
                await updateAddress(editingAddress._id, addressData);
            } else {
                await createAddress(addressData);
            }
            await fetchAddresses();
            setEditingAddress(null);
            setIsAdding(false);
        } catch (error) {
            console.error('Error saving address:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!addresses) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-600 border-b-4 border-transparent"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-20 p-2 tablet:p-8 custom-bg rounded-lg">
            <div className='flex items-center gap-2 mb-6 w-full'>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                        <circle cx="17" cy="18" r="2" stroke="currentColor" stroke-width="1.5" />
                        <circle cx="7" cy="18" r="2" stroke="currentColor" stroke-width="1.5" />
                        <path d="M5 17.9724C3.90328 17.9178 3.2191 17.7546 2.73223 17.2678C2.24536 16.7809 2.08222 16.0967 2.02755 15M9 18H15M19 17.9724C20.0967 17.9178 20.7809 17.7546 21.2678 17.2678C22 16.5355 22 15.357 22 13V11H17.3C16.5555 11 16.1832 11 15.882 10.9021C15.2731 10.7043 14.7957 10.2269 14.5979 9.61803C14.5 9.31677 14.5 8.94451 14.5 8.2C14.5 7.08323 14.5 6.52485 14.3532 6.07295C14.0564 5.15964 13.3404 4.44358 12.4271 4.14683C11.9752 4 11.4168 4 10.3 4H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2 8H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2 11H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14.5 6H16.3212C17.7766 6 18.5042 6 19.0964 6.35371C19.6886 6.70742 20.0336 7.34811 20.7236 8.6295L22 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
                <h2 className='text-lg tablet:*:first-letter:text-xl '>Select Delivery Addresses</h2>
            </div>
            <div className='p-8 rounded-lg custom-galssmorpuism'>
    {isAdding && (
        <div className="bg-white shadow rounded-lg mb-6">
            <AddressForm
                address={editingAddress}
                onSave={handleSaveAddress}
                onCancel={() => setIsAdding(false)}
                isLoading={isLoading}
            />
        </div>
    )}

    {addresses.length > 0 ? (
        addresses.map((address) => (
            <div key={address._id} className="mb-4 pb-4 border-b">
                <div className="flex justify-between items-start gap-4">
                    <label className="flex items-start space-x-3 flex-1 min-w-0">
                        <input
                            type="radio"
                            name="deliveryAddress"
                            value={address._id}
                            checked={selectedAddress?._id === address._id}
                            onChange={() => selectAddress(address)}
                            className="form-radio h-6 w-6 mt-1 shrink-0 focus:bg-primary-color appearance-none border border-gray-400 rounded-full cursor-pointer focus:ring-2 focus:ring-primary-color"
                        />
                        <div className="text-lg text-gray-700 space-y-2 min-w-0">
                            <p className="font-normal mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                                {address.name} | {address.phone}
                            </p>
                            <p className="mb-2 overflow-hidden text-ellipsis whitespace-pre-line break-words">
                                {`${address.street}, ${address.city}, ${address.country}, ${address.state}, ${address.postalCode}`}
                            </p>
                            {address.isDefault && (
                                <span className="inline-block text-primary-color bg-primary-color/10 px-4 py-1 rounded-lg mb-2">
                                    Default
                                </span>
                            )}
                        </div>
                    </label>
                    <button
                        onClick={() => handleEditAddress(address)}
                        className="text-blue-600 hover:text-blue-800 transition duration-150 shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#5c6bc0" fill="none">
                            <path d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            <path d="M13 4L20 11" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            <path d="M14 22L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        ))
    ) : (
        <p className="text-center text-gray-500">No addresses available</p>
    )}

    <div className="flex justify-center mt-6">
        <button
            onClick={handleAddAddress}
            className="bg-primary-color text-white px-6 py-2 rounded-md hover:bg-primary-color/80 transition duration-200 flex items-center gap-2"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                <path d="M12 4V20M20 12H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Add New Address
        </button>
    </div>
</div>
        </div>
    );
};

export default DeliveryAddressManagement;