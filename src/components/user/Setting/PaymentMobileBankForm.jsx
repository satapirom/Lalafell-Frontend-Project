import React, { useEffect, useState, useRef } from 'react';
import { Smartphone, Banknote } from 'lucide-react';

const bankOptions = [
    { label: 'Bangkok Bank', value: 'Bangkok Bank', icon: '/images/bangkok-bank-icon.png' },
    { label: 'Kasikorn Bank', value: 'Kasikorn Bank', icon: '/images/kasikorn-bank-icon.png' },
    { label: 'SCB', value: 'Siam Commercial Bank (SCB)', icon: '/images/scb-icon.png' },
    { label: 'Krung Thai Bank', value: 'Krung Thai Bank', icon: '/images/krungthai-bank-icon.png' },
];

const PaymentMobileBankForm = ({ onSavePaymentMethod, onCancel, user }) => {
    const [formData, setFormData] = useState({
        type: 'Bank Account',
        bankName: '',
        accountNumber: '',
        accountHolder: '',
        user: user,
    });

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleBankSelect = (bank) => {
        setFormData((prev) => ({ ...prev, bankName: bank.value }));
        setDropdownOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitBank = (e) => {
        e.preventDefault();
        const paymentData = {
            ...formData,
            user: user,
        };
        console.log('Payment details submitted:', paymentData);
        onSavePaymentMethod(paymentData);
    };

    return (
        <div className="space-y-6 max-w-md mx-auto bg-gradient-to-br from-pink-100 to-yellow-100 p-6 rounded-3xl shadow-lg border-4 border-white">
            <form onSubmit={handleSubmitBank}>
                <div className="space-y-4">
                    <div ref={dropdownRef}>
                        <label className="block text-pink-700 font-medium mb-1">Bank Name</label>
                        <div
                            className="relative"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
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
                                            <img
                                                src={bank.icon}
                                                alt={`${bank.label} icon`}
                                                className="h-6 w-6 mr-3"
                                            />
                                            <span className="text-pink-700 font-medium">{bank.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-pink-700 font-medium mb-1">Account Number</label>
                        <input
                            type="text"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleInputChange}
                            placeholder="Enter your account number"
                            className="w-full p-3 bg-white border-2 border-pink-300 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-pink-700 font-medium mb-1">Account Holder's Name</label>
                        <input
                            type="text"
                            name="accountHolder"
                            value={formData.accountHolder}
                            onChange={handleInputChange}
                            placeholder="Enter account holder's name"
                            className="w-full p-3 bg-white border-2 border-pink-300 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                            required
                        />
                    </div>

                    {/* ใช้ input แบบ hidden */}
                    <input type="hidden" name="type" value="Bank Account" />
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-md mt-6">
                    <h2 className="text-lg font-semibold text-pink-700 mb-2">Instructions</h2>
                    <p className="text-pink-600">Please select your bank and enter the account details carefully. Ensure the information matches your bank account to avoid any issues.</p>
                </div>

                <div className="flex justify-center mt-4">
                    <Smartphone className="h-16 w-16 text-pink-500" />
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-pink-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-pink-600 transition-colors"
                    >
                        Add Bank Account
                    </button>
                </div>
            </form>
            <div className="flex justify-center mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default PaymentMobileBankForm;



