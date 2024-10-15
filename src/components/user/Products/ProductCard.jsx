import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import FavoriteButton from './FavoriteButton';
import { getReviews } from '../../../services/reviweServices';
import { useWishlist } from '../../../contexts/WishlistContext';

const ProductCard = ({ product }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const { wishlist } = useWishlist();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await getReviews(product._id);
                setReviews(response);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setReviews([]);
            }
        };
        fetchReviews();
    }, [product._id]);

    const averageRating = useMemo(() => {
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        return reviews.length ? totalRating / reviews.length : 0;
    }, [reviews]);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const handleBuyNow = () => {
        navigate(`/product/${product._id}`);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-4 relative max-w-xs mx-auto my-4 flex flex-col">
            <FavoriteButton
                productId={product._id}
                isFavorited={wishlist.has(product._id)}
            />

            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
                className="w-full h-40 mb-4"
            >
                {Array.isArray(product.images) && product.images.length > 0 ? (
                    product.images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img.url || 'fallback-image-url.jpg'}
                                alt={`Product Image ${index + 1}`}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-xl">
                            No Image Available
                        </div>
                    </SwiperSlide>
                )}
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
                    <p>{product.description && product.description.length > 30 ? `${product.description.substring(0, 30)}...` : product.description}</p>
                )}
                {product.description && product.description.length > 30 && (
                    <button
                        className="text-gray-400 text-xs mt-2 underline"
                        onClick={toggleDescription}
                    >
                        {isExpanded ? 'Show Less' : 'Read More'}
                    </button>
                )}
            </div>

            <div className="flex items-center mb-4 px-4 hover:cursor-pointer">
                {[...Array(5)].map((_, i) => (
                    <AiFillStar
                        key={i}
                        className={i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}
                        size={20}
                    />
                ))}
                <span className="ml-2 text-gray-500">({reviews.length})</span>
            </div>

            <button
                onClick={handleBuyNow}
                className="w-full hover:bg-black hover:text-white text-gray-700 bg-[#E9E4D6] p-3 py-2 rounded-lg flex justify-center items-center space-x-2 mt-auto"
            >
                <span>Buy Now</span>
                <BsFillCartFill />
            </button>
        </div>
    );
};

export default ProductCard;







