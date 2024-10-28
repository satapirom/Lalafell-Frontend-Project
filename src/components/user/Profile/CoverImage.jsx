import { useState } from "react";

const CoverImage = ({ coverUrl }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      {!imageError && coverUrl ? (
        <img
          src={coverUrl}
          alt="Cover"
          onError={handleImageError}
          className="w-full h-80 object-cover tablet:rounded-lg" 
        />
      ) : (
        <div className="w-full h-64 bg-gray-400 flex items-center justify-center tablat:rounded-lg">
          <span className="text-gray-700">No Cover Image</span>
        </div>
      )}
    </>
  );
};

export default CoverImage;
