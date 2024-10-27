import React, { useState, useEffect } from 'react';
import { Smartphone, Trash, Edit2 } from 'lucide-react';
import PaymentBankAccountForm from './PaymentBankAccountForm';
import { getBankAccounts, createBankAccount, updateBankAccount, deleteBankAccount } from '../../../services/paymentServices';

const BankAccountSection = ({ user, onDelete, onClose }) => {
    const [accounts, setAccounts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBankAccounts = async () => {
        setIsLoading(true);
        try {
            const response = await getBankAccounts();
            if (response.error === false && Array.isArray(response.payMethods)) {
                setAccounts(response.payMethods.filter(method => method.type === "Bank Account"));
            } else {
                setError('Failed to load bank accounts.');
            }
        } catch (error) {
            console.error('Error fetching bank accounts:', error);
            setError('Failed to load bank accounts.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBankAccounts();
    }, []);


    const handleSavePaymentMethod = async (data) => {
        try {
            let response;
            if (editingAccount && editingAccount._id) {
                response = await updateBankAccount(editingAccount._id, data);
            } else {
                response = await createBankAccount(data);
            }

            if (response.error === false) {
                await fetchBankAccounts();
                setShowForm(false);
                setEditingAccount(null);
            } else {
                setError(editingAccount ? 'Failed to update bank account.' : 'Failed to save bank account.');
            }
        } catch (error) {
            console.error('Error in handleSavePaymentMethod:', error);
            setError(editingAccount ? 'Failed to update bank account.' : 'Failed to save bank account.');
        }
    };

    const handleAddBankAccount = () => {
        setIsAdding(true);
        setEditingAccount(null);
        setShowForm(true);
        setError(null);
    };

    const handleEdit = (account) => {
        console.log('Selected account for editing:', account); // เพิ่มเพื่อดูข้อมูล account
        if (!account._id) {
            console.error('No _id found for the selected account');
            return;
        }
        setIsAdding(false);
        setEditingAccount(account);  // ตั้งค่า editingAccount ให้ตรงกับ account ที่เลือก
        setShowForm(true);
    };



    const handleDelete = async (id) => {
        console.log('Attempting to delete account with ID:', id);
        setIsLoading(true);
        setError(null);
        try {
            await deleteBankAccount(id);
            await fetchBankAccounts();
        } catch (error) {
            console.error('Error deleting bank account:', error);
            setError(`Failed to delete bank account. Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setEditingAccount(null);
        setShowForm(false);
        setError(null);
    };

    if (isLoading) {
        return <div>Loading bank accounts...</div>;
    }

    return (
        <div className='p-2 tablet:p-8'>
            {error && <div className="text-red-500">{error}</div>}
            <div className='flex justify-between'>
                <div>
                    {accounts.length === 0 ? (
                        <p>No bank accounts found. Add a new payment to get started.</p>
                    ) : (
                        <p className='bg-primary-color/15 rounded-full px-4 py-1'>{accounts.length} bank account(s) found.</p>
                    )}
                </div>
                <div>
                    <button
                        onClick={handleAddBankAccount}
                        className="bg-primary-color text-white px-6 py-2 rounded-md hover:bg-primary-color/80 transition duration-200 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        color="#ffffff" 
                        fill="none"
                        className='w-4 h-4 tablet:w-6 tablet:h-6'>
                            <path d="M12 4V20M20 12H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span className='hidden laptop:block ml-2'>
                        Add Bank Account
                        </span>
                    </button>
                </div>
            </div>
            {accounts.length > 0 && (
                <ul className="divide-y divide-gray-200 p-2 tablet:p-4">
                    {accounts.map((account, index) => (
                        <li key={account._id || index} className="p-4 flex items-center justify-between hover:bg-gray-100 rounded-lg">
                            <div className="flex items-center space-x-4">
                                <ul className="space-y-1 text-sm leading-relaxed">
                                    <li className="font-medium">
                                       {account.bankName}
                                    </li>
                                    <li className="font-light">
                                       {account.accountHolderName}
                                    </li>
                                    <li className="font-light">
                                       {account.accountNumber}
                                    </li>
                                </ul>

                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(account)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <Edit2 className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(account._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash className="h-5 w-5" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {showForm && (
                <div className="mt-4">
                    <PaymentBankAccountForm
                        onClose={() => {
                            setShowForm(false);
                            setEditingAccount(null);
                        }}
                        onSavePaymentMethod={handleSavePaymentMethod}
                        user={user}
                        initialData={editingAccount}
                        onCancel={handleCancel}
                    />
                </div>
            )}
        </div>
    );
};

export default BankAccountSection;
