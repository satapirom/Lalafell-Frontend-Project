import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import FavoriteButton from './FavoriteButton';
import { getReviews } from '../../../services/reviweServices';
import { useWishlist } from '../../../contexts/WishlistContext';
import { useAuth } from '../../../contexts/AuthContext';

const ProductCard = ({ product }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const { isInWishlist } = useWishlist();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await getReviews(product._id);
                setReviews(response || []);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setReviews([]);
            }
        };
        fetchReviews();
    }, [product._id]);

    const averageRating = useMemo(() => {
        if (!reviews.length) return 0;
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        return totalRating / reviews.length;
    }, [reviews]);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const handleBuyNow = () => {
        navigate(`/product/${product._id}`);
    };

    const renderDescription = (description) => {
        if (!description) return null;

        const isMobile = window.innerWidth < 600;
        const maxLength = isMobile ? 30 : 60;

        const truncatedDescription = description.length > maxLength
            ? `${description.slice(0, maxLength)}...`
            : description;

        return (
            <div className="w-full">
                <span className="text-gray-600 text-sm flex-1 whitespace-normal" style={{
                    wordBreak: 'normal',
                    overflowWrap: 'anywhere'
                }}>
                    {truncatedDescription}
                </span>
            </div>
        );
    };

    return (
        <div className="bg-white shadow-sm p-4 rounded-xl relative max-w-xs mx-auto my-4 flex flex-col card-responsive">
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
                className="w-full h-20 tablet:h-40 mb-4"
            >
                {Array.isArray(product.images) && product.images.length > 0 ? (
                    product.images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img.url || '/placeholder-image.jpg'}
                                alt={`Product Image ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
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

            <div className="tablet:flex items-center justify-between mb-2">
                <h2 className="text-sm tablet:text-lg font-medium truncate flex-1 mr-2">{product.name}</h2>
                <span className="text-gray-800 text-base font-medium rounded-full tablet:px-3 py-1 tablet:bg-primary-color/15 inline-flex items-center gap-1 whitespace-nowrap">
                    <span className="text-xs tablet:text-base text-primary-color">฿</span>
                    <span className="text-xs tablet:text-base text-primary-color">
                        {product.price}
                    </span>
                </span>
            </div>

            <div className="text-gray-500 text-xs tablet:text-base mb-4 w-full">
                <div className="w-full">
                    {renderDescription(product.description)}
                    {product.description && product.description.split('\n').filter(point => point.trim()).length > 1 && (
                        <button
                            className="text-gray-400 text-xs mt-2 underline flex items-center hover:text-gray-600"
                            onClick={toggleDescription}
                        >
                            {isExpanded ? 'Show Less' : 'Read More'}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                                className={`ml-2 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <div className="flex items-center hover:cursor-pointer">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className={`h-4 w-4 tablet:w-5 tablet:h-5 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z" />
                    </svg>
                ))}
                <span className="ml-2 text-gray-800">{averageRating.toFixed(1)}</span>
            </div>

            <div className='flex justify-between gap-2 items-center mt-4'>
                <button
                    onClick={handleBuyNow}
                    className="w-full text-xs tablet:text-base hover:bg-primary-color hover:text-white text-white bg-primary-color/80 p-3 py-2 rounded-lg flex justify-center items-center space-x-2"
                >
                    <span>Buy Now</span>
                </button>
                <FavoriteButton
                    productId={product._id}
                    isFavorited={isInWishlist(product._id)}
                />
            </div>
        </div>
    );
};

export default ProductCard;
