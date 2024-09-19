import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { BsFillCartFill, BsStar, BsStarFill } from 'react-icons/bs';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [comment, setComment] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // ในที่นี้เราจำลองการเรียก API
                // ในการใช้งานจริง คุณจะต้องเรียก API จริงๆ ที่นี่
                const response = await fetch(`/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim() && userRating > 0) {
            const newComment = { text: comment, rating: userRating };
            setProduct(prev => ({
                ...prev,
                comments: [...(prev.comments || []), newComment],
                reviews: (prev.reviews || 0) + 1
            }));
            setComment('');
            setUserRating(0);
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
        <div className="max-w-4xl mx-auto my-8 bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                        className="w-full h-80 mb-4 rounded-xl overflow-hidden"
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

                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-2xl font-bold text-gray-800 mb-4">{product.price}฿</p>
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
                        <span className="text-xl font-bold mr-2">{calculateAverageRating()}</span>
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <BsStarFill
                                    key={star}
                                    className={`w-5 h-5 ${star <= calculateAverageRating() ? 'text-yellow-400' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                        <span className="ml-2 text-gray-500">({product.reviews || 0} reviews)</span>
                    </div>

                    <div className="flex space-x-4">
                        <button className="flex-1 bg-[#E9E4D6] hover:bg-gray-200 text-gray-700 p-3 rounded-lg flex justify-center items-center space-x-2">
                            <BsFillCartFill />
                            <span>Add to Cart</span>
                        </button>
                        <button className="flex-1 bg-black hover:bg-gray-800 text-white p-3 rounded-lg flex justify-center items-center">
                            <span>Buy Now</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
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

                <div className="space-y-4">
                    {product.comments && product.comments.map((comment, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-md">
                            <div className="flex mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <BsStarFill
                                        key={star}
                                        className={`w-4 h-4 ${star <= comment.rating ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <p>{comment.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;