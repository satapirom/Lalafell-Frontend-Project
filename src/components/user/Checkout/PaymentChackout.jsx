import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentCheckout = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({ type: '', details: '' });

    useEffect(() => {
        // Retrieve the selected payment method from localStorage
        const storedMethod = localStorage.getItem('selectedPaymentMethod');
        console.log('Stored method in localStorage:', storedMethod); // Logging
        if (storedMethod) {
            const parsedMethod = JSON.parse(storedMethod);
            console.log('Parsed payment method:', parsedMethod); // Logging
            setSelectedPaymentMethod(parsedMethod);
        } else {
            console.log('No payment method found in localStorage'); // Logging
            setSelectedPaymentMethod({ type: 'No payment method selected', details: '' });
        }
    }, []);

    return (
        <div className='flex justify-between items-center gap-4 p-4 bg-white shadow rounded-lg'>
            <div>
                <h2 className="text-lg font-semibold">Selected Payment Method</h2>
                <p className="text-gray-600">{selectedPaymentMethod.type}</p>
                {selectedPaymentMethod.details && (
                    <p className="text-sm text-gray-500">{selectedPaymentMethod.details}</p>
                )}
            </div>
            <Link to='/paymethod' className='text-blue-500 hover:text-blue-600'>
                <ChevronRight size={24} />
            </Link>
        </div>
    );
};

export default PaymentCheckout;