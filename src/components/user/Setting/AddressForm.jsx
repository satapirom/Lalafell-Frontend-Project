import React, { useState, useEffect } from 'react';
import { MapPinned } from 'lucide-react';

const Toggle = ({ checked, onChange }) => (
    <div
        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}
        onClick={onChange}
    >
        <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}
        />
    </div>
);

const AddressForm = ({ address, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        isDefault: false,
    });

    useEffect(() => {
        if (address) {
            setFormData(address);
        }
    }, [address]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleToggleDefault = () => {
        // Toggle the isDefault state locally in formData
        setFormData((prevState) => ({
            ...prevState,
            isDefault: !prevState.isDefault,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">{address ? 'Edit Address' : 'Add Address'}</h2>
            <div className='flex flex-col'>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="m-2 px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    maxLength={10}
                    required
                    className="m-2 px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                    className="m-2 px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    className="m-2 px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                />
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    required
                    className="m-2 px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Postal Code"
                    required
                    className="m-2 px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
            </div>


            <div className='flex items-center mt-4 space-x-2'>
                <MapPinned color='#3b82f6' size={20} />
                <span className="text-base text-blue-500">Default Address</span>
                <Toggle
                    checked={formData.isDefault} // Use the local state
                    onChange={handleToggleDefault} // Just call the local toggle function
                />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
                <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
        </form>
    );
};

export default AddressForm;


