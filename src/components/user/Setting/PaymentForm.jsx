import React, { useState } from 'react';
import { CreditCard, Copy, CheckCircle, Heart, Smartphone, QrCode } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PaymentPrompayForm from './PaymentPrompayForm';
import PaymentMobileBankForm from './PaymentMobileBankForm';
import PaymentCraditCardForm from './PaymentCraditCardForm';

const PaymentForm = ({ selectedMethod }) => {
    const [copied, setCopied] = useState(false);
    const [bankDetails, setBankDetails] = useState({
        bankName: '',
        accountNumber: '',
        accountHolder: '',
    });

    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: null,
        cvv: '',
    });
    const [isFlipped, setIsFlipped] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleBankSelect = (bank) => {
        setBankDetails((prev) => ({ ...prev, bankName: bank.value }));
        setDropdownOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBankDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitBank = (e) => {
        e.preventDefault();
        console.log('Payment details submitted:', bankDetails);
    };

    const handleCardInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails((prev) => ({ ...prev, [name]: value }));

        if (name === 'cvv') {
            setIsFlipped(true);
        } else {
            setIsFlipped(false);
        }
    };

    const handleExpiryChange = (date) => {
        setCardDetails((prev) => ({ ...prev, expiry: date }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Payment details submitted:', cardDetails);
    };

    const renderPaymentDetails = () => {
        switch (selectedMethod) {
            case 'promptpay':
                return (
                    <PaymentPrompayForm copied={copied} handleCopy={handleCopy} />
                );
            case 'mobile-banking':
                return (
                    <PaymentMobileBankForm
                        handleSubmitBankt={handleSubmitBank}
                        bankDetails={bankDetails}
                        handleBankSelect={handleBankSelect}
                        handleInputChange={handleInputChange} />
                );
            case 'credit-debit':
                return (
                    <PaymentCraditCardForm
                        handleSubmit={handleSubmit}
                        isFlipped={isFlipped}
                        setIsFlipped={setIsFlipped}
                        handleCardInputChange={handleCardInputChange}
                        handleExpiryChange={handleExpiryChange}
                        cardDetails={cardDetails} />
                );
            default:
                return null;
        }
    };

    return <>{renderPaymentDetails()}</>;
};

export default PaymentForm;