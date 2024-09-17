import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axiosInstance from '../../utils/axiosInstance';


const App = () => {
    const [images, setImages] = useState([]);
    const [replaceIndex, setReplaceIndex] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    const handleUpload = () => {
        if (images.length > 0) {
            console.log('Uploading files');
            axiosInstance
                .post('/upload', { images })
                .then((res) => {
                    console.log('Upload successful:', res.data);
                })
                .catch((err) => {
                    console.error('Upload failed:', err.response?.data || err.message);
                });
        } else {
            console.log('No images or missing  to upload');
        }
    };

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                setImages((prevState) => [...prevState, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    }, []);

    const handleReplace = () => {
        if (selectedFile && replaceIndex !== null) {
            const reader = new FileReader();
            reader.onload = () => {
                setImages((prevState) => {
                    const newImages = [...prevState];
                    newImages[replaceIndex] = reader.result;
                    return newImages;
                });
                setReplaceIndex(null);
                setSelectedFile(null);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const onRemove = (index) => {
        setImages((prevImages) => {
            const newImages = [...prevImages];
            newImages.splice(index, 1);
            return newImages;
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
        }
    });

    useEffect(() => {
        console.log(images);
    }, [images]);

    return (
        <div className="mt-24 container mx-auto px-4 py-4 my-8 max-w-screen-laptopl">
            <label className="block text-sm font-medium text-gray-700 mt-4">
                Product Images
            </label>
            <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-4 mt-4 border border-gray-300 rounded-md p-4 sm:p-6 lg:p-8">
                <div
                    {...getRootProps()}
                    className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                    <input {...getInputProps()} className="hidden" />
                    <span className="text-xs text-blue-500 flex flex-col items-center">
                        <img src="/images/icon-upload-Img.svg" alt="Image" className="w-16 h-16" />
                        <span className="mt-2">
                            {isDragActive ? "Drop the files here..." : "Click to upload, or drag and drop"}
                        </span>
                    </span>
                </div>
                {images.length > 0 && images.map((image, index) => (
                    <div
                        key={index}
                        className="relative group border border-gray-200 rounded-md overflow-hidden"
                    >
                        <img
                            src={image}
                            alt={`Selected preview ${index}`}
                            className="object-cover w-full h-full transition-transform transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex justify-center items-center space-x-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                className="text-white text-base bg-blue-700/70 hover:bg-blue-700 px-4 py-2 rounded m-1"
                                onClick={() => {
                                    setReplaceIndex(index);
                                    document.getElementById('file-input').click();
                                }}
                            >
                                Replace
                            </button>
                            <button
                                className="text-white text-base bg-red-600/80 hover:bg-red-600 px-4 py-2 rounded m-1"
                                onClick={() => onRemove(index)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <input
                id="file-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                        handleReplace();
                    }
                }}
            />

            {/* <label className="block text-sm font-medium text-gray-700">
                Product Title
            </label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            /> */}

            {/* <label className="block text-sm font-medium text-gray-700 mt-4">
                Product Description
            </label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            /> */}

            <button
                className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                onClick={handleUpload}
            >
                Upload Images
            </button>

        </div>
    );
};

export default App;



