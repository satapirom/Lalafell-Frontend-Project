import { useState } from 'react';
import { PiHeartFill } from "react-icons/pi";

const FavoriteButton = () => {
    const [isFavorited, setIsFavorited] = useState(false);

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    return (
        <button
            onClick={toggleFavorite}
            className="absolute top-5 right-5 p-1 bg-white rounded-full shadow-lg"
            style={{ zIndex: 10 }} // ให้แน่ใจว่าหัวใจอยู่บนภาพ
        >
            {isFavorited ? (
                <PiHeartFill className="text-red-500" size={24} />
            ) : (
                <PiHeartFill className="text-gray-300" size={24} />
            )}
        </button>
    );
};

export default FavoriteButton;

