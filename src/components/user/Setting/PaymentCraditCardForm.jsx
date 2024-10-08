import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PaymentCraditCardForm = ({ onSavePaymentMethod, onCancel, editingCard }) => {
    const [formData, setFormData] = useState({
        type: 'Credit Card',
        cardNumber: '',
        accountHolderName: '',
        expiryDate: '',
        cvv: '',
    });

    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        if (editingCard) {
            setFormData({
                ...editingCard,
                expiryDate: editingCard.expiryDate ? new Date(editingCard.expiryDate) : '',
                cvv: '' // For security reasons, don't pre-fill CVV
            });
        }
    }, [editingCard]);


    const handleCardInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === 'cvv') {
            setIsFlipped(true);
        } else {
            setIsFlipped(false);
        }
    };

    const handleExpiryChange = (date) => {
        setFormData((prev) => ({ ...prev, expiryDate: date }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!editingCard && (!formData.cardNumber || formData.cardNumber.length < 16)) {
            alert('Please enter a valid card number.');
            return;
        }
        if (!editingCard && (!formData.cvv || formData.cvv.length !== 3)) {
            alert('Please enter a valid CVV.');
            return;
        }
        if (!formData.expiryDate) {
            alert('Please select an expiry date.');
            return;
        }

        try {
            // If editing, only send changed fields
            const dataToSave = editingCard
                ? Object.fromEntries(
                    Object.entries(formData).filter(([key, value]) =>
                        editingCard[key] !== value && key !== 'cvv' && value !== ''
                    )
                )
                : formData;

            // Always include type
            dataToSave.type = 'Credit Card';

            // Include CVV for new cards, but only for edits if it's been changed
            if (!editingCard || formData.cvv) {
                dataToSave.cvv = formData.cvv;
            }

            onSavePaymentMethod(dataToSave);
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            alert('Failed to save payment method.');
        }
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
                                    {formData.cardNumber || '•••• •••• •••• ••••'}
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-xs opacity-75 text-pink-700">Card Holder</div>
                                        <div className="text-pink-700">{formData.accountHolderName || 'YOUR CUTE NAME'}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs opacity-75 text-pink-700">Expires</div>
                                        <div className="text-pink-700">{formData.expiryDate ? formData.expiryDate.toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }) : 'xx/xx'}</div>
                                    </div>
                                </div>
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
                                        {formData.cvv || '•••'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 mt-4">
                    <input
                        className="w-full p-2 border rounded-xl border-pink-300 focus:border-pink-500 focus:outline-none"
                        placeholder="Card Number"
                        name="cardNumber"
                        type="text"
                        value={formData.cardNumber}
                        onChange={handleCardInputChange}
                        maxLength={19}
                    />
                    <input
                        className="w-full p-2 border rounded-xl border-pink-300 focus:border-pink-500 focus:outline-none"
                        placeholder="Name on Card"
                        name="accountHolderName"
                        type="text"
                        value={formData.accountHolderName}
                        onChange={handleCardInputChange}
                    />
                    <div className="flex justify-between w-full space-x-4">
                        <DatePicker
                            className="w-80 p-2 border rounded-xl border-pink-300 focus:border-pink-500 focus:outline-none"
                            placeholderText="Expiry Date (MM/YY)"
                            selected={formData.expiryDate}
                            onChange={handleExpiryChange}
                            dateFormat="MM/yy"
                            showMonthYearPicker
                        />
                        <input
                            className="w-1/4 p-2 border rounded-xl border-pink-300 focus:border-pink-500 focus:outline-none"
                            placeholder="CVV"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleCardInputChange}
                            maxLength={3}
                            type="password"
                            onFocus={() => setIsFlipped(true)}
                            onBlur={() => setIsFlipped(false)}
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        className="w-full bg-pink-500 text-white p-2 rounded-md hover:bg-pink-600 transition-colors mt-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                        type="submit"
                    >
                        {editingCard ? 'Update Card with Love ♥' : 'Pay with Love ♥'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PaymentCraditCardForm;
