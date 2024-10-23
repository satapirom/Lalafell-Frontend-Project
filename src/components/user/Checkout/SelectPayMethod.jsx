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
                return (
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#5c6bc0" fill="none">
                            <path d="M3 6C3 4.58579 3 3.87868 3.43934 3.43934C3.87868 3 4.58579 3 6 3C7.41421 3 8.12132 3 8.56066 3.43934C9 3.87868 9 4.58579 9 6C9 7.41421 9 8.12132 8.56066 8.56066C8.12132 9 7.41421 9 6 9C4.58579 9 3.87868 9 3.43934 8.56066C3 8.12132 3 7.41421 3 6Z" stroke="currentColor" stroke-width="1.5" />
                            <path d="M3 18C3 16.5858 3 15.8787 3.43934 15.4393C3.87868 15 4.58579 15 6 15C7.41421 15 8.12132 15 8.56066 15.4393C9 15.8787 9 16.5858 9 18C9 19.4142 9 20.1213 8.56066 20.5607C8.12132 21 7.41421 21 6 21C4.58579 21 3.87868 21 3.43934 20.5607C3 20.1213 3 19.4142 3 18Z" stroke="currentColor" stroke-width="1.5" />
                            <path d="M3 12L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 3V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15 6C15 4.58579 15 3.87868 15.4393 3.43934C15.8787 3 16.5858 3 18 3C19.4142 3 20.1213 3 20.5607 3.43934C21 3.87868 21 4.58579 21 6C21 7.41421 21 8.12132 20.5607 8.56066C20.1213 9 19.4142 9 18 9C16.5858 9 15.8787 9 15.4393 8.56066C15 8.12132 15 7.41421 15 6Z" stroke="currentColor" stroke-width="1.5" />
                            <path d="M21 12H15C13.5858 12 12.8787 12 12.4393 12.4393C12 12.8787 12 13.5858 12 15M12 17.7692V20.5385M15 15V16.5C15 17.9464 15.7837 18 17 18C17.5523 18 18 18.4477 18 19M16 21H15M18 15C19.4142 15 20.1213 15 20.5607 15.44C21 15.8799 21 16.5881 21 18.0043C21 19.4206 21 20.1287 20.5607 20.5687C20.24 20.8898 19.7767 20.9766 19 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                    </span>
                );
            case 'mobile-banking':
                return (
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#5c6bc0" fill="none">
                            <path d="M17.002 6C16.9152 4.58055 16.6769 3.67665 16.023 3.02513C14.9943 2 13.3385 2 10.0269 2C6.71528 2 5.05949 2 4.03072 3.02513C3.00195 4.05025 3.00195 5.70017 3.00195 9V15C3.00195 18.2998 3.00195 19.9497 4.03072 20.9749C5.05949 22 6.71528 22 10.0269 22C13.3385 22 14.9943 22 16.023 20.9749C16.6769 20.3233 16.9152 19.4194 17.002 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M10.002 19H10.011" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18.4724 8.98633L20.7231 11.1928C21.0208 11.5112 21.1112 12.3519 20.8208 12.6418L18.4724 14.9863M10.998 12.0428H20.341" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                );
            case 'credit-debit':
                return (
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#5c6bc0" fill="none">
                            <path d="M15 7.5C15 7.5 15.5 7.5 16 8.5C16 8.5 17.5882 6 19 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22 7C22 9.76142 19.7614 12 17 12C14.2386 12 12 9.76142 12 7C12 4.23858 14.2386 2 17 2C19.7614 2 22 4.23858 22 7Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M3.60746 21.0095L4.07229 20.4209L3.60746 21.0095ZM3.0528 20.4875L3.61262 19.9884L3.0528 20.4875ZM20.9472 20.4875L20.3874 19.9884L20.9472 20.4875ZM20.3925 21.0095L19.9277 20.4209L20.3925 21.0095ZM3.60746 6.99127L3.14263 6.40268L3.60746 6.99127ZM3.0528 7.5133L3.61262 8.0124L3.0528 7.5133ZM22.75 13.2445C22.7493 12.8302 22.4129 12.495 21.9987 12.4958C21.5845 12.4965 21.2493 12.8329 21.25 13.2471L22.75 13.2445ZM9.06582 6.75292C9.48003 6.75057 9.81391 6.41289 9.81157 5.99869C9.80922 5.58448 9.47154 5.2506 9.05734 5.25294L9.06582 6.75292ZM13.5 21.2504H10.5V22.7504H13.5V21.2504ZM10.5 21.2504C8.60311 21.2504 7.24353 21.2493 6.19895 21.1313C5.16816 21.0148 4.54359 20.7931 4.07229 20.4209L3.14263 21.5981C3.926 22.2168 4.86842 22.4905 6.03058 22.6218C7.17896 22.7515 8.63832 22.7504 10.5 22.7504V21.2504ZM1.25 14.0004C1.25 15.7493 1.24857 17.1321 1.38762 18.2226C1.52932 19.3337 1.82681 20.2394 2.49298 20.9866L3.61262 19.9884C3.22599 19.5547 2.99708 18.9856 2.87558 18.0328C2.75143 17.0593 2.75 15.789 2.75 14.0004H1.25ZM4.07229 20.4209C3.90545 20.2892 3.7517 20.1444 3.61262 19.9884L2.49298 20.9866C2.69068 21.2084 2.90811 21.4129 3.14263 21.5981L4.07229 20.4209ZM21.25 14.0004C21.25 15.789 21.2486 17.0593 21.1244 18.0328C21.0029 18.9856 20.774 19.5547 20.3874 19.9884L21.507 20.9866C22.1732 20.2394 22.4707 19.3337 22.6124 18.2226C22.7514 17.1321 22.75 15.7493 22.75 14.0004H21.25ZM13.5 22.7504C15.3617 22.7504 16.821 22.7515 17.9694 22.6218C19.1316 22.4905 20.074 22.2168 20.8574 21.5981L19.9277 20.4209C19.4564 20.7931 18.8318 21.0148 17.801 21.1313C16.7565 21.2493 15.3969 21.2504 13.5 21.2504V22.7504ZM20.3874 19.9884C20.2483 20.1444 20.0946 20.2892 19.9277 20.4209L20.8574 21.5981C21.0919 21.4129 21.3093 21.2084 21.507 20.9866L20.3874 19.9884ZM2.75 14.0004C2.75 12.2118 2.75143 10.9415 2.87558 9.96799C2.99708 9.01519 3.22599 8.44606 3.61262 8.0124L2.49298 7.0142C1.82681 7.76141 1.52932 8.66709 1.38762 9.77825C1.24857 10.8687 1.25 12.2515 1.25 14.0004H2.75ZM3.14263 6.40268C2.90811 6.58789 2.69068 6.79245 2.49298 7.0142L3.61262 8.0124C3.7517 7.8564 3.90545 7.71161 4.07229 7.57986L3.14263 6.40268ZM22.75 14.0004C22.75 13.7412 22.7504 13.4875 22.75 13.2445L21.25 13.2471C21.2504 13.4885 21.25 13.7376 21.25 14.0004H22.75ZM9.05734 5.25294C7.64978 5.26091 6.50411 5.29333 5.56558 5.44144C4.61301 5.59178 3.81862 5.86882 3.14263 6.40268L4.07229 7.57986C4.47956 7.25822 5.00124 7.04907 5.79942 6.92311C6.61164 6.79492 7.65139 6.76092 9.06582 6.75292L9.05734 5.25294Z" fill="currentColor" />
                            <path d="M10 18H11.5" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14.5 18L18 18" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2.5 11H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                );
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
        localStorage.setItem('selectedPaymentMethod', JSON.stringify({
            type: getMethodName(selectedMethod.type),
            details: bank
        }));
    };

    const renderAddNewMethod = (type) => (
        <Link
            to={`/add-payment-method/${type}`}
            className="mt-2 px-4 py-2 text-sm text-blue-600 flex items-center hover:bg-primary-color/10 rounded-lg transition duration-200"
        >
            <Plus className="mr-2 h-4 w-4" />
            Add New {getMethodName(type)}
        </Link>
    );

    return (
        <div className="container mx-auto mt-20 p-8 custom-bg rounded-lg">
            <div className="flex items-center gap-2 mb-6 w-full">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" color="#000000" fill="none">
                        <path d="M13.5 15H6C4.11438 15 3.17157 15 2.58579 14.4142C2 13.8284 2 12.8856 2 11V7C2 5.11438 2 4.17157 2.58579 3.58579C3.17157 3 4.11438 3 6 3H18C19.8856 3 20.8284 3 21.4142 3.58579C22 4.17157 22 5.11438 22 7V12C22 12.9319 22 13.3978 21.8478 13.7654C21.6448 14.2554 21.2554 14.6448 20.7654 14.8478C20.3978 15 19.9319 15 19 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14 9C14 10.1045 13.1046 11 12 11C10.8954 11 10 10.1045 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13 17C13 15.3431 14.3431 14 16 14V12C16 10.3431 17.3431 9 19 9V14.5C19 16.8346 19 18.0019 18.5277 18.8856C18.1548 19.5833 17.5833 20.1548 16.8856 20.5277C16.0019 21 14.8346 21 12.5 21H12C10.1362 21 9.20435 21 8.46927 20.6955C7.48915 20.2895 6.71046 19.5108 6.30448 18.5307C6 17.7956 6 16.8638 6 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
                <h2 className="text-3xl font-semibold text-gray-800">Payment Method</h2>
            </div>

            <div className="p-8 rounded-lg custom-galssmorpuism">
                {paymentMethods.map((method) => (
                    <div key={method.id} className="mb-4 pb-4 border-b last:border-b-0">
                        <div className="flex justify-between items-center">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={method.id}
                                    checked={selectedMethod?.id === method.id}
                                    onChange={() => handleMethodSelect(method)}
                                    className="w-6 h-6 rounded-xl border-gray-100"
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
                                <button
                                    onClick={() => setShowBanks(!showBanks)}
                                    className="text-blue-600 hover:bg-primary-color/10 p-2 rounded-full transition duration-200"
                                >
                                    <ChevronDown className={`transition-transform duration-200 ${showBanks ? 'transform rotate-180' : ''}`} />
                                </button>
                            ) : (
                                <Link
                                    to={`/edit-payment-method/${method.id}`}
                                    className="text-blue-600 hover:bg-primary-color/10 p-2 rounded-full transition duration-200"
                                >
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
                                        className="block w-full text-left px-4 py-2 border-b hover:bg-primary-color/10 rounded-lg transition duration-200"
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
        </div>
    );
};

export default PaymentMethodSelection;