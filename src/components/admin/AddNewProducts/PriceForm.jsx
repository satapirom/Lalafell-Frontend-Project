const PricingForm = ({ formData, handleChange }) => {
    return (
        <div className=" mb-6 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            <label className="block text-sm font-medium text-gray-700 mb-4">Product Category</label>
            <select
                name="category"
                type="text"
                value={formData?.category}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            >
                <option value="">Select a Category</option>
                <option>⌨️ Keyboard </option>
                <option>⌨️ Key Cap</option>
                <option>⌨️ Switch</option>
            </select>

            <label className="block text-sm font-medium text-gray-700 mt-6 mb-4">Brand</label>
            <select
                name="brand"
                type="text"
                value={formData?.brand}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            >
                <option value="" cl>Select a Brand</option>
                <option value="Corsair">Corsair</option>
                <option value="Razer">Razer</option>
                <option value="Logitech">Logitech</option>
                <option value="Ducky">Ducky</option>
                <option value="SteelSeries">SteelSeries</option>
                <option value="Keychron">Keychron</option>
            </select>

            <label className="block text-sm font-medium text-gray-700 mt-6">SKU (Optional)</label>
            <input
                type="text"
                name="sku"
                value={formData?.sku}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />

            <label className="block text-sm font-medium text-gray-700 mt-6">Inventory</label>
            <input
                type="text"
                name="inventory"
                value={formData?.inventory || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
        </div>
    );
};

export default PricingForm;
