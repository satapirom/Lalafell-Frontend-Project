import axiosInstance from '../utils/axiosInstance';

// ฟังก์ชันสำหรับการอัปโหลดภาพโปรไฟล์
const uploadProfileAndCover = async (formData) => {
    try {
        const response = await axiosInstance.post('/users/profile/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading profile and cover:', error);
        throw new Error('Failed to upload profile and cover: ' + (error.response?.data?.message || error.message));
    }
};

export const getProfile = async () => {
    try {
        const response = await axiosInstance.get('/users/profile');
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw new Error('Failed to fetch profile: ' + (error.response?.data?.message || error.message));
    }
};

export default { uploadProfileAndCover, getProfile };

