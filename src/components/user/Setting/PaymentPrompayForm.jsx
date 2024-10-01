import React from 'react';
import { Copy, CheckCircle, QrCode } from 'lucide-react';

const PaymentPrompayForm = ({ copied, handleCopy }) => {
    return (
        <div className="space-y-6 max-w-md mx-auto bg-gradient-to-br from-pink-100 to-yellow-100 p-6 rounded-3xl shadow-lg border-4 border-white">
            <div className="flex justify-center">
                <div className="relative">
                    <img
                        src="/images/qr-code.png"
                        alt="QR Code"
                        className="border-4 border-white rounded-2xl shadow-md" />
                    <QrCode className="absolute top-2 left-2 h-8 w-8 text-pink-500" />
                </div>
            </div>

            <div className="flex items-center justify-between bg-white p-4 rounded-full shadow-md">
                <span className="text-pink-700 font-medium">PromptPay Number:</span>
                <div className="flex items-center space-x-2">
                    <span className="font-medium text-pink-600">xxx-xxx-xxxx</span>
                    <button className="p-1 bg-pink-200 rounded-full" onClick={() => handleCopy('xxx-xxx-xxxx')}>
                        {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-pink-600" />}
                    </button>
                </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-md">
                <h2 className="text-lg font-semibold text-pink-700 mb-2">Instructions</h2>
                <p className="text-pink-600">Scan the cute QR Code with your banking app to make a payment, or use the PromptPay number displayed above. It's easy and adorable!</p>
            </div>
        </div>
    );
}

export default PaymentPrompayForm;