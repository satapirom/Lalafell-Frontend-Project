import React, { useState, useEffect } from 'react';
import { BsCameraFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import useUpload from '../../../hooks/user/useUpload.js';
import { getProfile } from '../../../services/uploadProfileServices.js';



const ProfileForm = () => {
    const { formData, handleImageChange, handleUpload } = useUpload();
    const [coverImage, setCoverImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [message, setMessage] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const data = await getProfile();
                setUserData(data.myUser);
                if (data.myUser.profileImage && data.myUser.profileImage.length > 0) {
                    setProfileImage(data.myUser.profileImage[0].url);
                }
                if (data.myUser.coverImage && data.myUser.coverImage.length > 0) {
                    setCoverImage(data.myUser.coverImage[0].url);
                }
            } catch (error) {
                console.error('Error loading user profile:', error);
                setMessage({ type: 'error', text: 'Failed to load user profile.' });
            }
        };
        loadUserProfile();
    }, []);

    const handleCoverImageChange = (e) => {
        if (e.target.files[0]) {
            setCoverImage(URL.createObjectURL(e.target.files[0]));
            handleImageChange([null, e.target.files[0]]);
        }
    };

    const handleProfileImageChange = (e) => {
        if (e.target.files[0]) {
            setProfileImage(URL.createObjectURL(e.target.files[0]));
            handleImageChange([e.target.files[0], null]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleUpload();
            const updatedData = await getProfile();
            setUserData(updatedData.myUser);
            if (updatedData.myUser.profileImage && updatedData.myUser.profileImage.length > 0) {
                setProfileImage(updatedData.myUser.profileImage[0].url);
            }
            if (updatedData.myUser.coverImage && updatedData.myUser.coverImage.length > 0) {
                setCoverImage(updatedData.myUser.coverImage[0].url);
            }
            setMessage({ type: 'success', text: 'Profile and cover updated successfully!' });
        } catch (error) {
            console.error('Error uploading profile or cover:', error);
            setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-screen-lg mx-auto">
            {message && (
                <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    {/* Cover Photo */}
                    <div className="h-64 bg-gray-200 rounded-2xl relative">
                        {coverImage ? (
                            <img
                                src={coverImage}
                                alt="Cover"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-400">
                                <span className="text-gray-700">No Cover Image</span>
                            </div>
                        )}
                        <label htmlFor="cover-upload" className="absolute bottom-4 right-4 bg-white/70 p-2 rounded-full cursor-pointer">
                            <BsCameraFill size={24} color='#374151' />
                            <input id="cover-upload" type="file" className="hidden" onChange={handleCoverImageChange} accept="image/*" />
                        </label>
                    </div>

                    {/* Profile Picture */}
                    <div className="absolute -bottom-16 left-4">
                        <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white overflow-hidden">
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-4xl">{userData.username ? userData.username[0].toUpperCase() : 'U'}</span>
                                </div>
                            )}
                        </div>
                        <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer">
                            <BsCameraFill size={16} color='#374151' />
                            <input id="profile-upload" type="file" className="hidden" onChange={handleProfileImageChange} accept="image/*" />
                        </label>
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-2">
                    <div className="col-span-1">
                        <div>
                            {userData.username ? (
                                <h1 className="text-3xl text-gray-800  font-bold">{userData.username}</h1>
                            ) : (
                                <h1 className="text-3xl text-gray-800  font-bold">Username</h1>
                            )}
                        </div>
                        <div className="col-span-1">
                            {userData.email ? (
                                <h4 className="text-lg text-gray-500 ">{userData.email}</h4>
                            ) : (
                                <h4 className="text-lg text-gray-800 ">Email</h4>
                            )}
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className=" flex justify-end items-center px-4 space-x-2 text-center">
                            <IoSettingsSharp size={24} color='#374151' className="cursor-pointer" />
                            <button type="submit" className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Edit</button>
                        </div>
                    </div>
                </div>
            </form >
        </div >
    );
};

export default ProfileForm;