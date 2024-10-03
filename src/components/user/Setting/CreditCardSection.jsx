import React, { useEffect, useState, useCallback } from 'react';
import { CreditCard, Trash, Edit } from 'lucide-react';
import PaymentCreditCardForm from './PaymentCraditCardForm';
import {
    getCreditCards,
    createCreditCard,
    updateCreditCard,
    deleteCreditCard
} from '../../../services/paymentServices';

const CreditCardSection = () => {
    const [cards, setCards] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCard, setEditingCard] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCreditCards = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getCreditCards();
            if (response.error === false && Array.isArray(response.payMethods)) {
                setCards(response.payMethods.filter(method => method.type === "Credit Card"));
            } else {
                setError('Failed to load credit cards');
            }
        } catch (error) {
            console.error('Error fetching credit cards:', error);
            setError('Failed to load credit cards');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCreditCards();
    }, [fetchCreditCards]);

    const handleSavePaymentMethod = async (data) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = editingCard
                ? await updateCreditCard(editingCard._id, data)
                : await createCreditCard(data);

            if (response.error === false) {
                await fetchCreditCards();
                setShowForm(false);
                setEditingCard(null);
            } else {
                setError(editingCard ? 'Failed to update credit card' : 'Failed to save credit card');
            }
        } catch (error) {
            console.error('Error in handleSavePaymentMethod:', error);
            setError(editingCard ? 'Failed to update credit card' : 'Failed to save credit card');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddCreditCard = () => {
        setShowForm(true);
        setEditingCard(null);
        setError(null);
    };

    const handleDelete = async (cardId) => {
        console.log('Attempting to delete card with ID:', cardId); // บันทึก ID ของการ์ดเพื่อตรวจสอบว่าได้กำหนดไว้หรือไม่
        if (!cardId) {
            console.error('Attempt to delete card with undefined ID'); // บันทึกข้อผิดพลาดหาก ID ไม่ได้กำหนดไว้
            setError('Card ID is undefined');
            return; // คืนค่าก่อนหาก ID ไม่ได้กำหนดไว้
        }
        setIsLoading(true);
        setError(null);
        try {
            await deleteCreditCard(cardId);
            await fetchCreditCards();
        } catch (error) {
            console.error('Error deleting credit card:', error);
            setError('Failed to delete credit card');
        } finally {
            setIsLoading(false);
        }
    };
    const handleEdit = (card) => {
        setEditingCard(card);
        setShowForm(true);
        setError(null);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-4">
            {error && <div className="text-red-500 bg-red-100 p-2 rounded">{error}</div>}
            <div className='flex justify-between items-center'>
                <div>
                    <h2 className="text-lg font-semibold">Credit/Debit Cards</h2>
                    <p className="text-sm text-gray-600">
                        {cards.length === 0
                            ? "No credit/debit cards found. Add a new payment to get started."
                            : `${cards.length} credit/debit card${cards.length !== 1 ? 's' : ''} found.`}
                    </p>
                </div>
                <button
                    onClick={handleAddCreditCard}
                    className="bg-blue-500 text-white px-4 py-2 rounded transition duration-150 ease-in-out hover:bg-blue-600 disabled:opacity-50"
                    disabled={isLoading}
                >
                    + Add New Card
                </button>
            </div>
            {cards.length > 0 && (
                <ul className="divide-y divide-gray-200">
                    {cards.map((card) => (
                        <li key={card._id || card.lastFourDigits} className="py-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <CreditCard className="h-8 w-8 text-purple-500" />
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        **** **** **** {card.lastFourDigits} {/* Show last four digits */}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        {card.accountHolderName || 'Unnamed Cardholder'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(card)}
                                    className="text-blue-500 hover:text-blue-700"
                                    disabled={isLoading}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(card._id)}
                                    className="text-red-500 hover:text-red-700"
                                    disabled={isLoading}
                                >
                                    <Trash className="h-5 w-5" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {showForm && (
                <PaymentCreditCardForm
                    onSavePaymentMethod={handleSavePaymentMethod}
                    onCancel={() => setShowForm(false)}
                    editingCard={editingCard}
                />
            )}
        </div>
    );
};

export default CreditCardSection;

