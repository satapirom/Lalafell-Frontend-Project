import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { BsFillCartFill, BsStar, BsStarFill, BsPlusLg, BsDashLg } from 'react-icons/bs';
import axiosInstance from '../../../utils/axiosInstance';
import { useAuth } from '../../../contexts/AuthContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { isLoggedIn } = useAuth();
    const [product, setProduct] = useState(null);
    const [comment, setComment] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get(`/products/${id}`);
                if (response.status === 200) {
                    setProduct(response.data.product);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
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

        const userToken = localStorage.getItem('token');

        if (comment.trim() && userRating > 0 && isLoggedIn && userToken) {
            const newReview = { comment: comment, rating: userRating };  // Changed 'text' to 'comment'

            try {
                const response = await axiosInstance.post(`/products/${id}/reviews`, newReview, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                if (response.status === 201) {
                    setProduct(prev => ({
                        ...prev,
                        comments: [...(prev.comments || []), response.data.review],
                        reviews: (prev.reviews || 0) + 1
                    }));
                    setComment('');
                    setUserRating(0);
                    setError(null);
                }
            } catch (error) {
                console.error('Error submitting comment:', error.response?.data?.message || error.message);
                setError(error.response?.data?.message || 'An error occurred while submitting your review.');
            }
        } else {
            setError('Please make sure you are logged in, your comment is not empty, and you have selected a rating.');
        }
    };



    const calculateAverageRating = () => {
        if (!product || !product.comments || product.comments.length === 0) return 0;
        const sum = product.comments.reduce((acc, curr) => acc + curr.rating, 0);
        return (sum / product.comments.length).toFixed(1);
    };

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    if (!product) return <div>Loading...</div>;

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
                            className=" mb-4 w-full h-full rounded-xl overflow-hidden"
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
                            <span className="ml-2 text-gray-500">({product.reviews || 0} reviews)</span>
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
                            <button className="flex-1 bg-[#E9E4D6] hover:bg-gray-200 text-gray-800 p-3 rounded-lg flex justify-center items-center space-x-2">
                                <BsFillCartFill />
                                <span>Add to Cart</span>
                            </button>
                            <button className="flex-1 bg-black hover:bg-gray-800 text-white p-3 rounded-lg flex justify-center items-center">
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
                    {product.comments && product.comments.map((comment, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
                            <p>{comment.text}</p>
                            <div className="flex items-center mb-2">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <BsStarFill
                                            key={star}
                                            className={`w-4 h-4 ${star <= comment.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;



