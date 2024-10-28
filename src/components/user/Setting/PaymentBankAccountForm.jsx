import React, { useState, useEffect } from 'react';
import { Smartphone, Banknote } from 'lucide-react';

const PaymentBankAccountForm = ({ onClose, onSavePaymentMethod, onCancel, initialData }) => {
    const [formData, setFormData] = useState({
        type: 'Bank Account',
        bankName: '',
        accountNumber: '',
        accountHolderName: '',
    });

    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Load initial data when editing
    useEffect(() => {
        if (initialData) {
            setFormData({
                type: initialData.type || 'Bank Account',
                bankName: initialData.bankName || '',
                accountNumber: initialData.accountNumber || '',
                accountHolderName: initialData.accountHolderName || '',
            });
        }
    }, [initialData]);

    const bankOptions = [
        { label: 'Bangkok Bank', value: 'Bangkok Bank' },
        { label: 'Kasikorn Bank', value: 'Kasikorn Bank' },
        { label: 'SCB', value: 'Siam Commercial Bank (SCB)' },
        { label: 'Krung Thai Bank', value: 'Krung Thai Bank' },
    ];

    const handleBankSelect = (bank) => {
        setFormData((prev) => ({ ...prev, bankName: bank.value }));
        setDropdownOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        try {
            onSavePaymentMethod(formData);
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            // You might want to show an error message to the user here
        }
    };

    return (
        <div className="space-y-6 p-4 tablet:p-8 custom-galssmorpuism">
            <form onSubmit={handleSubmit}>
                {/* Bank Dropdown */}
                <div className="space-y-4">
                    <div >
                        <label className="block text-xs tablet:text-base mb-1">Bank Name</label>
                        <div className="relative" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <div className="w-full p-3 custom-bg border-b rounded-md text-xs tablet:text-base flex items-center justify-between cursor-pointer">
                                <span>{formData.bankName || 'Select a bank'}</span>
                                <span className="">
                                    <Banknote className="h-6 w-6" />
                                </span>
                            </div>

                            {dropdownOpen && (
                                <div className="absolute w-full mt-1 bg-white  rounded-lg z-10">
                                    {bankOptions.map((bank) => (
                                        <div
                                            key={bank.value}
                                            className="flex items-center text-xs tablet:text-base m-2 p-2 rounded-md hover:bg-primary-color/15 active:ring-primary-color cursor-pointer transition-colors"
                                            onClick={() => handleBankSelect(bank)}
                                        >
                                            <span className="">{bank.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Account Number Input */}
                    <div>
                        <label className="block text-xs tablet:text-base mb-1 active:ring-primary-color">Account Number</label>
                        <input
                            type="number"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleInputChange}
                            placeholder="Enter your account number"
                          className="font-light text-xs tablet:text-base p-3 w-full bg-transparent rounded-lg border-b focus:outline-none focus:border focus:border-primary-color"
                            required
                        />
                    </div>

                    {/* Account Holder Name Input */}
                    <div>
                        <label className="block text-xs tablet:text-base mb-1">Account Name</label>
                        <input
                            type="text"
                            name="accountHolderName"
                            value={formData.accountHolderName}
                            onChange={handleInputChange}
                            placeholder="Enter account holder's name"
                          className="font-light text-xs tablet:text-base p-3 w-full bg-transparent rounded-lg border-b focus:outline-none focus:border focus:border-primary-color"
                        />
                    </div>
                </div>

                {/* Instructions */}
                <div className="text-xs tablet:text-base mt-4">
                    <h2 className="text-xs tablet:text-base mb-2">Instructions</h2>
                    <p className="">
                        Please select your bank and enter the account details carefully. Ensure the information matches your bank account to avoid any issues.
                    </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center tablet:justify-end mt-6 text-xs tablet:text-base space-x-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="border border-primary-color px-4 py-2 rounded-md hover:text-white hover:bg-primary-color/80 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-primary-color text-white px-6 py-3 rounded-md  hover:bg-primary-color/80 transition-colors"
                    >
                        {initialData ? 'Update Bank Account' : 'Add Bank Account'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentBankAccountForm;




