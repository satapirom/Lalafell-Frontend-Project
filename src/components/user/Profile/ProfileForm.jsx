import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useProfile from "../../../hooks/user/useProfile";
import ProfileImage from "../../../components/user/Profile/ProfileImage";
import CoverImage from "../../../components/user/Profile/CoverImage"; // import CoverImage
import { useAuth } from "../../../contexts/AuthContext";
import { BsCameraFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import useUpload from '../../../hooks/user/useUpload.js';
import { getProfile } from '../../../services/uploadProfileServices.js';

const ProfileForm = () => {
    // State management
    const [coverImage, setCoverImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [message, setMessage] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    // References and hooks
    const profileRef = useRef(null);
    const { profile } = useProfile();
    const { isLoggedIn } = useAuth();
    const { formData, handleImageChange, handleUpload } = useUpload();

    // File state management
    const [profileFile, setProfileFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);

    useEffect(() => {
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        try {
            setIsLoading(true);
            const data = await getProfile();
            setUserData(data.myUser);
            
            // Set initial images if they exist
            if (data.myUser.profileImage?.[0]?.url) {
                setProfileImage(data.myUser.profileImage[0].url);
            }
            if (data.myUser.coverImage?.[0]?.url) {
                setCoverImage(data.myUser.coverImage[0].url);
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
            setMessage({ type: 'error', text: 'Failed to load user profile.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCoverImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // Create preview
                const preview = URL.createObjectURL(file);
                setCoverImage(preview);
                setCoverFile(file);
                
                // Prepare form data for upload
                const formData = new FormData();
                formData.append('coverImage', file);
                handleImageChange([null, file]);
                
            } catch (error) {
                console.error('Error handling cover image:', error);
                setMessage({ type: 'error', text: 'Error processing cover image.' });
            }
        }
    };

    const handleProfileImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // Create preview
                const preview = URL.createObjectURL(file);
                setProfileImage(preview);
                setProfileFile(file);
                
                // Prepare form data for upload
                const formData = new FormData();
                formData.append('profileImage', file);
                handleImageChange([file, null]);
                
            } catch (error) {
                console.error('Error handling profile image:', error);
                setMessage({ type: 'error', text: 'Error processing profile image.' });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            // Handle the upload
            await handleUpload();
            
            // Refresh profile data
            await loadUserProfile();
            
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            
            // Clear file states after successful upload
            setProfileFile(null);
            setCoverFile(null);
            
        } catch (error) {
            console.error('Error uploading images:', error);
            setMessage({ 
                type: 'error', 
                text: 'Failed to update profile. Please try again.' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    };

    return (
        <div className="relative">
            {message && (
                <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
                    message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}>
                    {message.text}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    {/* Cover Photo Section */}
                    <div className="relative">
                        <CoverImage coverUrl={coverImage} />
                        <label 
                            htmlFor="cover-upload" 
                            className="absolute bottom-4 right-4 bg-white/70 p-2 rounded-full cursor-pointer hover:bg-white/90 transition-colors"
                        >
                            <BsCameraFill size={24} className="text-gray-700" />
                            <input 
                                id="cover-upload" 
                                type="file" 
                                className="hidden" 
                                onChange={handleCoverImageChange} 
                                accept="image/*"
                            />
                        </label>
                    </div>

                    {/* Profile Picture Section */}
                    <div className="absolute -bottom-16 left-4" ref={profileRef}>
                        <div className="relative">
                            <div className="bg-gray-300 rounded-full border-4 border-white overflow-hidden">
                                <ProfileImage 
                                    imageUrl={profileImage} 
                                    username={userData?.username} 
                                    size={128}
                                />
                            </div>
                            <label 
                                htmlFor="profile-upload" 
                                className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                                <BsCameraFill size={16} className="text-gray-700" />
                                <input 
                                    id="profile-upload" 
                                    type="file" 
                                    className="hidden" 
                                    onChange={handleProfileImageChange} 
                                    accept="image/*"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* User Info Section */}
                <div className=" grid grid-cols-2 gap-4">
                    <div className="space-y-2 mt-12">
                        <h1 className="text-3xl text-gray-800 font-bold">
                            {userData?.username || 'Username'}
                        </h1>
                        <h4 className="flex items-center text-lg text-gray-500">
    <span className="mr-2" aria-hidden="true">
        <HiOutlineMail />
    </span>
    {userData?.email || 'Email'}
</h4>

                    </div>
                    
                    <div className="flex justify-end items-center space-x-4">
                        <Link 
                            to="/settings"
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <IoSettingsSharp size={24} className="text-gray-700" />
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`px-6 py-2 rounded-lg ${
                                isLoading
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-gray-200 hover:bg-gray-300 transition-colors'
                            } text-gray-700`}
                        >
                            {isLoading ? 'Updating...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;