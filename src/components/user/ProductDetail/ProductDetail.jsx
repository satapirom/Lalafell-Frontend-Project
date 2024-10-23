import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { BsPlusLg, BsDashLg } from 'react-icons/bs';
import axiosInstance from '../../../utils/axiosInstance';
import { useAuth } from '../../../contexts/AuthContext';
import { createCart } from '../../../services/cartServices';
import ReviweProductDetail from './ReviweProductDetail';
import YouMayAlsoLike from '../../../components/user/YouMayAlsoLike/YouMayAlsoLike';

const ProductDetail = () => {
    const { id } = useParams();
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [comment, setComment] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const fetchProductAndReviews = async () => {
            try {
                setIsLoading(true);
                const [productResponse, reviewsResponse] = await Promise.all([
                    axiosInstance.get(`/products/${id}`),
                    axiosInstance.get(`/products/${id}/reviews`)
                ]);
                setProduct(productResponse.data.product);
                setReviews(reviewsResponse.data);
                setIsLoading(false);
            } catch (error) {
                setError('Failed to load product and reviews');
                setIsLoading(false);
            }
        };

        fetchProductAndReviews();
    }, [id]);

    useEffect(() => {
        if (product) {
            setTotal(product.price * quantity);
        }
    }, [quantity, product]);

    const handleQuantityChange = (change) => {
        setQuantity(prev => Math.max(1, prev + change));
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (comment.trim() && userRating > 0 && isLoggedIn) {
            const newReview = { comment, rating: userRating };

            try {
                const response = await axiosInstance.post(`/products/${id}/reviews`, newReview);
                if (response.status === 201) {
                    const createdReview = response.data.review;
                    setReviews(prevReviews => [createdReview, ...prevReviews]);
                    setComment('');
                    setUserRating(0);
                    setError(null);
                }
            } catch (error) {
                setError('An error occurred while submitting your review.');
            }
        } else {
            setError('Please ensure you are logged in, have written a comment, and selected a rating.');
        }
    };

    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            setError('Please log in to add items to your cart.');
            return;
        }

        try {
            const cartData = { productId: id, quantity: quantity };
            await createCart(cartData);
        } catch (error) {
            setError('An error occurred while adding the item to your cart.');
        }
    };

    const handleProceedToCheckout = () => {
        if (!isLoggedIn) {
            setError('Please log in to proceed to checkout.');
            return;
        }

        const selectedCartItem = {
            product: {
                _id: product._id,
                name: product.name,
                price: product.price,
                images: product.images
            },
            quantity: quantity
        };

        navigate('/checkout', { state: { selectedCartItems: [selectedCartItem] } });
    };

    const renderDescription = (description) => {
        if (!description) return null;

        const points = description.split('\n').filter(point => point.trim());
        const displayPoints = isExpanded ? points : points.slice(0, 2);

        return (
            <div className="w-full">
                <ul className="list-none space-y-2">
                    {displayPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                            <span className="text-primary-color mr-4 flex-shrink-0">•</span>
                            <span className="text-gray-600 text-lg flex-1 whitespace-normal" style={{
                                wordBreak: 'normal',
                                overflowWrap: 'anywhere'
                            }}>
                                {point.trim().replace(/^[•\s-]+/, '')}
                            </span>
                        </li>
                    ))}
                </ul>
                {points.length > 1 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-2 text-primary-color hover:text-secondary-color text-lg py-4 "
                    >
                        {isExpanded ? 'Show Less' : 'Show More'}
                    </button>
                )}
            </div>
        );
    };

    if (isLoading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!product) return <div className="text-center">Product not found</div>;

    return (
        <div className="max-w-screen-laptopl mx-auto pt-20 bg-white">
            <div>
                <div className=" custom-bg p-4 tablet:p-8 rounded-lg">
                    <div className="grid grid-cols-1 tablet:grid-cols-2 items-stretch justify-between bg-white rounded-lg">
                        <div className='col-span-1 rounded-l-xl overflow-hidden'>
                            <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                                <Swiper
                                    slidesPerView={1}
                                    pagination={{
                                        clickable: true,
                                        bulletClass: 'swiper-pagination-bullet w-4 h-4 bg-black',
                                        bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary-color w-6 h-6 animate-pulse',
                                    }}
                                    modules={[Pagination]}
                                    className="absolute inset-0 w-full h-full "
                                >
                                    {Array.isArray(product.images) && product.images.length > 0 ? (
                                        product.images.map((img, index) => (
                                            <SwiperSlide key={index} className="relative w-full h-full">
                                                <div className="absolute inset-0 w-full h-full group">
                                                    <img
                                                        src={img.url}
                                                        alt={`Product ${index + 1}`}
                                                        className="inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    ) : (
                                        <SwiperSlide className="relative w-full h-full">
                                            <div className="absolute inset-0 flex items-center justify-center bg-pink-50">
                                                <span className="text-primary-color text-lg">No Image Available</span>
                                            </div>
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                            </div>
                        </div>

                        <div className="col-span-1 tablet:col-span-1 p-4 tablet:px-16 tablet:py-8 bg-white rounded-lg h-full">
                            <h2 className="text-2xl tablet:text-4xl font-bold mb-4">{product.name}</h2>
                            <p>{renderDescription(product.description)}</p>

                            <div className="space-y-4 mt-4">
                                {/* Quantity Selector */}
                                <div className="flex items-center space-x-4">
                                    <span className="text-lg tablet:text-xl font-light">Quantity:</span>
                                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                                        <button onClick={() => handleQuantityChange(-1)} className="p-2 hover:bg-primary-color/15 rounded-l-xl">
                                            <BsDashLg size={20} />
                                        </button>
                                        <span className="px-4 text-xl">{quantity}</span>
                                        <button onClick={() => handleQuantityChange(1)} className="p-2 hover:bg-primary-color/15 rounded-r-xl">
                                            <BsPlusLg size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Price Display */}
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-700 text-lg tablet:text-xl font-light">Price :</span>
                                    <span className="text-gray-800 text-base font-medium rounded-full bg-primary-color/15 px-3 py-1 inline-flex items-center gap-1">
                                        <span className="text-primary-color text-lg tablet:text-xl font-light">฿</span>
                                        <span className="text-gray-700 text-lg tablet:text-xl font-light">{product.price}</span>
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col tablet:flex-row space-y-4 tablet:space-y-0 tablet:space-x-4 pt-6">
                                    <button
                                        onClick={handleProceedToCheckout}
                                        className="w-full  bg-primary-color hover:bg-secondary-color/80 text-white py-3 px-8 tablet:px-28 rounded-lg transition duration-200"
                                    >
                                        Buy Now
                                    </button>
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full tablet:w-auto bg-primary-color/15 py-3 tablet:py-1 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#5c6bc0" fill="none">
                                            <path d="M11.5 22H9.62182C7.27396 22 6.10003 22 5.28565 21.2945C4.47127 20.5889 4.27181 19.3991 3.87289 17.0194L2.66933 9.83981C2.48735 8.75428 2.39637 8.21152 2.68773 7.85576C2.9791 7.5 3.51461 7.5 4.58564 7.5H19.4144C20.4854 7.5 21.0209 7.5 21.3123 7.85576C21.6036 8.21152 21.5126 8.75428 21.3307 9.83981L21.0524 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M13.6418 14.4418C14.8486 13.7108 15.9018 14.0054 16.5345 14.4747C16.794 14.6671 16.9237 14.7633 17 14.7633C17.0763 14.7633 17.206 14.6671 17.4655 14.4747C18.0982 14.0054 19.1514 13.7108 20.3582 14.4418C21.9419 15.4013 22.3002 18.5666 18.6472 21.237C17.9514 21.7457 17.6035 22 17 22C16.3965 22 16.0486 21.7457 15.3528 21.237C11.6998 18.5666 12.0581 15.4013 13.6418 14.4418Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5" stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <ReviweProductDetail
                    comment={comment}
                    userRating={userRating}
                    reviews={reviews}
                    setUserRating={setUserRating}
                    setComment={setComment}
                    handleCommentSubmit={handleCommentSubmit}
                    isLoggedIn={isLoggedIn}
                />
            </div>

            <YouMayAlsoLike />
        </div>
    );
};

export default ProductDetail;
