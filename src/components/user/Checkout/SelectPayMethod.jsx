import React, { useState, useEffect } from 'react';
import { CreditCard, Smartphone, QrCode, ChevronRight, Plus, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentMethodSelection = () => {
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, type: 'promptpay', details: 'xxx-xxx-xxxx' },
        { id: 2, type: 'mobile-banking', details: 'Select Bank' },
        { id: 3, type: 'credit-debit', details: '**** **** **** 1234' },
    ]);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [showBanks, setShowBanks] = useState(false);

    const banks = [
        "Bangkok Bank",
        "Kasikorn Bank",
        "Siam Commercial Bank",
        "Krung Thai Bank",
        "Bank of Ayudhya (Krungsri)",
        "TMB Bank",
        "CIMB Thai Bank",
        "Kiatnakin Bank",
    ];

    useEffect(() => {
        setSelectedMethod(paymentMethods[0]);
    }, []);

    const getMethodIcon = (type) => {
        switch (type) {
            case 'promptpay':
                return <QrCode className="h-5 w-5 text-blue-500" />;
            case 'mobile-banking':
                return <Smartphone className="h-5 w-5 text-green-500" />;
            case 'credit-debit':
                return <CreditCard className="h-5 w-5 text-purple-500" />;
            default:
                return null;
        }
    };

    const getMethodName = (type) => {
        switch (type) {
            case 'promptpay':
                return 'PromptPay';
            case 'mobile-banking':
                return 'Mobile Banking';
            case 'credit-debit':
                return 'Credit/Debit Card';
            default:
                return 'Unknown Method';
        }
    };

    const handleMethodSelect = (method) => {
        setSelectedMethod(method);
        if (method.type === 'mobile-banking') {
            setShowBanks(true);
        } else {
            setShowBanks(false);
        }
        // Store the selected method in localStorage
        localStorage.setItem('selectedPaymentMethod', JSON.stringify({
            type: getMethodName(method.type),
            details: method.details
        }));
    };

    const handleBankSelect = (bank) => {
        const updatedMethods = paymentMethods.map(m =>
            m.id === selectedMethod.id ? { ...m, details: bank } : m
        );
        setPaymentMethods(updatedMethods);
        setShowBanks(false);
        // Update the selected method in localStorage
        localStorage.setItem('selectedPaymentMethod', JSON.stringify({
            type: getMethodName(selectedMethod.type),
            details: bank
        }));
    };

    // Add this function
    const renderAddNewMethod = (type) => (
        <Link
            to={`/add-payment-method/${type}`}
            className="mt-2 px-4 py-2 text-sm text-blue-600 flex items-center"
        >
            <Plus className="mr-2 h-4 w-4" />
            Add New {getMethodName(type)}
        </Link>
    );

    return (
        <div className="space-y-6 p-6 bg-gray-50 max-w-screen-laptopl mx-auto">
            <h1 className="text-lg font-bold">Payment Method</h1>

            {paymentMethods.map((method) => (
                <div key={method.id} className="mb-4 pb-4 border-b">
                    <div className="flex justify-between items-center">
                        <label className="flex items-center space-x-3">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={method.id}
                                checked={selectedMethod?.id === method.id}
                                onChange={() => handleMethodSelect(method)}
                                className="form-radio h-5 w-5 text-blue-600"
                            />
                            <div className="flex items-center space-x-2">
                                {getMethodIcon(method.type)}
                                <div className="text-gray-700">
                                    <p className="font-medium">{getMethodName(method.type)}</p>
                                    <p className="text-sm">{method.details}</p>
                                </div>
                            </div>
                        </label>
                        {method.type === 'mobile-banking' ? (
                            <button onClick={() => setShowBanks(!showBanks)} className="text-blue-600">
                                <ChevronDown className={`transition-transform duration-200 ${showBanks ? 'transform rotate-180' : ''}`} />
                            </button>
                        ) : (
                            <Link to={`/edit-payment-method/${method.id}`} className="text-blue-600 hover:text-blue-800 transition duration-150">
                                <ChevronRight />
                            </Link>
                        )}
                    </div>
                    {selectedMethod?.id === method.id && method.type === 'mobile-banking' && showBanks && (
                        <div className="mt-2 ml-8 space-y-2">
                            {banks.map((bank, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleBankSelect(bank)}
                                    className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                                >
                                    {bank}
                                </button>
                            ))}
                        </div>
                    )}
                    {selectedMethod?.id === method.id && renderAddNewMethod(method.type)}
                </div>
            ))}
        </div>
    );
};

export default PaymentMethodSelection;