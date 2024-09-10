import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import useForm from '../../hooks/admin/useAddNewProduct/useForm';
import ProductDetailForm from '../../components/admin/AddNewProducts/ProductDetailForm';
import ProductImagesForm from "../../components/admin/AddNewProducts/ProductImagesForm";
import ShippingFrom from "../../components/admin/AddNewProducts/ShippingFrom";
import PricingForm from "../../components/admin/AddNewProducts/PriceForm";
import Buttons from "../../components/admin/AddNewProducts/Buttons";
import useImageUploader from '../../hooks/admin/useAddNewProduct/useImageUploader';

const initialFormState = {
    productName: '',
    description: '',
    category: '',
    quantity: '',
    sku: '',
    weight: '',
    length: '',
    breadth: '',
    width: '',
    price: '',
    inventory: '',
    brand: '',

};

const icon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="3em"
        height="3em"
        viewBox="0 0 32 32"
        className="rounded-sm shadow-2xl border-2 border-slate-400"
        aria-label="Back to product list"
    >
        <g fill="none">
            <path fill="#ffffff" d="M2 6a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" />
            <path
                fill="black"
                d="M7.417 15.557a1 1 0 0 0 0 1.386l5.113 5.313c.624.649 1.72.207 1.72-.693V18.5a.25.25 0 0 1 .25-.25h9.75a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H14.5a.25.25 0 0 1-.25-.25v-3.063c0-.9-1.096-1.342-1.72-.693z"
            />
        </g>
    </svg>
);

const AddNewProduct = () => {
    const { formData, handleChange, resetForm } = useForm(initialFormState);
    const { uploadedImages, getRootProps, getInputProps, removeImage, replaceImage } = useImageUploader();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAddNewProduct = async (e) => {
        console.log(e.target.files);
        setLoading(true);
        setError(null);
        try {
            const productData = {
                ...formData,
                images: uploadedImages.map(image => image.url), // Use image URLs after upload
            };

            const response = await axiosInstance.post('/products', productData);
            if (response.status === 201) {
                alert('Product created successfully');
                resetForm();
            }
        } catch (error) {
            console.error('Error adding product:', error);
            setError('There was an error adding the product. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="container mx-auto px-4 py-6 max-w-screen-laptopl">
            <header className="flex mb-6">
                <button className="text-gray-500 hover:text-gray-700" aria-label="Back to product list">
                    {icon}
                </button>
                <div className="ml-4">
                    <h3>Back to product list</h3>
                    <h1 className="text-2xl font-semibold">Add New Product</h1>
                </div>
            </header>
            <div className="flex flex-col laptop:grid laptop:grid-cols-2 gap-8">
                <div className="flex-1">
                    <ProductImagesForm
                        uploadedImages={uploadedImages}
                        getRootProps={getRootProps}
                        getInputProps={getInputProps}
                        onRemove={removeImage}
                        replaceImage={replaceImage}
                    />
                    <ProductDetailForm
                        formData={formData}
                        handleChange={handleChange}
                    />
                </div>
                <div className="flex-1 tablet:col-span-1">
                    <PricingForm formData={formData} handleChange={handleChange} />
                    <ShippingFrom formData={formData} handleChange={handleChange} />
                    <Buttons onDiscard={resetForm} onAddProduct={handleAddNewProduct} />
                </div>
            </div>
        </section>
    );
};

export default AddNewProduct;


