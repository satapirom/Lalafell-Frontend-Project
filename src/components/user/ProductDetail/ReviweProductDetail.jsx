import React from 'react';
import { Heart } from 'lucide-react';

const ReviewProductDetail = ({
    comment,
    userRating,
    reviews,
    setUserRating,
    setComment,
    handleCommentSubmit,
    isLoggedIn,
}) => {
    return (
        <div className="max-w-screen-laptopl mx-auto rounded-lg mt-8 custom-bg">
            {/* Header */}
            <div className='p-8 rounded-lg'>
                <div className="flex items-center gap-2 ">
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="36"
                            height="36"
                            color="#000"
                            fill="none"
                            className='animate-pulse'>
                            <path d="M12.5 3.00372C11.6049 2.99039 10.7047 3.01289 9.8294 3.07107C5.64639 3.34913 2.31441 6.72838 2.04024 10.9707C1.98659 11.8009 1.98659 12.6607 2.04024 13.4909C2.1401 15.036 2.82343 16.4666 3.62791 17.6746C4.09501 18.5203 3.78674 19.5758 3.30021 20.4978C2.94941 21.1626 2.77401 21.495 2.91484 21.7351C3.05568 21.9752 3.37026 21.9829 3.99943 21.9982C5.24367 22.0285 6.08268 21.6757 6.74868 21.1846C7.1264 20.9061 7.31527 20.7668 7.44544 20.7508C7.5756 20.7348 7.83177 20.8403 8.34401 21.0513C8.8044 21.2409 9.33896 21.3579 9.8294 21.3905C11.2536 21.4852 12.7435 21.4854 14.1706 21.3905C18.3536 21.1125 21.6856 17.7332 21.9598 13.4909C22.0021 12.836 22.011 12.1627 21.9866 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15 5.5H22M18.5 2L18.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11.9953 12.5H12.0043M15.9908 12.5H15.9998M7.99982 12.5H8.00879" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                    <h2 className="text-3xl font-semibold text-gray-800">Customer Reviews</h2>
                </div>

                {/* Review Form */}
                {isLoggedIn ? (
                    <div className="  rounded-2xl mt-4">
                        <p className="text-lg font-normal text-gray-700 mb-6">Share your experience with us</p>
                        <div className="rounded-2xl mb-12">
                            <div className="flex space-x-2 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => {
                                            // Deselect if already selected, otherwise select the star
                                            setUserRating((prev) => (prev === star ? prev - 1 : star));
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                            className={star <= userRating ? 'text-yellow-400' : 'text-primary-color/80'}
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Tell us what you loved about the product... "
                                className="w-full custom-galssmorpuism p-4 border border-primary-color rounded-xl  mb-4 focus:ring-2 focus:ring-primary-color focus:border-primary-color focus:ring-opacity-100 focus:outline-none transition "
                                rows="4"
                            />
                            <button
                                onClick={handleCommentSubmit}
                                className="bg-primary-color hover:bg-primary-color/80 text-white py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                            >
                                Share Review
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center bg-pink-50 p-8 rounded-2xl mb-10">
                        <Heart className="w-12 h-12 text-pink-300 mx-auto mb-4" />
                        <p className="text-xl text-gray-600">
                            Please log in to share your lovely review! ✨
                        </p>
                    </div>
                )}

                {/* Reviews List */}
                <div className="space-y-8">
                    {reviews.map((review, index) => (
                        <div key={index} className=" custom-galssmorpuism shadow-sm p-6 rounded-xl  border border-gray-100">
                            <div className="flex items-center mb-4">
                                <img
                                    src={review.user.profileImage?.[0]?.url || '/api/placeholder/48/48'}
                                    alt={review.user.username}
                                    className="w-12 h-12 rounded-full border-2 border-pink-100"
                                />
                                <div className="ml-4">
                                    <p className="font-medium text-lg text-gray-800">{review.user.username}</p>
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg
                                                key={star}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="20"
                                                height="20"
                                                className={star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewProductDetail;
