import React from 'react';
import useToggle from '../../../hooks/user/useToggle.js';

const Filter = () => {
    const { isOpen: isPriceOpen, onClose: closePrice, toggle: togglePrice } = useToggle();
    const { isOpen: isBrandOpen, onClose: closeBrand, toggle: toggleBrand } = useToggle();
    const { isOpen: isRatingOpen, onClose: closeRating, toggle: toggleRating } = useToggle();

    return (
        <div className="p-6">
            <h4 className="text-xl font-semibold mb-6">Filter by</h4>
            <div className="space-y-6">
                {/* Price Filter */}
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <div>
                        <h5 className="text-lg font-semibold mb-2 cursor-pointer" onClick={togglePrice}>
                            Price
                        </h5>
                        {isPriceOpen && (
                            <div className="flex flex-col space-y-2">
                                {/* Add price filter options here */}
                                <div className="flex items-center space-x-2">
                                    <input type="number" placeholder="Min Price" className="border p-2 rounded-lg w-full" />
                                    <input type="number" placeholder="Max Price" className="border p-2 rounded-lg w-full" />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='mt-4'>
                        <h5 className="text-lg font-semibold mb-2 cursor-pointer" onClick={toggleBrand}>
                            Catagory
                        </h5>
                        {isBrandOpen && (
                            <div className="flex flex-col space-y-2">
                                {/* Add brand filter options here */}
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2" />
                                    Brand A
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2" />
                                    Brand B
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2" />
                                    Brand B
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2" />
                                    Brand B
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2" />
                                    Brand B
                                </label>

                            </div>
                        )}
                    </div>
                    <div className='mt-4'>
                        <h5 className="text-lg font-semibold mb-2 cursor-pointer" onClick={toggleBrand}>
                            Brand
                        </h5>
                        {isBrandOpen && (
                            <div className="flex flex-col space-y-2">
                                {/* Add brand filter options here */}
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    Brand A
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    Brand B
                                </label>
                                {/* Add more brands as needed */}
                            </div>
                        )}
                    </div>
                    <div className='mt-4'>
                        <h5 className="text-lg font-semibold mb-2 cursor-pointer" onClick={toggleRating}>
                            Rating
                        </h5>
                        {isRatingOpen && (
                            <div className="flex flex-col space-y-2">
                                {/* Add rating filter options here */}
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    5 Stars
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    4 Stars & Up
                                </label>
                                {/* Add more ratings as needed */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;



