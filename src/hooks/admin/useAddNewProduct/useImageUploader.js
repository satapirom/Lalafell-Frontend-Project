import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axiosInstance from '../../../utils/axiosInstance';

const useImageUploader = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [replaceIndex, setReplaceIndex] = useState(null);
    const [uploading, setUploading] = useState(false);

    const onDrop = (acceptedFiles) => {
        console.log('Accepted files:', acceptedFiles); // แสดงไฟล์ที่ถูกเลือกในคอนโซล

        setUploadedImages((prevImages) => {
            const newImages = [...prevImages];
            if (replaceIndex !== null) {
                newImages[replaceIndex] = Object.assign(acceptedFiles[0], {
                    preview: URL.createObjectURL(acceptedFiles[0])
                });
                setReplaceIndex(null);
            } else {
                const mappedImages = acceptedFiles.map((file) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                );
                newImages.push(...mappedImages);
            }
            return newImages;
        });
    };

    const replaceImage = (index) => {
        setReplaceIndex(index);
    };

    const removeImage = (index) => {
        setUploadedImages((prevImages) => {
            const newImages = [...prevImages];
            newImages.splice(index, 1);
            return newImages;
        });
    };
    const uploadImages = async () => {
        setUploading(true);

        const uploadImages = async () => {
            setUploading(true);

            const formData = new FormData();
            uploadedImages.forEach((image) => {
                console.log('Image before upload:', image); // ตรวจสอบรูปภาพก่อนส่ง
                formData.append('images', image);
            });


            try {
                const response = await axiosInstance.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Server response:', response.data);
                return response.data.imageUrls; // Assuming the server returns an array of image URLs
            } catch (error) {
                console.error('Error uploading images:', error.response ? error.response.data : error.message);
                throw error; // Re-throw the error so it can be caught in handleAddNewProduct
            } finally {
                setUploading(false);
            }
        };

        return { uploadedImages, getRootProps, getInputProps, removeImage, replaceImage, uploadImages };
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: true,
        maxSize: 5 * 1024 * 1024,
    });

    return { uploadedImages, getRootProps, getInputProps, removeImage, replaceImage, uploadImages, uploading };
};

export default useImageUploader;
