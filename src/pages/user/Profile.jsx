import React, { useState } from 'react';

const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        storeName: 'Your Store Name',
        email: 'yourstore@gmail.com',
        phoneNumber: '+123 4567890',
        role: 'Store Owner',
        description: 'We sell the best custom keyboards and accessories. Join us for quality products and a great shopping experience.',
        interests: ['Keyboards', 'Keycaps', 'Switches', 'Accessories'],
        socialLinks: {
            twitter: 'https://twitter.com/yourstore',
            instagram: 'https://instagram.com/yourstore',
            linkedin: 'https://linkedin.com/in/yourstore',
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Edit Store Profile</h1>

            {/* Profile Photo */}
            <div className="flex flex-col items-center mt-4">
                <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="rounded-full w-32 h-32 object-cover"
                />
                <button className="bg-blue-500 text-white mt-2 px-4 py-1 rounded">Upload New</button>
                <button className="bg-gray-300 text-black mt-2 px-4 py-1 rounded">Save</button>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Store Name</label>
                    <input
                        type="text"
                        name="storeName"
                        value={userInfo.storeName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={userInfo.phoneNumber}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <input
                        type="text"
                        name="role"
                        value={userInfo.role}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
            </div>

            {/* Store Description */}
            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Store Description</label>
                <textarea
                    name="description"
                    value={userInfo.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            {/* Interests */}
            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Categories/Interests</label>
                <div className="flex flex-wrap gap-2 mt-2">
                    {userInfo.interests.map((interest, index) => (
                        <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                            {interest}
                        </span>
                    ))}
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">+ Add more</button>
                </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Twitter</label>
                    <input
                        type="url"
                        name="twitter"
                        value={userInfo.socialLinks.twitter}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Instagram</label>
                    <input
                        type="url"
                        name="instagram"
                        value={userInfo.socialLinks.instagram}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                    <input
                        type="url"
                        name="linkedin"
                        value={userInfo.socialLinks.linkedin}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
            </div>

            <div className="mt-6">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Save Profile</button>
            </div>
        </div>
    );
};

export default Profile;
