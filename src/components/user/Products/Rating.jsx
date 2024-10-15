import React from 'react';
import { AiFillStar } from 'react-icons/ai';

const Rating = ({ rating, reviews }) => {
    return (
        <div className="flex items-center mb-4 px-4 hover:cursor-pointer">
            {[...Array(5)].map((_, i) => (
                <AiFillStar
                    key={i}
                    className={i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}
                    size={20}
                />
            ))}
            <span className="ml-2 text-gray-500">({reviews.length})</span>
        </div>
    );
};

export default Rating;


