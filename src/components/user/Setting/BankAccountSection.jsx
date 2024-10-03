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

    useEffect(() => {
        fetchBankAccounts();
    }, []);

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
        <div>
            {error && <div className="text-red-500">{error}</div>}
            <div className='flex justify-between'>
                <div>
                    <h2 className="text-lg font-semibold mt-6">Bank Accounts</h2>
                    {accounts.length === 0 ? (
                        <p>No bank accounts found. Add a new payment to get started.</p>
                    ) : (
                        <p>{accounts.length} bank account(s) found.</p>
                    )}
                </div>
                <div>
                    <button
                        onClick={handleAddBankAccount}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded transition duration-150 ease-in-out hover:bg-blue-600"
                    >
                        + Add Bank Account
                    </button>
                </div>
            </div>
            {accounts.length > 0 && (
                <ul className="divide-y divide-gray-200 mt-4">
                    {accounts.map((account, index) => (
                        <li key={account._id || index} className="py-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Smartphone className="h-8 w-8 text-green-500" />
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {account.bankName}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        {account.accountHolderName}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        {account.accountNumber}
                                    </p>
                                </div>
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
