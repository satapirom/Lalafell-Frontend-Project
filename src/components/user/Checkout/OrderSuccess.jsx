import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full text-center">
                <div className="mb-6">
                    <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                        <Check className="w-10 h-10 text-blue-500" />
                    </div>
                </div>
                <h1 className="text-2xl font-light text-gray-800 mb-2">Thank you for your order</h1>
                <p className="text-sm text-gray-500 mb-6">
                    Your order has been confirmed and will be shipped soon.
                </p>
                <div className="space-y-3">
                    <Link to='/'>
                        <button className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition duration-300 ease-in-out text-sm font-medium">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
