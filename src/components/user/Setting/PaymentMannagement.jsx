// PaymentManagement.jsx
import React, { useState, useEffect } from 'react';
import { Smartphone, CreditCard } from 'lucide-react';
import BankAccountSection from './BankAccountSection';
import CreditCardSection from './CreditCardSection';
import {
    createBankAccount,
    createCreditCard,
    getBankAccounts,
    getCreditCards,
    deleteCreditCard,
    deleteBankAccount
} from '../../../services/paymentServices';

const PaymentManagement = () => {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [creditCards, setCreditCards] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showBankSection, setShowBankSection] = useState(false);
    const [showCardSection, setShowCardSection] = useState(false);

    useEffect(() => {
        fetchBankAccounts();
        fetchCreditCards();
    }, []);

    const fetchBankAccounts = async () => {
        setIsLoading(true);
        try {
            const response = await getBankAccounts();
            setBankAccounts(response.accounts || []);
        } catch (error) {
            handleError(error, 'Failed to load bank accounts.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCreditCards = async () => {
        setIsLoading(true);
        try {
            const response = await getCreditCards();
            setCreditCards(response.accounts || []);
        } catch (error) {
            handleError(error, 'Failed to load credit cards.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleError = (error, fallbackMessage) => {
        console.error('Error:', error);
        setError(error.message || fallbackMessage);
    };

    const handleAddPaymentMethod = async (paymentMethodData, type) => {
        setIsLoading(true);
        try {
            if (type === 'Bank Account') {
                const newBankAccount = await createBankAccount(paymentMethodData);
                setBankAccounts((prev) => [...prev, newBankAccount]);
            } else if (type === 'Credit Card') {
                const newCreditCard = await createCreditCard(paymentMethodData);
                setCreditCards((prev) => [...prev, newCreditCard]);
            }
            setError(null);
        } catch (error) {
            handleError(error, 'Failed to save payment method.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeletePaymentMethod = async (id, type) => {
        setIsLoading(true);
        setError(null);
        try {
            if (type === 'Bank Account') {
                await deleteBankAccount(id);
                setBankAccounts((prev) => prev.filter((account) => account._id !== id));
            } else if (type === 'Credit Card') {
                await deleteCreditCard(id);
                setCreditCards((prev) => prev.filter((card) => card._id !== id));
            }
        } catch (error) {
            handleError(error, 'Failed to delete payment method.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="w-full">
                <div>
                    <h1 className="text-2xl font-bold">Add Payment Account</h1>
                    <p>Please add your preferred payment method.</p>
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <div className="space-y-4 mt-6">
                    {/* Bank Account Button */}
                    <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <button
                            onClick={() => setShowBankSection(!showBankSection)}
                            className="flex items-center space-x-2"
                            disabled={isLoading}
                        >
                            <Smartphone className="h-5 w-5 text-green-500" />
                            <span>Bank Account</span>
                        </button>
                    </div>

                    {showBankSection && (
                        <BankAccountSection
                            accounts={bankAccounts}
                            onDelete={handleDeletePaymentMethod}
                            onAdd={handleAddPaymentMethod}
                            isLoading={isLoading}
                        />
                    )}

                    {/* Credit/Debit Card Button */}
                    <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <button
                            onClick={() => setShowCardSection(!showCardSection)}
                            className="flex items-center space-x-2"
                            disabled={isLoading}
                        >
                            <CreditCard className="h-5 w-5 text-purple-500" />
                            <span>Credit/Debit Card</span>
                        </button>
                    </div>

                    {showCardSection && (
                        <CreditCardSection
                            cards={creditCards}
                            onDelete={handleDeletePaymentMethod}
                            onAdd={handleAddPaymentMethod}
                            isLoading={isLoading}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentManagement;
