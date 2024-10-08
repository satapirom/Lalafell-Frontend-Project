import React, { useState, useEffect } from 'react';
import AddressForm from './AddressForm';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { getAddresses, createAddress, updateAddress, deleteAddress } from '../../../services/adressServices';

const AddressManagement = () => {
    const [addresses, setAddresses] = useState([]);
    const [editingAddress, setEditingAddress] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        setIsLoading(true);
        try {
            const response = await getAddresses();
            setAddresses(response.addresses || []);
        } catch (error) {
            console.error('Error fetching addresses:', error);
            setError(error.message || 'Failed to load addresses. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddAddress = () => {
        setIsAdding(true);
        setEditingAddress(null);
        setError(null);
    };

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setIsAdding(false);
        setError(null);
    };

    const handleSaveEditedAddress = async (updatedAddressData) => {
        setIsLoading(true);
        setError(null);
        try {
            const updatedAddress = await updateAddress(updatedAddressData._id, updatedAddressData);
            setAddresses(addresses.map(addr => addr._id === updatedAddress.data._id ? updatedAddress.data : addr));
            setEditingAddress(null);
        } catch (error) {
            console.error('Error editing address:', error);
            setError(error.message || 'Failed to edit address. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAddress = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            await deleteAddress(id);
            await fetchAddresses();
        } catch (error) {
            console.error('Error deleting address:', error);
            setError(error.message || 'Failed to delete address. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveAddress = async (addressData) => {
        setIsLoading(true);
        try {
            if (editingAddress) {
                await handleSaveEditedAddress({ ...editingAddress, ...addressData });
            } else {
                await createAddress(addressData);
            }
            await fetchAddresses();
            setEditingAddress(null);
            setIsAdding(false);
            setError(null);
        } catch (error) {
            console.error('Error saving address:', error);
            setError(error.message || 'Failed to save address. Please check your input and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setEditingAddress(null);
        setIsAdding(false);
        setError(null);
    };

    if (isLoading && addresses.length === 0) {
        return <div className="text-center py-8">Loading...</div>;
    }

    // AddressManagement Component
    return (
        <div className="space-y-6 p-6 bg-gray-50 rounded-lg max-w-screen-laptopl mx-auto">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Manage Addresses</h2>
                <button
                    onClick={handleAddAddress}
                    className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition duration-200"
                    disabled={isLoading}
                >
                    <span className="hidden tablet:inline">Add New Address</span>
                    <FaPlus className="tablet:hidden text-lg" />
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {(isAdding || editingAddress) && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                    <AddressForm
                        address={editingAddress}
                        onSave={handleSaveAddress}
                        onCancel={handleCancelEdit}
                        isLoading={isLoading}
                    />
                </div>
            )}

            <ul className="space-y-4">
                {addresses.length > 0 ? (
                    addresses.map((address) => (
                        <li key={address._id} className="bg-white rounded-lg p-6 shadow-md transition-all duration-200 hover:shadow-lg mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">{address.name} | {address.phone} </h3>
                                <p className="text-sm tablet:text-lg text-gray-600 mt-2 ">{address.street}</p>
                                <p className="text-sm tablet:text-lg text-gray-600 mb-2">{address.city}, {address.state}, {address.country}, {address.postalCode}</p>
                                {address.isDefault && <span className="text-blue-500 font-medium"> (Default)</span>}
                            </div>
                            <div className="flex justify-end items-center space-x-4">
                                <button
                                    onClick={() => handleEditAddress(address)}
                                    className="text-blue-600 hover:text-blue-800 transition duration-150"
                                    title="Edit Address"
                                    disabled={isLoading}
                                >
                                    <FaEdit size={20} />
                                </button>
                                <button
                                    onClick={() => handleDeleteAddress(address._id)}
                                    className="text-red-600 hover:text-red-800 transition duration-150"
                                    title="Delete Address"
                                    disabled={isLoading}
                                >
                                    <FaTrash size={20} />
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <div className='text-center py-8'>
                        <p className="text-gray-500">No addresses found. Add a new address to get started.</p>
                    </div>
                )}
            </ul>
        </div>
    );



};

export default AddressManagement;

