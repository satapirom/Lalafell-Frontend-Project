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
        return <div>Loading...</div>;
    }

    return (
        <div className='space-y-6 p-6 mt-24 bg-gray-50 max-w-screen-laptopl mx-auto'>
            <h1 className="text-lg font-bold">Delivery Address</h1>

            {isAdding && (
                <div className="bg-white shadow rounded-lg">
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
                    <div key={address._id} className="mb-4 pb-4 flex justify-between border-b">
                        <label className="flex items-center space-x-3">
                            <input
                                type="radio"
                                name="deliveryAddress"
                                value={address._id}
                                checked={selectedAddress?._id === address._id}
                                onChange={() => selectAddress(address)}
                                className="form-radio h-5 w-5 text-blue-600"
                            />
                            <div className="text-gray-700">
                                <p className="mb-1">{address.name} | {address.phone}</p>
                                <p>
                                    {address.street},&nbsp;
                                    {address.city},&nbsp;
                                    {address.country},&nbsp;
                                    {address.state},&nbsp;
                                    {address.postalCode}
                                </p>
                                {address.isDefault && <span className="text-blue-500 font-medium"> (Default)</span>}
                            </div>
                        </label>
                        <button
                            onClick={() => handleEditAddress(address)}
                            className="text-blue-600 hover:text-blue-800 transition duration-150 ml-4"
                        >
                            <FaEdit size={20} />
                        </button>
                    </div>
                ))
            ) : (
                <p>No addresses available</p>
            )}

            <div className="flex justify-center">
                <button
                    onClick={handleAddAddress}
                    className="mb-4 px-4 py-2 text-gray-800 flex items-center"
                >
                    <HousePlus className="mr-2" />
                    Add New Address
                </button>
            </div>
        </div>
    );
};

export default DeliveryAddressManagement;