// CreditCardSection.jsx
import React, { useState } from 'react';
import { CreditCard, Trash } from 'lucide-react';
import PaymentCraditCardForm from './PaymentCraditCardForm';

const CreditCardSection = ({ cards, onDelete, onAdd, isLoading }) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div>
            {cards.length === 0 ? (
                <div className='flex justify-between'>
                    <div>
                        <h2 className="text-lg font-semibold mt-6">Credit/Debit Cards</h2>
                        <p>No credit/debit cards found. Add a new payment to get started.</p>
                    </div>
                    <div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded transition duration-150 ease-in-out hover:bg-blue-600"
                            disabled={isLoading}
                        >
                            + Add New Card
                        </button>
                    </div>
                </div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {cards.map((card) => (
                        <li key={card._id} className="py-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <CreditCard className="h-8 w-8 text-purple-500" />
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {card.cardNumber}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        {card.cardName}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => onDelete(card._id, 'card')}
                                className="text-red-500 hover:text-red-700"
                                disabled={isLoading}
                            >
                                <Trash className="h-5 w-5" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {showForm && (
                <div className="mt-4">
                    <PaymentCraditCardForm
                        onSavePaymentMethod={(data) => {
                            onAdd(data, 'card');
                            setShowForm(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default CreditCardSection;
