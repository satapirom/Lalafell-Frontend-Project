import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const iconImg = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="3em"
        height="3em"
        viewBox="0 0 16 16"
    >
        <g
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                stroke="#cad3f5"
                d="M4.5 4.5H12A1.5 1.5 0 0 1 13.5 6v.5m-7.5 7H2A1.5 1.5 0 0 1 .5 12V3.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1" />
            <path
                stroke="#a6da95" d="M14.5 15.5L11 12l-2.5 2.5" />
            <path
                stroke="#7dc4e4" d="M9.5 8.5h4.997a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H9.5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1" />
            <circle cx="13.5" cy="10.5" r=".5" stroke="#eed49f" />
        </g>
    </svg>
);

const ProductImagesForm = ({ uploadedImages, getRootProps, getInputProps, onRemove, replaceImage }) => {
    useEffect(() => {
        return () => {
            uploadedImages.forEach((image) => {
                if (image.preview) {
                    URL.revokeObjectURL(image.preview);
                }
            });
        };
    }, [uploadedImages]);

    return (
        <div className="mb-6 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            <label
                className="block text-sm font-medium text-gray-700">
                Product Images
            </label>
            <div
                className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-4 mt-4 border border-gray-300 rounded-md p-4 sm:p-6 lg:p-8">
                <div
                    {...getRootProps()}
                    className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                    <input {...getInputProps()} className="hidden" />
                    <span className="text-xs text-blue-500 flex flex-col items-center">
                        {iconImg}
                        <span className="mt-2">
                            Click to upload
                            <span className="text-gray-700"> or drag and drop</span>
                        </span>
                    </span>
                </div>

                {uploadedImages.map((file, index) => (
                    <div key={index} className="relative group border border-gray-200 rounded-md overflow-hidden">
                        <img
                            src={file?.preview}
                            alt={`preview ${index}`}
                            className="object-cover w-full h-full transition-transform transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                className="text-white text-sm bg-gray-700 bg-opacity-80 px-2 py-1 rounded m-1"
                                onClick={() => replaceImage(index)}
                            >
                                Replace
                            </button>
                            <button
                                className="text-white text-sm bg-red-600 bg-opacity-80 px-2 py-1 rounded m-1"
                                onClick={() => onRemove(index)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductImagesForm;



