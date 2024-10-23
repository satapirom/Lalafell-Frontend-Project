// CartItem.js
import React from 'react';
import { Trash, Plus, Minus } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem, selectedItems, onSelectItem }) => (
    <div className="flex items-center border-b border-gray-200 py-4 px-6 hover:bg-gray-50 rounded-lg transition duration-150">
        <input
            type="checkbox"
            checked={selectedItems.has(item.product._id)}
            onChange={() => onSelectItem(item.product._id)}
            className="mr-4 w-5 h-5 rounded-xl border-gray-100"
        />
        <img
            src={item.product.images[0]?.url}
            alt={item.product.name}
            className="w-20 h-20 object-cover rounded-md mr-6 shadow-md"
        />
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
            <p className="text-gray-600 text-lg">฿ {item.product.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center">
            <button
                onClick={() => onUpdateQuantity(item.product._id, -1)}
                className={`text-gray-500 hover:text-gray-700 mr-2 ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={item.quantity <= 1}
            >
                <Minus className="w-5 h-5" />
            </button>
            <span className="mx-2 text-lg font-semibold">{item.quantity}</span>
            <button
                onClick={() => onUpdateQuantity(item.product._id, 1)}
                className="text-gray-500 hover:text-gray-700 ml-2"
            >
                <Plus className="w-5 h-5" />
            </button>
        </div>
        <button
            onClick={() => onRemoveItem(item.product._id)}
            className="text-red-500 hover:text-red-700 ml-6 transition duration-200"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#d0021b"
                fill="none"
                className='hover:animate-bounce duration-500'>
                <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
        </button>
    </div>
);

export default CartItem;
