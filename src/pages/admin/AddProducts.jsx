import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axiosInstance from '../../utils/axiosInstance';

const App = () => {
    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [size, setSize] = useState('');

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('category', category);
        formData.append('brand', brand);
        formData.append('size', size);
        // อัปโหลดรูปภาพหลายภาพ
        images.forEach((image, index) => {
            formData.append('images', image);
        });

        try {
            const response = await axiosInstance.post('/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            alert('Product uploaded successfully!');
            // Clear form after successful upload
            setImages([]);
            setName('');
            setDescription('');
            setPrice('');
            setQuantity('');
            setCategory('');
            setBrand('');
            setSize('');

        } catch (error) {
            console.error('Error uploading product:', error);
            alert('Error uploading product. Please try again.');
        }
    };

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        setImages((prevImages) => [...prevImages, ...acceptedFiles]);
        console.log('Accepted files:', acceptedFiles);
        console.log('Rejected files:', rejectedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
        }
    });

    const handleReplace = (index, file) => {
        if (file) {
            setImages(prevImages => {
                const newImages = [...prevImages];
                newImages[index] = file;
                return newImages;
            });
        }
    };

    const onRemove = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    return (
        <div className="mt-24 container mx-auto px-4 py-4 my-8 max-w-screen-laptopl">
            <form onSubmit={handleUpload}>
                <label className="block text-sm font-medium text-gray-700 mt-4">
                    Product Images
                </label>
                <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-4 mt-4 border border-gray-300 rounded-md p-4 sm:p-6 lg:p-8">
                    <div
                        {...getRootProps()}
                        className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                        <input {...getInputProps()} />
                        <span className="text-xs text-blue-500 flex flex-col items-center">
                            <img src="/images/icon-upload-Img.svg" alt="Image" className="w-16 h-16" />
                            <span className="mt-2">
                                {isDragActive ? "Drop the files here..." : "Click to upload, or drag and drop"}
                            </span>
                        </span>
                    </div>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative group border border-gray-200 rounded-md overflow-hidden"
                        >
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Image ${index}`}
                                className="object-cover w-full h-full transition-transform transform group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex justify-center items-center space-x-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id={`file-input-${index}`}
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            handleReplace(index, e.target.files[0]);
                                        }
                                    }}
                                />
                                <label
                                    htmlFor={`file-input-${index}`}
                                    className="text-white text-base bg-blue-700/70 hover:bg-blue-700 px-4 py-2 rounded m-1 cursor-pointer"
                                >
                                    Replace
                                </label>
                                <button
                                    type="button"
                                    className="text-white text-base bg-red-600/80 hover:bg-red-600 px-4 py-2 rounded m-1"
                                    onClick={() => onRemove(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <label className="block text-sm font-medium text-gray-700 mt-4">
                    Product Name
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />

                <label className="block text-sm font-medium text-gray-700 mt-4">
                    Product Description
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />

                <label className="block text-sm font-medium text-gray-700 mt-4">
                    Product Price
                </label>
                <input
                    type="number"
                    value={price}
                    min={0}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />

                <label className="block text-sm font-medium text-gray-700 mt-4">
                    Product Quantity
                </label>
                <input
                    type="number"
                    value={quantity}
                    min={1}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />

                <label className="block text-sm font-medium text-gray-700 mt-4">
                    Product Category
                </label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                >
                    <option value="">Select a Category</option>
                    <option value="keyboard">Keyboard</option>
                    <option value="keycap">Keycap</option>
                    <option value="switch">Switch</option>
                </select>

                <label className="block text-sm font-medium text-gray-700 mt-4">
                    Product brand
                </label>
                <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                >
                    <option value="">Select a Brand</option>
                    <option value="Corsair">Corsair</option>
                    <option value="Razer">Razer</option>
                    <option value="Logitech">Logitech</option>
                    <option value="Ducky">Ducky</option>
                    <option value="SteelSeries">SteelSeries</option>
                    <option value="Keychron">Keychron</option>
                </select>

                <label className="block text-sm font-medium text-gray-700 mt-4">
                    Product Size
                </label>
                <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                >
                    <option value="">Select a Size</option>
                    <option value="100">Full Size 100%</option>
                    <option value="96">Size 96%</option>
                    <option value="80">Size 80%</option>
                    <option value="75">Size 75%</option>
                    <option value="60">Size 60%</option>
                </select>

                <button
                    type="submit"
                    className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                >
                    Upload Product
                </button>
            </form>
        </div>
    );
};

export default App;