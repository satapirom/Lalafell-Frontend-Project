import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PaymentCraditCardForm = () => {
    const [copied, setCopied] = useState(false);
    const [bankDetails, setBankDetails] = useState({
        bankName: '',
        accountNumber: '',
        accountHolder: '',
    });

    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: null,
        cvv: '',
    });
    const [isFlipped, setIsFlipped] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleBankSelect = (bank) => {
        setBankDetails((prev) => ({ ...prev, bankName: bank.value }));
        setDropdownOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBankDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitBank = (e) => {
        e.preventDefault();
        console.log('Payment details submitted:', bankDetails);
    };

    const handleCardInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails((prev) => ({ ...prev, [name]: value }));

        if (name === 'cvv') {
            setIsFlipped(true);
        } else {
            setIsFlipped(false);
        }
    };

    const handleExpiryChange = (date) => {
        setCardDetails((prev) => ({ ...prev, expiry: date }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Payment details submitted:', cardDetails);
    };

    return (
        <div className="space-y-6 max-w-md mx-auto">
            <form onSubmit={handleSubmit}>
                <div
                    className="relative h-56 w-full"
                    style={{
                        perspective: '1000px',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            transition: 'transform 0.8s',
                            transformStyle: 'preserve-3d',
                            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                        }}
                    >
                        {/* Front of the card */}
                        <div
                            className="absolute w-full h-full rounded-3xl shadow-xl overflow-hidden"
                            style={{
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                                background: 'linear-gradient(135deg, #FFB6C1, #FFC0CB, #FFD700)',
                                border: '4px solid #FFF',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1), 0 0 0 4px #FFF inset'
                            }}
                        >
                            <div className="absolute top-4 left-4 right-4 bottom-4 flex flex-col justify-between text-white">
                                <div className="flex justify-between items-center">
                                    <Heart className="h-8 w-8 text-red-500" />
                                    <div className="text-lg font-bold text-pink-700">Cute Card</div>
                                </div>
                                <div className="text-2xl tracking-wider text-pink-700">
                                    {cardDetails.number || '•••• •••• •••• ••••'}
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-xs opacity-75 text-pink-700">Card Holder</div>
                                        <div className="text-pink-700">{cardDetails.name || 'YOUR CUTE NAME'}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs opacity-75 text-pink-700">Expires</div>
                                        <div className="text-pink-700">{cardDetails.expiry ? cardDetails.expiry.toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }) : 'xx/xx'}</div>
                                    </div>
                                </div>
                            </div>
                            {/* patterns */}
                            <div className="absolute top-0 left-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                                <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-yellow-300 opacity-50"></div>
                                <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-pink-300 opacity-50"></div>
                                <div className="absolute top-1/2 left-1/4 w-6 h-6 rounded-full border-2 border-white opacity-30"></div>
                                <div className="absolute bottom-1/4 right-1/3 w-5 h-5 transform rotate-45 bg-purple-300 opacity-30"></div>
                            </div>
                        </div>

                        {/* Back of the card */}
                        <div
                            className="absolute w-full h-full rounded-3xl shadow-xl overflow-hidden"
                            style={{
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)',
                                background: 'linear-gradient(135deg, #FFD700, #FFC0CB, #FFB6C1)',
                                border: '4px solid #FFF',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1), 0 0 0 4px #FFF inset'
                            }}
                        >
                            <div className="absolute top-4 left-4 right-4 bottom-4 flex flex-col justify-between">
                                <div className="w-full h-12 bg-white opacity-50 mt-4"></div>
                                <div className="text-right pr-8">
                                    <div className="text-xs opacity-75 text-pink-700">CVV</div>
                                    <div className="bg-white text-pink-700 px-2 py-1 rounded">
                                        {cardDetails.cvv || '•••'}
                                    </div>
                                </div>
                            </div>
                            {/* patterns for back */}
                            <div className="absolute top-0 left-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-yellow-300 opacity-50"></div>
                                <div className="absolute bottom-3 left-3 w-5 h-5 rounded-full bg-pink-300 opacity-50"></div>
                                <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full border-2 border-white opacity-30"></div>
                                <div className="absolute bottom-1/2 left-1/3 w-4 h-4 transform rotate-45 bg-purple-300 opacity-30"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 mt-4">
                    <input
                        className="w-full p-2 border rounded-xl border-pink-300 focus:border-pink-500 focus:outline-none"
                        placeholder="Card Number"
                        name="number"
                        type='text'
                        value={cardDetails.number}
                        onChange={handleCardInputChange}
                        maxLength={19}
                    />
                    <input
                        className="w-full p-2 border rounded-xl border-pink-300 focus:border-pink-500 focus:outline-none"
                        placeholder="Name on Card"
                        name="name"
                        type='text'
                        value={cardDetails.name}
                        onChange={handleCardInputChange}
                    />
                    <div className="flex justify-between w-full space-x-4">
                        <DatePicker
                            className="w-80 p-2 border rounded-xl border-pink-300 focus:border-pink-500 focus:outline-none"
                            placeholderText="Expiry Date (MM/YY)"
                            selected={cardDetails.expiry}
                            onChange={handleExpiryChange}
                            dateFormat="MM/yy"
                            showMonthYearPicker
                        />
                        <input
                            className="w-1/4 p-2 border rounded-xl border-pink-300 focus:border-pink-500 focus:outline-none"
                            placeholder="CVV"
                            name="cvv"
                            value={cardDetails.cvv}
                            onChange={handleCardInputChange}
                            maxLength={3}
                            type="password"
                            onFocus={() => setIsFlipped(true)}
                            onBlur={() => setIsFlipped(false)}
                        />
                    </div>
                </div>

                <button
                    className="w-full bg-pink-500 text-white p-2 rounded-md hover:bg-pink-600 transition-colors mt-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                    type="submit"
                >
                    Pay with Love ♥
                </button>
            </form>
        </div>
    );
}

export default PaymentCraditCardForm;