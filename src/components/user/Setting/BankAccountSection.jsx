// BankAccountSection.jsx
import React, { useState } from 'react';
import { Smartphone, Trash } from 'lucide-react';
import PaymentMobileBankForm from './PaymentMobileBankForm';

const BankAccountSection = ({ accounts, onDelete, onAdd, isLoading }) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div>
            <h2 className="text-lg font-semibold mt-6">Bank Accounts</h2>
            {accounts.length === 0 ? (
                <div className='flex justify-between'>
                    <p>No bank accounts found. Add a new payment to get started.</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded transition duration-150 ease-in-out hover:bg-blue-600"
                        disabled={isLoading}
                    >
                        + Add Bank Account
                    </button>
                </div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {accounts.map(({ _id, accountNumber, accountName }) => (
                        <li key={_id} className="py-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Smartphone className="h-8 w-8 text-green-500" />
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{accountNumber}</p>
                                    <p className="text-sm text-gray-500 truncate">{accountName}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => onDelete(_id, 'bank')}
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
                    <PaymentMobileBankForm
                        onSavePaymentMethod={(data) => {
                            onAdd(data, 'bank');
                            setShowForm(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default BankAccountSection;



