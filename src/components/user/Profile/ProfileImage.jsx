import { useState } from "react";

const ProfileImage = ({ imageUrl, username, size = 40 }) => { // ตั้งค่าขนาดเริ่มต้นเป็น 40
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      {!imageError && imageUrl ? (
        <img
          src={imageUrl}
          alt={username || "Profile"}
          onError={handleImageError}
          className="rounded-full object-cover"
          style={{ width: size, height: size }} // ใช้ size จาก props
        />
      ) : (
        <div
          className="bg-primary-color rounded-full flex items-center justify-center text-white font-bold"
          style={{ width: size, height: size }} // ใช้ size จาก props
        >
          {username ? username[0].toUpperCase() : "?"}
        </div>
      )}
    </>
  );
};

export default ProfileImage;
