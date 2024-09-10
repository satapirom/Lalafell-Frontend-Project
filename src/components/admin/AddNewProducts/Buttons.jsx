const Buttons = ({ onDiscard, onAddProduct }) => {
    return (
        <div className="flex justify-between mb-6 sm:p-6 md:p-8 lg:p-10 xl:p-12 ">
            <button button
                onClick={onDiscard} // Use onClick instead of onChange
                className="text-gray-500 border border-gray-300 rounded-md py-2 px-4 hover:bg-red-600 hover:text-white" >
                Discard
            </button >
            <div className="flex gap-4">
                <button className="text-blue-600 border border-blue-600 rounded-md py-2 px-4 hover:bg-blue-700 hover:text-white">
                    Schedule
                </button>
                <button
                    onClick={onAddProduct}
                    className="bg-blue-600 text-white hover:bg-blue-700 rounded-md py-2 px-4">
                    Add Product
                </button>
            </div>
        </div >
    );
};

export default Buttons;