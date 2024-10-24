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

const PaymentManagement = ({ user }) => {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [creditCards, setCreditCards] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showBankSection, setShowBankSection] = useState(false);
    const [showCardSection, setShowCardSection] = useState(false);

    useEffect(() => {
        // fetchBankAccounts();
        fetchCreditCards();
    }, []);

    // const fetchBankAccounts = async () => {
    //     setIsLoading(true);
    //     try {
    //         const response = await getBankAccounts();
    //         setBankAccounts(response.accounts || []);
    //     } catch (error) {
    //         handleError(error, 'Failed to load bank accounts.');
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

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
        setError(null);
        try {
            console.log('Adding payment method:', type, paymentMethodData);
            const dataWithUser = { ...paymentMethodData, user: user?.id };
            if (type === 'bank') {
                const newBankAccount = await createBankAccount(dataWithUser);
                console.log('New bank account created:', newBankAccount);
                setBankAccounts((prev) => [...prev, newBankAccount]);
            } else if (type === 'card') {
                const newCreditCard = await createCreditCard(dataWithUser);
                console.log('New credit card created:', newCreditCard);
                setCreditCards((prev) => [...prev, newCreditCard]);
            }
        } catch (error) {
            console.error(`Error creating payment method:`, error);
            setError(`Failed to save payment method: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };


    const handleDeletePaymentMethod = async (id, type) => {
        setIsLoading(true);
        setError(null);
        try {
            if (type === 'bank') {
                await deleteBankAccount(id);
                setBankAccounts((prev) => prev.filter((account) => account._id !== id));
            } else if (type === 'card') {
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
        <div className="container mx-auto custom-bg rounded-lg max-w-screen-laptopl">
            <div className="w-full p-8">
                <div className='space-y-2'>
                    <h1 className="text-lg font-semibold text-gray-80">Add Payment Account</h1>
                    <p>Please add your preferred payment method.</p>
                </div>
                <div className="space-y-4">
                    {/* Bank Account Button */}
                    <div className="flex items-center space-x-2 border rounded-lg p-4 custom-galssmorpuism hover:bg-gray-50 cursor-pointer">
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
                            user={user}
                        />
                    )}

                    {/* Credit/Debit Card Button */}
                    <div className="flex items-center space-x-2 border rounded-lg p-4 custom-galssmorpuism hover:bg-gray-50 cursor-pointer">
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

