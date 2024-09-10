const ProductDetailForm = ({ formData, handleChange }) => {
    return (
        <div className="mb-6 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
                type="text"
                name="productName"
                value={formData?.productName || ''}
                onChange={handleChange}
                minLength={3}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm  sm:text-sm p-2"
            />

            <label className="block text-sm font-medium text-gray-700 mt-6">Business Description</label>
            <textarea
                name="description"
                value={formData?.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 h-24"
                rows="4"
            ></textarea>
            <button className="text-blue-600 text-sm mt-2">Upload .txt file</button>

            <label className="block text-sm font-medium text-gray-700">
                Price
            </label>
            <input
                type="number"
                name="price"
                value={formData.price || ''}
                onChange={handleChange}
                min={1}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                placeholder="Enter price"
            />

            <label className="block text-sm font-medium text-gray-700 mt-6">Quantity</label>
            <input
                type="number"
                name="quantity"
                value={formData?.quantity}
                onChange={handleChange}
                min={1}
                max={1000}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
            <label className="block text-sm font-medium text-gray-700 mt-6">Quantity</label>
        </div>
    );
};

export default ProductDetailForm;

