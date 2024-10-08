import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { BsFillCartFill, BsStar, BsStarFill, BsPlusLg, BsDashLg } from 'react-icons/bs';
import axiosInstance from '../../../utils/axiosInstance';
import { useAuth } from '../../../contexts/AuthContext';
import { createCart } from '../../../services/cartServices';

const ProductDetail = () => {
    const { id } = useParams();
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [comment, setComment] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
                console.error('Error fetching product and reviews:', error);
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
                console.error('Error submitting comment:', error);
                setError(error.response?.data?.message || 'An error occurred while submitting your review.');
            }
        } else {
            setError('Please ensure you are logged in, have written a comment, and selected a rating.');
        }
    };

    const calculateAverageRating = () => {
        if (!reviews || reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
        return (sum / reviews.length).toFixed(1);
    };

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            setError('Please log in to add items to your cart.');
            return;
        }

        try {
            const cartData = {
                productId: id,
                quantity: quantity
            };
            const response = await createCart(cartData);
            console.log('Item added to cart:', response);
            // You might want to show a success message or update the UI here
        } catch (error) {
            console.error('Error adding item to cart:', error);
            setError(error.message || 'An error occurred while adding the item to your cart.');
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


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="max-w-screen-laptopl mx-auto my-24 bg-white p-6">
            <div className='rounded-xl shadow-lg'>
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 p-4">
                    <div className="col-span-1 w-full h-96">
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            modules={[Pagination]}
                            className="mb-4 w-full h-full rounded-xl overflow-hidden"
                        >
                            {Array.isArray(product.images) && product.images.length > 0 ? (
                                product.images.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={img.url}
                                            alt={`Product Image ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </SwiperSlide>
                                ))
                            ) : (
                                <SwiperSlide>
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        No Image Available
                                    </div>
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </div>

                    <div className="col-span-1 mx-6">
                        <h1 className="text-xl tablet:text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                        <p className="text-lg tablet:text-xl text-gray-800 mb-4">Price: {product.price} ฿</p>
                        <p className="text-sm tablet:text-base text-gray-500 mb-2">Stock: {product.stock} items available</p>
                        <p className="text-sm tablet:text-base text-gray-500 mb-4">Shipping: {product.shippingInfo}</p>
                        <div className="text-gray-600 mb-6">
                            {isExpanded ? (
                                <p>{product.description}</p>
                            ) : (
                                <p>{product.description && product.description.length > 100
                                    ? `${product.description.substring(0, 100)}...`
                                    : product.description}</p>
                            )}
                            {product.description && product.description.length > 100 && (
                                <button
                                    className="text-blue-500 text-sm mt-2 underline"
                                    onClick={toggleDescription}
                                >
                                    {isExpanded ? 'Show Less' : 'Read More'}
                                </button>
                            )}
                        </div>

                        <div className="flex items-center mb-6">
                            <span className="text-lg tablet:text-xl font-bold mr-2">{calculateAverageRating()}</span>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <BsStarFill
                                        key={star}
                                        className={`tablet:w-5 tablet:h-5 ${star <= calculateAverageRating() ? 'text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <span className="ml-2 text-gray-500">({reviews.length} reviews)</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="bg-gray-200 px-2 py-2 rounded-l"
                                >
                                    <BsDashLg />
                                </button>
                                <span className="bg-gray-100 px-4 py-1">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="bg-gray-200 px-2 py-2 rounded-r"
                                >
                                    <BsPlusLg />
                                </button>
                            </div>
                            <div className="text-xl font-bold">
                                Total: {total}฿
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                className="flex-1 bg-[#E9E4D6] hover:bg-gray-200 text-gray-800 p-3 rounded-lg flex justify-center items-center space-x-2"
                                onClick={handleAddToCart}
                            >
                                <BsFillCartFill />
                                <span>Add to Cart</span>
                            </button>
                            <button
                                onClick={handleProceedToCheckout}
                                className="flex-1 bg-black hover:bg-gray-800 text-white p-3 rounded-lg flex justify-center items-center">
                                <span>Buy Now</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <h2 className="text-2xl tablet:text-3xl font-bold mb-4">Customer Reviews</h2>
                {isLoggedIn ? (
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                        <div className="flex mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setUserRating(star)}
                                    className="mr-1"
                                >
                                    {star <= userRating ? (
                                        <BsStarFill className="w-6 h-6 text-yellow-400" />
                                    ) : (
                                        <BsStar className="w-6 h-6 text-gray-300" />
                                    )}
                                </button>
                            ))}
                        </div>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your review here..."
                            className="w-full p-2 border rounded-md mb-2"
                            rows="3"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Submit Review
                        </button>
                    </form>
                ) : (
                    <p className="text-red-500">Please log in to write a review.</p>
                )}

                <div className="space-y-4">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
                            <div className="flex items-center mb-2">
                                <img
                                    src={review.user.profileImage?.[0]?.url || '../images/avata-profile.png'}
                                    alt={`${review.user.username}'s profile`}
                                    className="w-10 h-10 rounded-full mr-3 object-cover"
                                />
                                <div>
                                    <p className="font-semibold">{review.user.username}</p>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <BsStarFill
                                                key={star}
                                                className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p>{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;


