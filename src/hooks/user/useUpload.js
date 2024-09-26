import { useState } from "react";
import uploadProfileServices from '../../services/uploadProfileServices';
const { uploadProfileAndCover } = uploadProfileServices;

const useUpload = () => {
    const [formData, setFormData] = useState({
        profileImage: null,
        coverImage: null,
        username: '',
        email: '',
    });

    const handleImageChange = (files) => {
        const updatedFormData = { ...formData };
        if (files[0]) {
            updatedFormData.profileImage = files[0];
        }
        if (files[1]) {
            updatedFormData.coverImage = files[1];
        }
        setFormData(updatedFormData);
    };

    const handleUpload = async () => {
        const formDataToSend = new FormData();
        if (formData.profileImage) {
            formDataToSend.append('profileImage', formData.profileImage);
        }
        if (formData.coverImage) {
            formDataToSend.append('coverImage', formData.coverImage);
        }

        try {
            const result = await uploadProfileAndCover(formDataToSend);
            return result;
        } catch (error) {
            console.error('Error uploading profile and cover:', error);
            throw error;
        }
    };

    return {
        formData,
        handleImageChange,
        handleUpload,
    };
};

export default useUpload;

