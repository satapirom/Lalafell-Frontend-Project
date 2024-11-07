import React from 'react';
import useToggle from '../../../hooks/user/useToggle.js';

const Filter = () => {
    const { isOpen: isPriceOpen, onClose: closePrice, toggle: togglePrice } = useToggle();
    const { isOpen: isBrandOpen, onClose: closeBrand, toggle: toggleBrand } = useToggle();

    return (
        <div className="p-6">
            <h4 className="text-xl font-semibold mb-6">Filter by</h4>
        </div>
    );
};

export default Filter;



