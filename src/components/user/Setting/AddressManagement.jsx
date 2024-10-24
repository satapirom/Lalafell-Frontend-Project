import { useState, useEffect } from 'react';
import AddressForm from './AddressForm';
import toast, { Toaster } from 'react-hot-toast';
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
        setError(null);
        try {
            const response = await getAddresses();
            setAddresses(response.addresses || []);
        } catch (error) {
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
            toast.success('Address deleted successfully.');
        } catch (error) {
            setError(error.message || 'Failed to delete address. Please try again.');
            toast.error('Failed to delete address. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveAddress = async (addressData) => {
        setIsLoading(true);
        try {
            if (editingAddress) {
                await handleSaveEditedAddress({ ...editingAddress, ...addressData });
                toast.success('Address updated successfully.');
            } else {
                await createAddress(addressData);
                toast.success('Address added successfully.');
            }
            await fetchAddresses();
            setEditingAddress(null);
            setIsAdding(false);
            setError(null);
        } catch (error) {
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
        <div className="space-y-6 p-6 max-w-screen-laptopl custom-bg mx-auto">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Manage Addresses</h2>
                <button
                    onClick={handleAddAddress}
                    className="bg-primary-color text-white px-6 py-2 rounded-md hover:bg-primary-color/80 transition duration-200 flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                        <path d="M12 4V20M20 12H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Add New Address
                </button>
            </div>

            {(isAdding || editingAddress) && (
                <div>
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
                        <li key={address._id} className="border-b px-8 pb-6">
                            <div>
                                <h3 className="font-normal text-sm tablet:text-lg mb-2">{address.name} | {address.phone} </h3>
                                <p className="text-sm tablet:text-lg text-gray-700 mb-2">
                                    {address.street},&nbsp;
                                    {address.city},&nbsp;
                                    {address.state},&nbsp;
                                    {address.country},&nbsp;
                                    {address.postalCode}
                                </p>
                                {address.isDefault &&
                                    <span className="text-primary-color bg-primary-color/10 px-4 py-1 rounded-lg">Default</span>}
                            </div>
                            <div className="flex justify-end items-center space-x-2">
                                <button
                                    onClick={() => handleEditAddress(address)}
                                    className="px-2 py-2 rounded-full bg-primary-color/15 hover:bg-primary-color/30 transition duration-200"
                                    title="Edit Address"
                                    disabled={isLoading}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#5c6bc0" fill="none">
                                        <path d="M6.53792 2.32172C6.69664 1.89276 7.30336 1.89276 7.46208 2.32172L8.1735 4.2443C8.27331 4.51403 8.48597 4.72669 8.7557 4.8265L10.6783 5.53792C11.1072 5.69664 11.1072 6.30336 10.6783 6.46208L8.7557 7.1735C8.48597 7.27331 8.27331 7.48597 8.1735 7.7557L7.46208 9.67828C7.30336 10.1072 6.69665 10.1072 6.53792 9.67828L5.8265 7.7557C5.72669 7.48597 5.51403 7.27331 5.2443 7.1735L3.32172 6.46208C2.89276 6.30336 2.89276 5.69665 3.32172 5.53792L5.2443 4.8265C5.51403 4.72669 5.72669 4.51403 5.8265 4.2443L6.53792 2.32172Z" stroke="currentColor" stroke-width="1.5" />
                                        <path d="M14.4039 9.64136L15.8869 11.1244M6 22H7.49759C8.70997 22 9.31617 22 9.86124 21.7742C10.4063 21.5484 10.835 21.1198 11.6923 20.2625L19.8417 12.1131C20.3808 11.574 20.6503 11.3045 20.7944 11.0137C21.0685 10.4605 21.0685 9.81094 20.7944 9.25772C20.6503 8.96695 20.3808 8.69741 19.8417 8.15832C19.3026 7.61924 19.0331 7.3497 18.7423 7.20561C18.1891 6.93146 17.5395 6.93146 16.9863 7.20561C16.6955 7.3497 16.426 7.61924 15.8869 8.15832L7.73749 16.3077C6.8802 17.165 6.45156 17.5937 6.22578 18.1388C6 18.6838 6 19.29 6 20.5024V22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleDeleteAddress(address._id)}
                                    className="px-2 py-2 rounded-full hover:bg-primary-color/30 transition duration-200"
                                    title="Delete Address"
                                    disabled={isLoading}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#5c6bc0" fill="none">
                                        <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
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

