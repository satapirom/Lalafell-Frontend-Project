import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const useImageUploader = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [replaceIndex, setReplaceIndex] = useState(null);
    const [uploading, setUploading] = useState(false); // สถานะอัพโหลด

    const onDrop = (acceptedFiles) => {
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
        setUploadStatus("Uploading....");
        const formData = new FormData();
        selectedImages.forEach((image) => {
            formData.append("file", image);
        });
        try {
            const response = await axios.post("/products", formData);
            console.log(response.data);
            setUploadStatus("upload successful");
        } catch (error) {
            console.log("imageUpload" + error);
            setUploadStatus("Upload failed..");
        }
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
