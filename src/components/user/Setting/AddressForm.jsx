import { useState, useEffect } from 'react';

const Toggle = ({ checked, onChange }) => (
    <div
        className={`w-12 tablet:w-14 h-8 tablet:h-10 flex items-center rounded-full p-1 cursor-pointer ${checked ? 'bg-primary-color' : 'bg-primary-color/15'}`}
        onClick={onChange}
    >
        <div
            className={`bg-primary-color w-6 h-6 p-1 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-5 bg-white/80' : 'translate-x-0'}`}
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
        <form onSubmit={handleSubmit} className="tablet:px-4">
            <h2 className="text-sm tablet:text-lg font-light mb-4">{address ? 'Edit Address' : 'Add Address'}</h2>
            <div className='flex flex-col space-y-2 '>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="font-light p-3 bg-transparent rounded-lg border-b focus:outline-none focus:border focus:border-primary-color"
                />
                <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    maxLength={10}
                    required
                    className="font-light p-3 bg-transparent rounded-lg border-b focus:outline-none focus:border focus:border-primary-color"
                />
                <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                    className="font-light p-3 bg-transparent rounded-lg border-b focus:outline-none focus:border focus:border-primary-color"
                />
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    className="font-light p-3 bg-transparent rounded-lg border-b focus:outline-none focus:border focus:border-primary-color"
                />
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                    className="font-light p-3 bg-transparent rounded-lg border-b focus:outline-none focus:border focus:border-primary-color"
                />
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    required
                    className="font-light p-3 bg-transparent rounded-lg border-b focus:outline-none focus:border focus:border-primary-color"
                />
                <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Postal Code"
                    required
                    className="font-light p-3 bg-transparent rounded-lg border-b focus:outline-none focus:border focus:border-primary-color"
                />
            </div>
            <div className='flex items-center mt-4 space-x-2'>
                <span className="text-xs tablet:text-base text-gray-600 bg-primary-color/15 rounded-full py-2 px-4">Default Address</span>
                <Toggle
                    checked={formData.isDefault} // Use the local state
                    onChange={handleToggleDefault} // Just call the local toggle function
                />
            </div>

            <div className="flex justify-end space-x-2 my-4">
                <button type="button" onClick={onCancel} className="border border-primary-color hover:bg-primary-color/80 text-sm text-gray-800 hover:text-white px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-primary-color hover:bg-primary-color/80 text-white px-4 py-2 rounded">Save</button>
            </div>
        </form>
    );
};

export default AddressForm;


