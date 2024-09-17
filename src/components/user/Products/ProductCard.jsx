import { useState } from 'react';
import FavoriteButton from './FavoriteButton';
import Rating from './Rating';
import { BsFillCartFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const ProductCard = ({ product }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    // สร้าง URL รูปภาพจาก public_id

    return (
        <div className="bg-white rounded-xl shadow-lg p-4 relative max-w-xs mx-auto my-4 flex flex-col">
            <FavoriteButton
                onClick={toggleFavorite}
                isFavorited={isFavorited}
            />

            {/* แสดงหลายรูปภาพ */}
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
                className="w-full h-40 mb-4"
            >
                {Array.isArray(product.images) && product.images.length > 0 && product.images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={img.url} // แก้จาก img.public_id เป็น img.url
                            alt={`Keyboard Image ${index + 1}`}
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <span className="text-gray-800 font-bold text-lg px-4">
                    {product.price}฿
                </span>
            </div>

            <div className="text-gray-500 mb-4 flex-grow">
                {isExpanded ? (
                    <p>{product.description}</p>
                ) : (
                    <p>{product.description.length > 30 ? `${product.description.substring(0, 30)}...` : product.description}</p>
                )}
                {product.description.length > 30 && (
                    <button
                        className="text-gray-400 text-xs mt-2 underline"
                        onClick={toggleDescription}
                    >
                        {isExpanded ? 'Show Less' : 'Read More'}
                    </button>
                )}
            </div>
            <Rating rating={product.rating} reviews={product.reviews} />
            <button className="w-full hover:bg-black hover:text-white text-gray-700 bg-[#E9E4D6] p-3 py-2 rounded-lg flex justify-center items-center space-x-2 mt-auto">
                <span>Buy Now</span>
                <BsFillCartFill />
            </button>
        </div>
    );
};

export default ProductCard;



