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
        <div className="space-y-6 max-w-md mx-auto bg-gradient-to-br from-pink-100 to-yellow-100 p-6 rounded-3xl shadow-lg border-4 border-white">
            <form onSubmit={handleSubmit}>
                {/* Bank Dropdown */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">Bank Name</label>
                        <div className="relative" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <div className="w-full p-3 bg-white border-2 border-pink-300 rounded-2xl shadow-md flex items-center justify-between cursor-pointer">
                                <span>{formData.bankName || 'Select a bank'}</span>
                                <span className="text-pink-700">
                                    <Banknote className="h-6 w-6" />
                                </span>
                            </div>

                            {dropdownOpen && (
                                <div className="absolute w-full mt-1 bg-white border-2 border-pink-300 rounded-2xl shadow-lg z-10">
                                    {bankOptions.map((bank) => (
                                        <div
                                            key={bank.value}
                                            className="flex items-center p-3 hover:bg-pink-100 cursor-pointer transition-colors"
                                            onClick={() => handleBankSelect(bank)}
                                        >
                                            <span className="text-pink-700 font-medium">{bank.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Account Number Input */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">Account Number</label>
                        <input
                            type="number"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleInputChange}
                            placeholder="Enter your account number"
                            className="w-full p-3 bg-white border-2 border-pink-300 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                            required
                        />
                    </div>

                    {/* Account Holder Name Input */}
                    <div>
                        <label className="block text-pink-700 font-medium mb-1">Account Name</label>
                        <input
                            type="text"
                            name="accountHolderName"
                            value={formData.accountHolderName}
                            onChange={handleInputChange}
                            placeholder="Enter account holder's name"
                            className="w-full p-3 bg-white border-2 border-pink-300 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                            required
                        />
                    </div>
                </div>

                {/* Instructions */}
                <div className="bg-white p-4 rounded-2xl shadow-md mt-6">
                    <h2 className="text-lg font-semibold text-pink-700 mb-2">Instructions</h2>
                    <p className="text-pink-600">
                        Please select your bank and enter the account details carefully. Ensure the information matches your bank account to avoid any issues.
                    </p>
                </div>

                {/* Icon */}
                <div className="flex justify-center mt-4">
                    <Smartphone className="h-16 w-16 text-pink-500" />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-6 space-x-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-300 px-4 py-2 rounded-2xl hover:bg-gray-400 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-pink-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-pink-600 transition-colors"
                    >
                        {initialData ? 'Update Bank Account' : 'Add Bank Account'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentBankAccountForm;




